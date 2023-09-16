import ConcordiumWalletClient, {
  IBridgeMessage,
  TypedEventEmitter,
} from "@pioneeringtechventures/concordium-wallet-client"
import {
  QrCodeWalletConnectorDataType,
  TransferMessage,
  WalletInfoDataType,
} from "app/types"
import { toast } from "react-toastify"
import {
  TransactionsMessageService,
  WalletInfoMessageService,
  WalletQrCodeMessageService,
  WalletRejectionMessageService,
} from "./message_service"

class ModalAdapter {
  private pubSub: typeof TypedEventEmitter
  constructor(opts) {
    this.pubSub = TypedEventEmitter
    this.pubSub.on("close", () => {
      this.close()
      opts.onClose()
    })
    this.pubSub.on("reject", (msg) => {
      WalletQrCodeMessageService.send(undefined)
      console.log(msg)
    })

    this.pubSub.on("connect", (msg) => {
      console.log(msg)
    })
    this.pubSub.on("accept", (msg) => {
      console.log("accepted", msg)
    })
    this.pubSub.on("accountInfo", (msg) => {})

    this.pubSub.on("transaction", (msg) => {
      console.log(msg)
    })
    this.pubSub.on("error", (msg: any) => {
      console.log(msg)
      if (msg?.code === "500" && msg?.message === "device disconnected") {
        WalletInfoMessageService.send(undefined)
        WalletRejectionMessageService.send(undefined)
      }
    })
  }

  open(msg: QrCodeWalletConnectorDataType) {
    WalletQrCodeMessageService.send(msg)
    console.log(msg)
  }

  close() {
    WalletQrCodeMessageService.send(undefined)
  }
}
export class CcdWalletService {
  private static instance: CcdWalletService
  private static ccdCl: ConcordiumWalletClient
  public static qrModal

  public static getInstance(): CcdWalletService {
    if (!CcdWalletService.instance) {
      CcdWalletService.instance = new CcdWalletService()

      CcdWalletService.ccdCl = new ConcordiumWalletClient({
        bridgeHost: "bridge1.concordiumprojects.com",
        bridgeConnectionKey: process.env.REACT_APP_BRIDGE_CONNECTION_KEY || "",
        qrModal: ModalAdapter,
      })

      CcdWalletService.ccdCl.on("accept", () => {
        console.log("accepted")
        //@ts-ignore
        CcdWalletService.ccdCl.send("AccountInfo")
      })

      CcdWalletService.ccdCl.on("error", (msg) => {
        console.log(msg)
      })

      CcdWalletService.ccdCl.on(
        "accountInfo",
        (message: WalletInfoDataType) => {
          if (message) console.log("Wallet info: ", message[0])
          WalletQrCodeMessageService.send(undefined)
          WalletInfoMessageService.send(message)
        }
      )

      CcdWalletService.ccdCl.on("transfer", (msg) => {
        const message: TransferMessage = msg
        if (message.data) {
          TransactionsMessageService.send(message)
        }
      })

      CcdWalletService.ccdCl.on("reject", (message: IBridgeMessage) => {
        WalletQrCodeMessageService.send(undefined)
        WalletRejectionMessageService.send(undefined)
        toast.warning("Rejected!")
      })
    }

    return CcdWalletService.instance
  }

  public SendTransaction(data: TransferData) {
    CcdWalletService.ccdCl.send("Transaction", data)
  }

  public TransferMoneyToBictory(data: TransferData) {
    CcdWalletService.ccdCl.send("Transaction", data)
  }

  public Connect() {
    CcdWalletService.ccdCl.connect()
  }
  public Disconnect() {
    CcdWalletService.ccdCl.disconnect()
  }
}

export const ccdWalletService = CcdWalletService.getInstance()
export type TransferData = any
