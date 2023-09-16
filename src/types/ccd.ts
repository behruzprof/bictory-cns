import dayjs from "dayjs"
import { MqttTopics } from "services/constants"

export enum TransferMessageTypes {
  SimpleTransferResponse = "SimpleTransferResponse",
}

export enum TxStatus {
  Accepted = "Accepted",
  Rejected = "Rejected",
}

export interface TransferMessage {
  data: {
    tx_hash: string
    tx_status: TxStatus
    action: any
  }
  message_type: TransferMessageTypes
  network_id: string
  originator: string
  user_status: string
}

export interface CnsQueueMessage {
  name: MqttTopics
  payload: any
}

export enum SmartContracts {
  MAIN = "BictoryCns",
  TRANSFER = "BictoryCnsNft",
  AUCTION = "BictoryNftAuction",
}

export enum SmartContractsIndex {
  DOMAIN_REGISTER = "849",
  SUBDOMAIN_REGISTER = "797",
  DOMAIN_EXTEND = "797",
  DOMAIN_TRANSFER = "800",
  DOMAIN_SELL = "797",
  PLACE_BID = "799",
}

export enum Method {
  DOMAIN_REGISTER = "register",
  SUBDOMAIN_REGISTER = "createSubdomain",
  TRANSFER_DOMAIN = "transfer",
  SELL_DOMAIN = "transfer",
  EXTEND_DOMAIN = "extend",
  PLACE_BID = "bid",
  SET_DATA = "setData",
  SET_ADDRESS = "setAddress",
}

export enum TransactionErrorCodes {
  PARSE_PARAMS = -1,
  LOG_FULL = -2,
  LOF_MALFORMED = -3,
  TOKEN_ID_ALREADY_EXISTS = -4,
  TOKEN_NOT_LISTED_FOR_SALE = -5,
}
export const getErrorMessage = (
  transactionErrorCode: TransactionErrorCodes
): string => {
  switch (transactionErrorCode) {
    case TransactionErrorCodes.PARSE_PARAMS:
      return "Failed parsing the parameter"
    default:
      return `Unknown Error, Error code is ${transactionErrorCode}`
  }
}

export interface DataModelForTx {
  from: string
  nonce: string
  amount: string
  expiry: string
  nrg_limit: string
  contract_address: {
    address: string
    index: string
    sub_index: string
  }
  contract_params: Array<any>
  contract_name: SmartContracts
  contract_title: string
  contract_method: string
  serialized_params: string
}

export interface DataToBeParsedForDomainRegister {
  from: string
  serialized_params: string
  price: string
  index: string
}

export interface DataToBeParsedForSubdomainRegister {
  serialized_params: string
  price: string
  from: string
  index: string
}

export interface DataToBeParsedForDomainTransfer {
  serialized_params: string
  from: string
  index: string
}

export interface DataToBeParsedForExtendDomain {
  serialized_params: string
  from: string
  price: string
  index: string
}
export interface DataToBeParsedForPlaceBid {
  serialized_params: string
  from: string
  price: string
  index: string
}
export interface DataToBeParsedForSetData {
  serialized_params: string
  from: string
  index: string
}

export interface DataToBeParsedForSetAddress {
  serialized_params: string
  from: string
  index: string
}

export enum BictoryContractTitles {
  RegisterDomain = "Bictory, register domain",
  RegisterSubdomain = "Bictory, register subdomain",
  TransferDomain = "Bictory, transfer domain",
  ExtendDomain = "Bictory, extend domain",
  PlaceBid = "Bictory, place bid",
  SetData = "Bictory, set record data",
  SetAddress = "Bictory, set new resolver address",
}

export const parseDataToSendForDomainRegistration = (
  data: DataToBeParsedForDomainRegister
): DataModelForTx => {
  const { from, serialized_params, price, index } = data
  const contractName = SmartContracts.MAIN

  const parsedData = {
    from,
    nonce: "",
    amount: price.toString().split(".")[0],
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "20000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.DOMAIN_REGISTER,
    contract_title: BictoryContractTitles.RegisterDomain,
    serialized_params: serialized_params,
  }

  return parsedData
}

export const parseDataToSendForSubdomainRegistration = (
  data: DataToBeParsedForSubdomainRegister
): DataModelForTx => {
  const { serialized_params, price, from, index } = data
  const contractName = SmartContracts.MAIN

  const parsedData = {
    from,
    nonce: "",
    amount: price.toString().split(".")[0],
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "15000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.SUBDOMAIN_REGISTER,
    contract_title: BictoryContractTitles.RegisterDomain,
    serialized_params: serialized_params,
  }

  return parsedData
}

export const parseDataToSendForDomainTransfer = (
  data: DataToBeParsedForDomainTransfer
): DataModelForTx => {
  const { serialized_params, from, index } = data
  const contractName = SmartContracts.TRANSFER

  const parsedData = {
    from,
    nonce: "",
    amount: "0",
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "15000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.TRANSFER_DOMAIN,
    contract_title: BictoryContractTitles.TransferDomain,
    serialized_params: serialized_params,
  }

  return parsedData
}

export const parseDataToSendForExtendDomain = (
  data: DataToBeParsedForExtendDomain
): DataModelForTx => {
  const { serialized_params, from, price, index } = data
  const contractName = SmartContracts.MAIN

  const parsedData = {
    from,
    nonce: "",
    amount: price.toString().split(".")[0],
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "15000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.EXTEND_DOMAIN,
    contract_title: BictoryContractTitles.ExtendDomain,
    serialized_params: serialized_params,
  }

  return parsedData
}

export const parseDataToSendForPlaceBid = (
  data: DataToBeParsedForPlaceBid
): DataModelForTx => {
  const { serialized_params, from, price, index } = data
  const contractName = SmartContracts.AUCTION

  const parsedData = {
    from,
    nonce: "",
    amount: price.toString().split(".")[0],
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "15000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.PLACE_BID,
    contract_title: BictoryContractTitles.PlaceBid,
    serialized_params: serialized_params,
  }

  return parsedData
}

export const parseDataToSendForSetData = (
  data: DataToBeParsedForSetData
): DataModelForTx => {
  const { serialized_params, from, index } = data
  const contractName = SmartContracts.MAIN

  const parsedData = {
    from,
    nonce: "",
    amount: "0",
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "15000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.SET_DATA,
    contract_title: BictoryContractTitles.SetData,
    serialized_params: serialized_params,
  }

  return parsedData
}

export const parseDataToSendForSetAddress = (
  data: DataToBeParsedForSetAddress
): DataModelForTx => {
  const { serialized_params, from, index } = data
  const contractName = SmartContracts.MAIN

  const parsedData = {
    from,
    nonce: "",
    amount: "0",
    expiry: dayjs().add(30, "minutes").unix().toString(), // 30 minutes
    nrg_limit: "15000",
    contract_address: {
      address: from,
      index,
      sub_index: "0",
    },
    contract_params: [],
    contract_name: contractName,
    contract_method: Method.SET_ADDRESS,
    contract_title: BictoryContractTitles.SetAddress,
    serialized_params: serialized_params,
  }

  return parsedData
}
