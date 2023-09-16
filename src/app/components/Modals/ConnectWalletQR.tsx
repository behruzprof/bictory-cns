import { Box } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import QrCode from "qrcode.react"
import styled from "styled-components/macro"
import { BButton } from "../BButton"
import { BModal } from "../BModal"
import { BText } from "../common/BText"
import { Spacer } from "../common/Spacer"
import { CryptoxIcon, StyledText } from "./style"
import { ccdWalletService } from "services/ccdWallet"
import { useEffect } from "react"
import { GridLoading } from "../grid_loading/gridLoading"

export const ConnectWalletQr = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(GlobalSelectors.isOpenConnectWalletQR)
  const qrCodeWalletData = useSelector(
    GlobalSelectors.qrCodeWalletConnectorData
  )

  const onClose = () => {
    dispatch(globalActions.setQrCodeWalletConnectorData(undefined))
    dispatch(globalActions.setIsOpenConnectWalletQR(false))
    ccdWalletService.Disconnect()
  }

  useEffect(() => {
    if (isOpen) {
      ccdWalletService.Connect()
    }
  }, [isOpen])

  return (
    <BModal
      isOpen={isOpen}
      onClose={onClose}
      modalsize="medium"
      title="Connect Your Wallet"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" justifyContent="center">
          <CryptoxIcon />
          <Spacer hSpace={CssVariables.Space8} />
          <BText size="l">CryptoX Wallet</BText>
        </Box>

        <Spacer vSpace={CssVariables.Space8} />

        <StyledText size="s">Scan to connect your Wallet</StyledText>
      </Box>

      <Spacer vSpace={CssVariables.Space16} />

      <Box display="flex" flexDirection="column" alignItems="center">
        {qrCodeWalletData ? (
          <>
            <QRCodeBox>
              <QrCode value={qrCodeWalletData.connect_string} size={200} />
            </QRCodeBox>

            <Spacer vSpace={CssVariables.Space32} />

            <StyledText size="s">
              If you’re visiting on Mobile, click below.
            </StyledText>

            <Spacer vSpace={CssVariables.Space8} />

            <a
              target="_blank"
              href={`tcwb://ws?uri=${qrCodeWalletData.connect_string}`}
              rel="noreferrer"
            >
              <BButton btn="outlineSecondary" label="CryptoX Wallet Connect" />
            </a>
          </>
        ) : (
          <>
            <BText>Please wait...</BText>
            <Spacer vSpace={CssVariables.Space8} />
            <GridLoading />
          </>
        )}
      </Box>
    </BModal>
  )
}

const QRCodeBox = styled.div`
  width: max-content;
  height: auto;
  max-width: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${CssVariables.White};
  padding: 20px;
`
