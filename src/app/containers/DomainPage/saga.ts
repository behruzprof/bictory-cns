import { checkDomainApi } from "app/providers/globalApis"
import { globalActions } from "app/slice"
import { getPrice } from "providers/price"
import {
  serializeDomainData,
  serializeExtendDomainData,
  serializePlaceBidData,
  serializeSetAddressData,
  serializeSetDataData,
  serializeSubdomainData,
  serializeTransferDomainData,
} from "providers/serializer"
import { BictoryCnsApi, Environment } from "@bictory/cns-resolver"

import { toast } from "react-toastify"
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects"
import { ccdWalletService } from "services/ccdWallet"
import { StandardResponse } from "services/constants"
import {
  DataModelForTx,
  parseDataToSendForDomainRegistration,
  parseDataToSendForDomainTransfer,
  parseDataToSendForExtendDomain,
  parseDataToSendForPlaceBid,
  parseDataToSendForSetAddress,
  parseDataToSendForSetData,
  parseDataToSendForSubdomainRegistration,
  SmartContracts,
} from "types/ccd"
import {
  DomainKind,
  SerializeDomainType,
  SerializeTransferDomainType,
} from "utils/cryptoXconvertors"
import {
  getBidFeeAPI,
  getDomainApi,
  getExtendFeeAPI,
  getRegisterFeeAPI,
  getSubdomainFeeAPI,
  getSubdomainsByDomainNameApi,
  getTransferFeeAPI,
  getSetDataFeeAPI,
  getBidsApi,
  getSetAddressFeeAPI,
  getCnsNftId,
} from "./providers"
import { DomainPageActions } from "./slice"
import {
  CreateSubdomainType,
  ExtendDomainType,
  GetBidsQueryParams,
  PlaceBidType,
  SetAddressType,
  SetDataType,
} from "./types"
import {
  addTrailingCCD,
  bumpFee,
  removeTrailingDomainName,
} from "utils/commonUtils"
import { DomainPageDomains, DomainPageSelectors } from "./selectors"
import { GlobalDomains } from "app/selectors"
import { CCDToMicroCCD, MicroCCDToCCD } from "utils/unitConversion"
import { getActualContractIndexAPI } from "providers/dynamicSC"
import { PayloadAction } from "@reduxjs/toolkit"
import { add, multiply } from "precise-math"
import { WalletInfoDataType } from "app/types"

export function* getDomain(action: { type: string; payload: number }) {
  yield put(DomainPageActions.setIsLoadingDomain(true))
  try {
    const response: StandardResponse = yield call(getDomainApi, action.payload)
    if (response.is_success) {
      yield put(DomainPageActions.setDomain(response.data))
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get Domain")
  } finally {
    yield put(DomainPageActions.setIsLoadingDomain(false))
  }
}

export function* getRegisterFee() {
  const year = yield select(DomainPageDomains.year)
  const domain = yield select(DomainPageDomains.domain)

  yield put(DomainPageActions.setIsLoadingRegisterFee(true))
  try {
    const scIndex: StandardResponse = yield call(
      getActualContractIndexAPI,
      SmartContracts.MAIN
    )
    const dataToSend = {
      duration: year,
      contract_index: scIndex.data.index,
      domain: `${addTrailingCCD(domain.name)}`,
    }
    const response: StandardResponse = yield call(getRegisterFeeAPI, dataToSend)
    if (response.is_success) {
      yield put(
        DomainPageActions.setRegisterFee(
          bumpFee(MicroCCDToCCD(response.data.fee))
        )
      )
      yield put(DomainPageActions.setRegisterFeeUSD(response.data.usd))
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get register fee")
  } finally {
    yield put(DomainPageActions.setIsLoadingRegisterFee(false))
  }
}

export function* startRegisterProcess() {
  const year = yield select(DomainPageDomains.year)
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )

  const domain = yield select(DomainPageDomains.domain)

  if (domain && connecteWallet) {
    yield put(
      DomainPageActions.createDomain({
        duration: year,
        domain: `${addTrailingCCD(domain.name)}`.replace(/\s/g, "").toLowerCase(),
        address: connecteWallet[0].address,
      })
    )
  }
}

export function* createDomain(action: {
  type: string
  payload: SerializeDomainType
}) {
  const { duration, domain, address } = action.payload

  const domainRegPriceSlippageInCCD = yield select(
    DomainPageSelectors.domainRegPriceSlippageInCCD
  )

  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))
  try {
    const [
      serializedResponse,
      priceResponse,
      scIdxResponse,
    ]: StandardResponse[] = yield all([
      call(serializeDomainData, { duration, domain, address }),
      call(getPrice, {
        domain_kind: DomainKind.Domain,
        length: removeTrailingDomainName(domain).length,
      }),
      call(getActualContractIndexAPI, SmartContracts.MAIN),
    ])

    if (
      serializedResponse.is_success &&
      priceResponse.is_success &&
      scIdxResponse.is_success
    ) {
      const actualPrice = multiply(priceResponse.data.price, duration)
      const priceToSend = add(
        actualPrice,
        CCDToMicroCCD(Number(domainRegPriceSlippageInCCD))
      )
      const dataToSend: DataModelForTx = parseDataToSendForDomainRegistration({
        from: address,
        serialized_params: serializedResponse.data,
        price: priceToSend.toString(),
        index: scIdxResponse.data.index.toString(),
      })
      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not register domain, pls contact our support")
  }
}

