import { AppPages } from "app/constants"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { TransferMessage } from "app/types"
import { push } from "connected-react-router"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { IS_DEV, MqttTopics } from "services/constants"
import {
  CnsQueueSubscriber,
  TransactionsSubscriber,
  WalletInfoSubscriber,
} from "services/message_service"
import { mqttService } from "services/Mqtt"
import { CnsQueueMessage, Method, SmartContracts, TxStatus } from "types/ccd"
import { DomainPageActions, useDomainPageSlice } from "../DomainPage/slice"

export const WalletDataDistributor = memo(
  () => {
    const dispatch = useDispatch()
    useDomainPageSlice()
    const walletInfoData = useSelector(GlobalSelectors.walletInfoData)
    const userData = useSelector(GlobalSelectors.user)
    const loggedIn = useSelector(GlobalSelectors.loggedIn)

    // mqtt subscribers
    useEffect(() => {
      mqttService.ConnectToSubject({
        subject: MqttTopics.CnsQueue,
      })

      const subscription = WalletInfoSubscriber.subscribe((msg) => {
        dispatch(globalActions.setWalletInfoData(msg))
        dispatch(globalActions.setIsOpenConnectWalletQR(false))
      })

      const transactionsSubscription = TransactionsSubscriber.subscribe(
        (message: TransferMessage) => {
          if (message.data) {
            const { data } = message
            const { tx_status, tx_hash } = data

            /* if (tx_status === TxStatus.Rejected) {
              toast.error(`Transaction ${tx_hash} was rejected`)
            }*/
            if (tx_status === TxStatus.Accepted) {
              dispatch(globalActions.setIsOpenAlert(false))
              dispatch(DomainPageActions.setIsOpenConfirmModal(false))

              toast.success(
                `Transaction was submitted on the blockchain, click to see it on explorer`,
                {
                  onClick: () =>
                    window.open(
                      `${process.env.REACT_APP_CCD_TX_URL}${tx_hash}`,
                      "_blank"
                    ),
                  autoClose: 25000,
                }
              )
            }
          }
        }
      )

      const cnsQueueSubscription = CnsQueueSubscriber.subscribe(
        (message: CnsQueueMessage) => {
          if (IS_DEV) console.log("queue:", message)
          if (message.payload) {
            const { is_success, sender, hash } = message.payload

            if (sender === userData?.wallet_address) {
              dispatch(globalActions.setIsOpenAlert(false))
              if (is_success) {
                methodsSwitcher(message.payload)
                dispatch(
                  globalActions.setIsOpenSubmittedAlert({
                    open: true,
                    tx_hash: hash,
                  })
                )
              } else {
                dispatch(
                  globalActions.setIsOpenFailedAlert({
                    open: true,
                    tx_hash: hash,
                  })
                )
              }
            }
          }
        }
      )

      return () => {
        subscription.unsubscribe()
        cnsQueueSubscription.unsubscribe()
        transactionsSubscription.unsubscribe()
      }
    })

    // any should be replaced when types are analyzed in other sc
    const methodsSwitcher = (payload: any) => {
      switch (payload.method) {
        case `${SmartContracts.MAIN}.${Method.DOMAIN_REGISTER}`:
          registerDomainMethod(payload)
          break
        case `${SmartContracts.MAIN}.${Method.SUBDOMAIN_REGISTER}`:
          registerSubdomainMethod(payload)
          break
        case `${SmartContracts.TRANSFER}.${Method.TRANSFER_DOMAIN}`:
          transferDomainMethod(payload)
          break
        case `${SmartContracts.MAIN}.${Method.EXTEND_DOMAIN}`:
          extendDomainMethod(payload)
          break
        case `${SmartContracts.AUCTION}.${Method.PLACE_BID}`:
          placeBidMethod(payload)
          break
        case `${SmartContracts.MAIN}.${Method.SET_DATA}`:
          setDataMethod(payload)
          break
        case `${SmartContracts.MAIN}.${Method.SET_ADDRESS}`:
          setAddressMethod(payload)
          break
      }
    }

    const registerDomainMethod = (payload: any) => {
      const { data } = payload
      dispatch(push(`${AppPages.DomainPage}/${data.id}/details`))
    }

    const registerSubdomainMethod = (payload: any) => {
      const { data } = payload
      dispatch(push(`${AppPages.SubDomainPage}/${data.id}`))
    }

    const transferDomainMethod = (payload: any) => {
      const { data } = payload
      dispatch(DomainPageActions.getDomain(data.id))
    }

    const extendDomainMethod = (payload: any) => {
      const { data } = payload
      dispatch(DomainPageActions.getDomain(data.id))
    }

    const placeBidMethod = (payload: any) => {
      const { data } = payload
      dispatch(DomainPageActions.getDomain(data.auction.domain_name_id))
    }

    const setDataMethod = (payload: any) => {
      const { data } = payload
      dispatch(DomainPageActions.getDomain(data.domain_id))
    }

    const setAddressMethod = (payload: any) => {
      const { data } = payload
      dispatch(DomainPageActions.getDomain(data.id))
    }

    // sign in with wallet

    useEffect(() => {
      if (walletInfoData && !loggedIn) {
        dispatch(globalActions.setIsOpenConnectWalletQR(false))
        dispatch(globalActions.signIn(walletInfoData[0].address))
      }
    }, [walletInfoData])

    return <></>
  },
  () => true
)
