/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from "react-helmet-async"
import { Switch, Route } from "react-router-dom"
import { GlobalStyle } from "../styles/global-styles"

import "react-toastify/dist/ReactToastify.css"

import { HomePage } from "./containers/HomePage/Loadable"

import { NotFoundPage } from "./containers/NotFoundPage/Loadable"

import { AppPages } from "./constants"
import { useDispatch, useSelector } from "react-redux"
import { GlobalSelectors } from "./selectors"
import { useTranslation } from "react-i18next"
import { translations } from "locales/i18n"
import PrivateRoute from "./PrivateRoute"
import { globalActions, useGlobalSlice } from "./slice"
import { CookieKeys, cookies } from "services/cookie"
import styled from "styled-components/macro"
import { Components } from "./containers/Components/Loadable"
import { DomainPage } from "./containers/DomainPage/Loadable"
import { Container } from "@material-ui/core"
import { media } from "styles/media"
import { MyAccountPage } from "./containers/MyAccountPage/Loadable"
import { Navigation } from "./components/Navigation"
import { SettingsPage } from "./containers/SettingsPage/Loadable"
import { GlobalModals } from "./components/Modals/GlobalModals"
import { MessageNames, Subscriber } from "services/message_service"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { SubDomainPage } from "./containers/SubDomainPage/Loadable"
import { WalletDataDistributor } from "./containers/GlobalDataDistributor/WalletDataDistributor"
import { LinkedInCallback } from "react-linkedin-login-oauth2"
let timeOut
let canLogout = true

export function App() {
  useGlobalSlice()
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {}
  }, [dispatch])

  const isLoggedIn = useSelector(GlobalSelectors.loggedIn)
  const { t } = useTranslation()

  useEffect(() => {
    if (cookies.get(CookieKeys.ACCESS_TOKEN) !== undefined) {
      dispatch(globalActions.setIsLoggedIn(true))
    }
    const subscription = Subscriber.subscribe((msg: any) => {
      if (msg.name === MessageNames.AUTH_ERROR_EVENT) {
        clearTimeout(timeOut)
        if (canLogout === true) {
          canLogout = false
          dispatch(globalActions.setIsLoggedIn(false))
          toast.error("Authentication failed. Please sign in first!")
        }
        timeOut = setTimeout(() => {
          canLogout = true
        }, 1000)
      }
    })

    return () => subscription.unsubscribe()
  }, [cookies.get(CookieKeys.ACCESS_TOKEN)])

  return (
    <>
      <GlobalModals />
      <WalletDataDistributor />
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Bictory"
          defaultTitle={t(translations.HomePage.home())}
        >
          <meta name="description" content="Bictory" />
        </Helmet>

        <Layout>
          <Navigation />
          <Container>
            <MainContent>
              <Switch>
                <Route exact path={AppPages.RootPage} component={HomePage} />
                <Route path={AppPages.Components} component={Components} />
                <Route
                  exact
                  path="/settings/linkedin"
                  component={LinkedInCallback}
                />
                <PrivateRoute
                  exact
                  path={`${AppPages.MyAccountPage}`}
                  component={MyAccountPage}
                />
                <PrivateRoute
                  exact
                  path={`${AppPages.SettingsPage}`}
                  component={SettingsPage}
                />
                <PrivateRoute
                  exact
                  path={`${AppPages.SettingsPage}/linkedin`}
                  component={SettingsPage}
                />
                <Route
                  path={`${AppPages.DomainPage}/:id/:tab`}
                  component={DomainPage}
                />
                <Route
                  path={`${AppPages.SubDomainPage}/:id`}
                  component={SubDomainPage}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </MainContent>
          </Container>
        </Layout>
        <GlobalStyle />
      </AppWrapper>
    </>
  )
}

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Layout = styled.div`
  display: flex;
  overflow: hidden;
`

const MainContent = styled.main`
  width: 100%;
  padding: 70px 40px;

  ${media.md`
    padding: 70px 0 40px;
  `}
`
