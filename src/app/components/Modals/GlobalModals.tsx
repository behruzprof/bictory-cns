import { memo } from "react"
import { PendingAlert } from "./TransactionModals/PendingAlert"
import { ConnectWalletInfo } from "./ConnectWalletInfo"
import { ConnectWalletQr } from "./ConnectWalletQR"
import { DisconnectWallet } from "./DisconnectWallet"
import { FailedAlert } from "./TransactionModals/FailedAlert"
import { SubmittedAlert } from "./TransactionModals/SubmittedAlert"
import { UserWallet } from "./UserWallet"
import { WalletQrCodeDataDistributor } from "./walletQrCodeDataDistributor"

export const GlobalModals = memo(
  () => {
    return (
      <>
        <WalletQrCodeDataDistributor />
        <ConnectWalletInfo />
        <ConnectWalletQr />
        <UserWallet />
        <DisconnectWallet />
        <PendingAlert />
        <SubmittedAlert />
        <FailedAlert />
      </>
    )
  },
  () => true
)