export function* getSubdomainFee() {
  const domain = yield select(DomainPageDomains.domain)
  const subdomainName = yield select(DomainPageDomains.subdomainName)

  yield put(DomainPageActions.setIsLoadingSubdomainFee(true))
  try {
    const [feeResponse, priceResponse]: StandardResponse[] = yield all([
      call(getSubdomainFeeAPI, {
        parent_id: domain.id,
        name: `${subdomainName}.${domain.name}`,
      }),
      call(getPrice, {
        domain_kind: DomainKind.SubDomain,
        length: removeTrailingDomainName(subdomainName).length,
      }),
    ])

    if (feeResponse.is_success && priceResponse.is_success) {
      yield put(
        DomainPageActions.setSubdomainFee(
          bumpFee(MicroCCDToCCD(feeResponse.data))
        )
      )
      yield put(
        DomainPageActions.setSubdomainPrice(
          MicroCCDToCCD(Number(priceResponse.data.price))
        )
      )
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get subdomain price")
  } finally {
    yield put(DomainPageActions.setIsLoadingSubdomainFee(false))
  }
}

export function* startSubdomainRegisterProccess() {
  const domain = yield select(DomainPageDomains.domain)
  const subdomainName = yield select(DomainPageDomains.subdomainName)
  // const userData = yield select(GlobalSelectors.user)
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )
  if (domain && connecteWallet && subdomainName) {
    yield put(
      DomainPageActions.createSubdomain({
        parent_id: domain.id,
        name: `${subdomainName}.${domain.name}`.replace(/\s/g, "").toLowerCase(),
        subdomainName:subdomainName.replace(/\s/g, ""),
        from: connecteWallet[0].address,
      })
    )
  }
}

export function* createSubdomain(action: {
  type: string
  payload: CreateSubdomainType
}) {
  const { parent_id, name, subdomainName, from } = action.payload

  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))

  const subdomainPriceSlippage = yield select(
    DomainPageSelectors.subdomainPriceSlippage
  )
  try {
    const [
      serializedResponse,
      priceResponse,
      scIdxResponse,
    ]: StandardResponse[] = yield all([
      call(serializeSubdomainData, { parent_id, name }),
      call(getPrice, {
        domain_kind: DomainKind.SubDomain,
        length: removeTrailingDomainName(subdomainName).length,
      }),
      call(getActualContractIndexAPI, SmartContracts.MAIN),
    ])

    if (
      serializedResponse.is_success &&
      priceResponse.is_success &&
      scIdxResponse.is_success
    ) {
      const dataToSend: DataModelForTx =
        parseDataToSendForSubdomainRegistration({
          serialized_params: serializedResponse.data,
          price: add(
            Number(priceResponse.data.price),
            CCDToMicroCCD(Number(subdomainPriceSlippage))
          ).toString(),
          from,
          index: scIdxResponse.data.index.toString(),
        })

      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not register subdomain, pls contact our support")
  }
}

