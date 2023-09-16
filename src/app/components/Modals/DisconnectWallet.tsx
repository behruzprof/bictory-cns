import { Box } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { BButton } from "../BButton"
import { BModal } from "../BModal"
import { BText } from "../common/BText"
import { Spacer } from "../common/Spacer"
import { GridLoading } from "../grid_loading/gridLoading"
import { CryptoxIcon, StyledText, WalletAddress } from "./style"

export const DisconnectWallet = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(GlobalSelectors.isOpenDisconnectWallet)

  const isLoadingUserData = useSelector(GlobalSelectors.isLoadingUserData)
  const userData = useSelector(GlobalSelectors.user)

  const onClose = () => dispatch(globalActions.setIsOpenDisconnectWallet(false))

  const logOut = () => {
    dispatch(globalActions.logOut())
    onClose()
  }

  return (
    <BModal
      isOpen={isOpen}
      onClose={onClose}
      modalsize="medium"
      title="Disconnect Wallet"
    >
      <StyledText>
        Are you sure you want to disconnect this wallet from this website?
      </StyledText>

      <Spacer vSpace={CssVariables.Space56} />

      {isLoadingUserData ? (
        <GridLoading />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CryptoxIcon />
          <Spacer hSpace={CssVariables.Space16} />
          <BText size="l">
            <WalletAddress>{userData?.wallet_address}</WalletAddress>
          </BText>
        </Box>
      )}

      <Spacer vSpace={CssVariables.Space72} />
      <BButton
        onClick={logOut}
        btn="danger"
        label="Yes Disconnect wallet"
        fullWidth
      />
      <Spacer vSpace={CssVariables.Space16} />
      <BButton
        onClick={onClose}
        btn="outlineSecondary"
        label="No, go back"
        fullWidth
      />
      <Spacer vSpace={CssVariables.Space40} />
    </BModal>
  )
}
