import { Box } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CssVariables } from "styles/global-styles"
import { BModal } from "../BModal"
import { BText } from "../common/BText"
import { Spacer } from "../common/Spacer"
import {
  ArrowRight,
  CryptoxIcon,
  CustomLink,
  HighlightedBox,
  StyledText,
} from "./style"

const AppleLink = "https://apps.apple.com/sg/app/cryptox-wallet/id1593386457"
const AndroidLink =
  "https://play.google.com/store/apps/details?id=com.pioneeringtechventures.wallet&hl=en_IE&gl=US"

const deviceIphone = "iphone"
const deviceIpod = "ipod"
const deviceAndroid = "android"

export const ConnectWalletInfo = () => {
  const dispatch = useDispatch()
  const [walletAppAddress, setWalletAppAddress] = useState<string>(AppleLink)
  const isOpen = useSelector(GlobalSelectors.isOpenConnectWalletInfo)
  const userData = useSelector(GlobalSelectors.user)

  const onClose = () =>
    dispatch(globalActions.setIsOpenConnectWalletInfo({ open: false }))

  const openQrModal = () => {
    dispatch(globalActions.setIsOpenConnectWalletInfo({ open: false }))
    dispatch(globalActions.setIsOpenConnectWalletQR(true))
  }

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    if (
      userAgent.search(deviceIphone) > -1 ||
      userAgent.search(deviceIpod) > -1
    )
      setWalletAppAddress(AppleLink)

    if (userAgent.search(deviceAndroid) > -1) setWalletAppAddress(AndroidLink)
  }, [])

  useEffect(() => {
    if (userData?.wallet_address && isOpen) {
      dispatch(globalActions.setIsOpenConnectWalletQR(true))
      onClose()
    } else {
      // setIsOpenModal(isOpenConnectWalletInfoModal)
    }
  }, [isOpen])

  return (
    <BModal
      isOpen={isOpen}
      onClose={onClose}
      modalsize="medium"
      title="Connect Your Wallet"
    >
      <StyledText>
        Hey there! In order to use this website you’ll need a connected wallet
      </StyledText>

      <Spacer vSpace={CssVariables.Space56} />

      <HighlightedBox onClick={openQrModal}>
        <Box display="flex" alignItems="center">
          <CryptoxIcon />
          <Spacer hSpace={CssVariables.Space16} />
          <BText size="l">CryptoX Wallet</BText>
        </Box>

        <ArrowRight />
      </HighlightedBox>

      <Spacer vSpace={CssVariables.Space120} />

      <StyledText size="s">Don’t have a crypto X wallet?</StyledText>

      <Spacer vSpace={CssVariables.Space16} />

      <a href={walletAppAddress} target="_blank" rel="noreferrer">
        <CustomLink>
          <CryptoxIcon />
          <BText size="l">Create a new wallet</BText>
          <ArrowRight />
        </CustomLink>
      </a>
    </BModal>
  )
}
