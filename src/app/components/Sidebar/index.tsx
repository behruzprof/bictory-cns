import { AppPages, SidebarWidth } from "app/constants"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"
import { Link, NavLink } from "react-router-dom"
import { Spacer } from "../common/Spacer"
import { ReactComponent as DomainsIcon } from "images/icons/domainsIcon.svg"
import { ReactComponent as MyAccountIcon } from "images/icons/myAccountIcon.svg"
import { ReactComponent as FavouritesIcon } from "images/icons/favouritesIcon.svg"
import { ReactComponent as SettingsIcon } from "images/icons/settingsIcon.svg"
import { ReactComponent as AboutIcon } from "images/icons/aboutIcon.svg"
import { media } from "styles/media"
import { BButton } from "../BButton"
import { Box } from "@material-ui/core"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { CookieKeys, cookies } from "services/cookie"
import { GlobalSelectors } from "app/selectors"
import { sessionStorageService } from "utils/storage"
import { SessionStorageKeys } from "services/constants"
import { ReactComponent as LogoIcon } from "images/logo.svg"

export const sidebarLinks = [
  {
    id: 1,
    to: AppPages.RootPage,
    Icon: DomainsIcon,
    title: "Domains",
    openAuthModal: false,
  },
  {
    id: 2,
    to: AppPages.MyAccountPage,
    Icon: MyAccountIcon,
    title: "My Account",
    openAuthModal: true,
  },
  /*  {
    id: 3,
    to: "/Favorites",
    Icon: FavouritesIcon,
    title: "Favorites",
    openAuthModal: true,
  }, */
  {
    id: 4,
    to: AppPages.SettingsPage,
    Icon: SettingsIcon,
    title: "Settings",
    openAuthModal: true,
  },
  /* {
    id: 5,
    to: "/About",
    Icon: AboutIcon,
    title: "About",
  }, */
]

export const SideBar = () => {
  const dispatch = useDispatch()

  const isLoadingUserData = useSelector(GlobalSelectors.isLoadingUserData)
  const userData = useSelector(GlobalSelectors.user)

  const connectUserWallet = () =>
    dispatch(globalActions.setIsOpenConnectWalletInfo({ open: true }))

  const disconnectUserWallet = () =>
    dispatch(globalActions.setIsOpenDisconnectWallet(true))

  const unAuthHandler = (e, openAuthModal, redirectPath) => {
    sessionStorageService.write(
      SessionStorageKeys.REDIRECT_ACTION,
      redirectPath
    )
    if (!cookies.get(CookieKeys.ACCESS_TOKEN) && openAuthModal) {
      e.preventDefault()
      connectUserWallet()
    }
  }

  return (
    <Wrapper>
      <Link to={AppPages.RootPage}>
        <Logo>
          <StyledLogoIcon />
        </Logo>
      </Link>

      <Spacer vSpace={CssVariables.Space32} />

      <List>
        {sidebarLinks.map(({ id, to, Icon, title, openAuthModal }) => (
          <StyledLink
            key={id}
            to={to}
            exact
            activeClassName="selected"
            onClick={(e) => unAuthHandler(e, openAuthModal, to)}
          >
            <Icon />
            <span>{title}</span>
          </StyledLink>
        ))}
      </List>

      <Spacer vSpace={CssVariables.Space32} />

      <ConnectWalletWrapper display="flex" justifyContent="center">
        {userData ? (
          <BButton
            onClick={disconnectUserWallet}
            btn="outlineSecondary"
            fullWidth
          >
            <WalletAddress>{userData.wallet_address}</WalletAddress>
          </BButton>
        ) : (
          <BButton
            onClick={connectUserWallet}
            label="Connect Wallet"
            btn="outlineSecondary"
            loadingLabel="Connecting..."
            isLoading={isLoadingUserData}
            fullWidth
          />
        )}
      </ConnectWalletWrapper>
    </Wrapper>
  )
}

const SideSpace = `5px 30px`

const Wrapper = styled.div`
  background: ${CssVariables.Black1};
  width: ${SidebarWidth}px;
  border-right: 1px solid ${CssVariables.Main};
  min-height: 100vh;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
`

const Logo = styled.h1`
  color: ${CssVariables.White};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
`

const StyledLogoIcon = styled(LogoIcon)`
  ${media.sm`
    width: 80px
  `}
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 13px;
  color: ${CssVariables.Gray500};
  font-size: 18px;
  padding: ${SideSpace};
  margin: 5px 0;
  border-right: 2px solid transparent;
  transition: 0.3s;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.selected {
    color: ${CssVariables.Primary};
    border-right: 2px solid ${CssVariables.Secondary};
    path {
      stroke: ${CssVariables.Primary};
    }
  }

  &:hover {
    color: ${CssVariables.Primary};
    border-right: 2px solid ${CssVariables.Secondary};
  }

  &:hover svg {
    path {
      transition: 0.3s;
      stroke: ${CssVariables.Primary};
    }
  }

  ${media.md`
    font-size: 14px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  `}
`

const ConnectWalletWrapper = styled(Box)`
  padding: ${SideSpace};
`

const WalletAddress = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