export function* getSearchedDomain(action: { type: string; payload: string }) {
  yield put(DomainPageActions.setIsLoadingDomain(true))
  let name = addTrailingCCD(action.payload)
  try {
    const response: StandardResponse = yield call(checkDomainApi, name)
    if (response.is_success) {
      yield put(DomainPageActions.setDomain(response.data))
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get searched Domain")
  } finally {
    yield put(DomainPageActions.setIsLoadingDomain(false))
  }
}

export function* getSubdomainsByDomainName(action: {
  type: string
  payload: string
}) {
  yield put(DomainPageActions.setIsLoadingSubdomains(true))
  try {
    const response: StandardResponse = yield call(
      getSubdomainsByDomainNameApi,
      action.payload
    )
    if (response.is_success) {
      yield put(DomainPageActions.setSubdomains(response.data))
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get Subdomains")
  } finally {
    yield put(DomainPageActions.setIsLoadingSubdomains(false))
  }
}

export function* getTransferFee() {
  const domain = yield select(DomainPageDomains.domain)

  yield put(DomainPageActions.setIsLoadingTransferFee(true))

  try {
    const response: StandardResponse = yield call(getTransferFeeAPI, {
      // it is always 1, only 1 domain can be transferred at a time
      amount: 1,
      domain: domain.name,
    })
    if (response.is_success) {
      yield put(
        DomainPageActions.setTransferFee(bumpFee(MicroCCDToCCD(response.data)))
      )
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get transfer fee")
  } finally {
    yield put(DomainPageActions.setIsLoadingTransferFee(false))
  }
}

export function* startTransferDomainProccess() {
  const domain = yield select(DomainPageDomains.domain)
  let transferDomainWalletAddress = yield select(
    DomainPageDomains.transferDomainWalletAddress
  )
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )

  try {
    // transferDomainWalletAddress = resolveNameAddress(
    //   transferDomainWalletAddress
    // )
    if (domain && connecteWallet && transferDomainWalletAddress) {
      yield put(
        DomainPageActions.transferDomain({
          to: transferDomainWalletAddress,
          domain: domain.name,
          // it is always 1, only 1 domain can be transferred at a time
          amount: 1,
          from: connecteWallet[0].address,
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export function* transferDomain(action: {
  type: string
  payload: SerializeTransferDomainType
}) {
  const { from } = action.payload
  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))
  try {
    const [serializedResponse, getSCIdxResponse]: StandardResponse[] =
      yield all([
        call(serializeTransferDomainData, action.payload),
        call(getActualContractIndexAPI, SmartContracts.TRANSFER),
      ])

    if (serializedResponse.is_success && getSCIdxResponse.is_success) {
      const dataToSend: DataModelForTx = parseDataToSendForDomainTransfer({
        from,
        serialized_params: serializedResponse.data.data,
        index: getSCIdxResponse.data.index.toString(),
      })

      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not transfer domain, pls contact our support")
  }
}

export function* getExtendFee() {
  const domain = yield select(DomainPageDomains.domain)
  const year = yield select(DomainPageDomains.year)

  yield put(DomainPageActions.setIsLoadingExtendFee(true))
  try {
    const [feeResponse, priceResponse]: StandardResponse[] = yield all([
      call(getExtendFeeAPI, {
        duration: year,
        domain: domain.name,
      }),
      call(getPrice, {
        domain_kind: DomainKind.Domain,
        length: removeTrailingDomainName(domain.name).length,
      }),
    ])

    if (feeResponse.is_success && priceResponse.is_success) {
      yield put(
        DomainPageActions.setExtendFee(bumpFee(MicroCCDToCCD(feeResponse.data)))
      )
      yield put(
        DomainPageActions.setExtendPrice(
          MicroCCDToCCD(Number(priceResponse.data.price))
        )
      )
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get extend fee")
  } finally {
    yield put(DomainPageActions.setIsLoadingExtendFee(false))
  }
}

export function* startExtendDomainProccess() {
  const domain = yield select(DomainPageDomains.domain)
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )
  const year = yield select(DomainPageDomains.year)

  if (domain && connecteWallet && year) {
    yield put(
      DomainPageActions.extendDomain({
        domain: domain.name,
        duration: year,
        from: connecteWallet[0].address,
      })
    )
  }
}

export function* extendDomain(action: {
  type: string
  payload: ExtendDomainType
}) {
  const { from, duration, domain } = action.payload

  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))
  try {
    const [
      serializedResponse,
      priceResponse,
      scIdxResponse,
    ]: StandardResponse[] = yield all([
      call(serializeExtendDomainData, { duration, domain }),
      call(getPrice, {
        domain_kind: DomainKind.Domain,
        length: removeTrailingDomainName(domain).length,
      }),
      call(getActualContractIndexAPI, SmartContracts.MAIN),
    ])

    if (
      serializedResponse.is_success &&
      priceResponse.is_success &&
      scIdxResponse.is_success
    ) {
      const dataToSend: DataModelForTx = parseDataToSendForExtendDomain({
        from,
        serialized_params: serializedResponse.data.data,
        price: multiply(priceResponse.data.price, duration).toString(),
        index: scIdxResponse.data.index.toString(),
      })

      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not transfer domain, pls contact our support")
  }
}

export function* getBidFee() {
  const domain = yield select(DomainPageDomains.domain)
  const bidAmount = yield select(DomainPageDomains.bidAmount)

  yield put(DomainPageActions.setIsLoadingBidFee(true))

  try {
    const response: StandardResponse = yield call(getBidFeeAPI, {
      amount: CCDToMicroCCD(bidAmount),
      domain: domain.name,
    })
    if (response.is_success) {
      yield put(
        DomainPageActions.setBidFee(bumpFee(MicroCCDToCCD(response.data)))
      )
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get bid fee")
  } finally {
    yield put(DomainPageActions.setIsLoadingBidFee(false))
  }
}

export function* startPlaceBidProccess() {
  const domain = yield select(DomainPageDomains.domain)
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )

  const bidAmount = yield select(DomainPageDomains.bidAmount)

  if (domain && connecteWallet) {
    yield put(
      DomainPageActions.placeBid({
        domain: domain.name,
        from: connecteWallet[0].address,
        bidAmount: CCDToMicroCCD(bidAmount),
      })
    )
  }
}

export function* placeBid(action: { type: string; payload: PlaceBidType }) {
  const { from, domain, bidAmount } = action.payload

  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))
  try {
    const [serializedResponse, scIdxResponse]: StandardResponse[] = yield all([
      call(serializePlaceBidData, { domain, amount: bidAmount }),
      call(getActualContractIndexAPI, SmartContracts.AUCTION),
    ])

    if (serializedResponse.is_success && scIdxResponse.is_success) {
      const dataToSend: DataModelForTx = parseDataToSendForPlaceBid({
        from,
        serialized_params: serializedResponse.data.data,
        price: bidAmount.toString(),
        index: scIdxResponse.data.index.toString(),
      })

      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not place a bid, pls contact our support")
  }
}

export function* startSetRecordProccess() {
  const domain = yield select(DomainPageDomains.domain)
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )
  const recordTitle = yield select(DomainPageDomains.recordTitle)
  const recordKey = yield select(DomainPageDomains.recordKey)
  const recordValue = yield select(DomainPageDomains.recordValue)
  const recordType = yield select(DomainPageDomains.recordType)

  if (domain && connecteWallet) {
    yield put(
      DomainPageActions.setData({
        from: connecteWallet[0].address,
        title: recordTitle,
        key: recordKey,
        value: recordValue,
        domain_id: domain.id,
        value_type: recordType,
      })
    )
  }
}

export function* setData(action: { type: string; payload: SetDataType }) {
  const { from, title, key, value, domain_id, value_type } = action.payload

  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))
  try {
    const [serializedResponse, scIdxResponse]: StandardResponse[] = yield all([
      call(serializeSetDataData, { title, key, value, domain_id, value_type }),
      call(getActualContractIndexAPI, SmartContracts.MAIN),
    ])

    if (serializedResponse.is_success && scIdxResponse.is_success) {
      const dataToSend: DataModelForTx = parseDataToSendForSetData({
        from,
        serialized_params: serializedResponse.data,
        index: scIdxResponse.data.index.toString(),
      })

      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not set record data, pls contact our support")
  }
}

function* setRecordValue(action: PayloadAction<string>) {
  yield delay(500)
  yield call(getRecordFee)
}

export function* getRecordFee() {
  const domain = yield select(DomainPageDomains.domain)
  const recordTitle = yield select(DomainPageDomains.recordTitle)
  const recordKey = yield select(DomainPageDomains.recordKey)
  const recordValue = yield select(DomainPageDomains.recordValue)
  const recordType = yield select(DomainPageDomains.recordType)

  yield put(DomainPageActions.setIsLoadingSetDataFee(true))
  const dataToSend = {
    title: recordTitle,
    key: recordKey,
    value: recordValue,
    domain_id: domain.id,
    value_type: recordType,
  }
  try {
    const response: StandardResponse = yield call(getSetDataFeeAPI, dataToSend)
    if (response.is_success) {
      yield put(
        DomainPageActions.setSetDataFee(bumpFee(MicroCCDToCCD(response.data)))
      )
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get setting data fee")
  } finally {
    yield put(DomainPageActions.setIsLoadingSetDataFee(false))
  }
}

export function* getBids(action: PayloadAction<GetBidsQueryParams>) {
  yield put(DomainPageActions.setIsLoadingBids(true))
  try {
    const response: StandardResponse = yield call(getBidsApi, action.payload)

    yield put(DomainPageActions.setBidsList(response.data.data))
    yield put(DomainPageActions.setBidsTotalCount(response.data.total))
  } catch (err) {
    toast.error("Error getting Bids!")
  } finally {
    yield put(DomainPageActions.setIsLoadingBids(false))
  }
}

export function* startSetAddressProccess() {
  const domain = yield select(DomainPageDomains.domain)
  const connecteWallet: WalletInfoDataType = yield select(
    GlobalDomains.walletInfoData
  )
  const resolverNewAddress = yield select(DomainPageDomains.resolverNewAddress)

  if (domain && connecteWallet) {
    yield put(
      DomainPageActions.setAddress({
        from: connecteWallet[0].address,
        domain: domain.name,
        address: resolverNewAddress,
      })
    )
  }
}

export function* setAddress(action: { type: string; payload: SetAddressType }) {
  const { from, domain, address } = action.payload

  yield put(globalActions.setIsOpenConnectWalletQR(false))
  yield put(globalActions.setIsOpenAlert(true))
  try {
    const [serializedResponse, scIdxResponse]: StandardResponse[] = yield all([
      call(serializeSetAddressData, { domain, address }),
      call(getActualContractIndexAPI, SmartContracts.MAIN),
    ])

    if (serializedResponse.is_success && scIdxResponse.is_success) {
      const dataToSend: DataModelForTx = parseDataToSendForSetAddress({
        from,
        serialized_params: serializedResponse.data,
        index: scIdxResponse.data.index.toString(),
      })

      ccdWalletService.SendTransaction(dataToSend)
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not set new resolver address, pls contact our support")
  }
}

function* setResolverNewAddress(action: PayloadAction<string>) {
  yield delay(500)
  yield call(getAddressFee)
}

export function* getAddressFee() {
  const domain = yield select(DomainPageDomains.domain)
  const resolverNewAddress = yield select(DomainPageDomains.resolverNewAddress)

  yield put(DomainPageActions.setIsLoadingSetAddressFee(true))

  try {
    const response: StandardResponse = yield call(getSetAddressFeeAPI, {
      domain: domain.name,
      address: resolverNewAddress,
    })
    if (response.is_success) {
      yield put(
        DomainPageActions.setSetAddressFee(
          bumpFee(MicroCCDToCCD(response.data))
        )
      )
    } else {
      // need to be added message
      // toast.error(response.message)
    }
  } catch (err) {
    toast.warn("Can not get set address fee")
  } finally {
    yield put(DomainPageActions.setIsLoadingSetAddressFee(false))
  }
}

export function* getNftId(action: PayloadAction<number>) {
  yield put(DomainPageActions.setIsLoadingNftId(true))
  try {
    const response: StandardResponse = yield call(getCnsNftId, action.payload)
    if (response.is_success) {
      yield put(DomainPageActions.setNftId(response.data))
    }
  } catch (err) {
    toast.warn("Can not get nft id")
  } finally {
    yield put(DomainPageActions.setIsLoadingNftId(false))
  }
}

export function* domainPageSaga() {
  yield takeLatest(DomainPageActions.getDomain.type, getDomain)
  yield takeLatest(DomainPageActions.getRegisterFee.type, getRegisterFee)
  yield takeLatest(DomainPageActions.getTransferFee.type, getTransferFee)
  yield takeLatest(DomainPageActions.getExtendFee.type, getExtendFee)
  yield takeLatest(DomainPageActions.getSubdomainFee.type, getSubdomainFee)
  yield takeLatest(DomainPageActions.getBidFee.type, getBidFee)
  yield takeLatest(DomainPageActions.setRecordValue.type, setRecordValue)
  yield takeLatest(
    DomainPageActions.setResolverNewAddress.type,
    setResolverNewAddress
  )
  yield takeLatest(
    DomainPageActions.getSubdomainsByDomainName.type,
    getSubdomainsByDomainName
  )
  yield takeLatest(DomainPageActions.createDomain.type, createDomain)
  yield takeLatest(DomainPageActions.getSearchedDomain.type, getSearchedDomain)
  yield takeLatest(DomainPageActions.createSubdomain.type, createSubdomain)
  yield takeLatest(DomainPageActions.transferDomain.type, transferDomain)
  yield takeLatest(DomainPageActions.extendDomain.type, extendDomain)
  yield takeLatest(DomainPageActions.placeBid.type, placeBid)
  yield takeLatest(DomainPageActions.setData.type, setData)
  yield takeLatest(DomainPageActions.setAddress.type, setAddress)
  yield takeLatest(
    DomainPageActions.startRegisterProcess.type,
    startRegisterProcess
  )
  yield takeLatest(
    DomainPageActions.startSubdomainRegisterProccess.type,
    startSubdomainRegisterProccess
  )
  yield takeLatest(
    DomainPageActions.startTransferDomainProccess.type,
    startTransferDomainProccess
  )
  yield takeLatest(
    DomainPageActions.startExtendDomainProccess.type,
    startExtendDomainProccess
  )
  yield takeLatest(
    DomainPageActions.startPlaceBidProccess.type,
    startPlaceBidProccess
  )
  yield takeLatest(
    DomainPageActions.startSetRecordProccess.type,
    startSetRecordProccess
  )
  yield takeLatest(
    DomainPageActions.startSetAddressProccess.type,
    startSetAddressProccess
  )
  yield takeLatest(DomainPageActions.getBids.type, getBids)
  yield takeLatest(DomainPageActions.getNftId.type, getNftId)
}
