import { ButtonProps } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { BButton } from "../BButton"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { globalActions } from "app/slice"
import { BButtonProps } from "../BButton/types"
import { useLocation } from "react-router-dom"
import { sessionStorageService } from "utils/storage"
import { SessionStorageKeys } from "services/constants"

interface Props {
  children?: any
  text?: string
}

export const AuthorizationRequiredButton: FC<
  ButtonProps & BButtonProps & Props
> = ({ children, text, ...otherProps }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const showLogin = () => {
    sessionStorageService.write(
      SessionStorageKeys.REDIRECT_ACTION,
      location.pathname
    )
    dispatch(globalActions.setIsOpenConnectWalletInfo({ open: true }))
  }

  const loggedIn = useSelector(GlobalSelectors.loggedIn)
  if (!loggedIn) {
    return (
      <BButton btn="secondary" onClick={showLogin} {...otherProps}>
        {text || "Login"}
      </BButton>
    )
  }
  return children
}
