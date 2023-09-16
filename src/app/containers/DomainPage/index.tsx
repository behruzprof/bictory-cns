/**
 *
 * DomainPage
 *
 */

import { Helmet } from "react-helmet-async"
import { Box } from "@material-ui/core"
import { ButtonGroups, Wrapper } from "./style"
import { Route, Switch, useParams } from "react-router-dom"
import { DomainPages, DomainTabs } from "app/constants"
import { Register } from "./pages/Register/Loadable"
import { ParamsModule } from "./types"
import { TabButton } from "./components/TabButton"
import { FC, useEffect } from "react"
import { DomainPageActions, useDomainPageSlice } from "./slice"
import { Details } from "./pages/Details/Loadable"
import { RegisterConfirmModal } from "./components/Modals/RegisterConfirmModal"
import { Subdomains } from "./pages/Subdomains/Loadable"
import { Auction } from "./pages/Auction/Loadable"
import { useDispatch, useSelector } from "react-redux"
import { DomainTabsCmp } from "./components/Tabs"
import { DomainPageSelectors } from "./selectors"
import { GridLoading } from "app/components/grid_loading/gridLoading"
import { CreateSubdomain } from "./components/Modals/CreateSubdomain"
import { ConfirmSubdomain } from "./components/Modals/ConfirmSubdomain"
import { TransferDomainModal } from "./components/Modals/TransferDomain"
import { ExtendSubscription } from "./components/Modals/ExtendSubscription"
import { PlaceBidModal } from "./components/Modals/PlaceBid"
import { SetRecord } from "./pages/Details/components/Modals/SetRecord"
import { SetAddress } from "./pages/Details/components/Modals/SetAddress"
import { SellModal } from "./pages/Details/components/Modals/SellModal"

interface Props {}

export const DomainPage: FC<Props> = (props) => {
  useDomainPageSlice()
  const dispatch = useDispatch()
  const params = useParams<ParamsModule>()

  const isLoadingDomain = useSelector(DomainPageSelectors.isLoadingDomain)

  useEffect(() => {
    if (params.id && params.tab !== "register")
      dispatch(DomainPageActions.getDomain(Number(params.id)))
    if (params.id && params.tab === "register")
      dispatch(DomainPageActions.getSearchedDomain(params.id))
  }, [params.id])

  return (
    <>
      <Helmet>
        <title>DomainPage</title>
        <meta name="description" content="Description of DomainPage" />
      </Helmet>

      {isLoadingDomain ? (
        <GridLoading />
      ) : (
        <Wrapper>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <ButtonGroups display="flex" alignItems="center">
              <DomainTabsCmp />
            </ButtonGroups>
          </Box>
          <Switch>
            <Route path={DomainPages.Register} component={Register} />
            <Route path={DomainPages.Details} component={Details} />
            <Route path={DomainPages.Subdomains} component={Subdomains} />
            <Route path={DomainPages.Auction} component={Auction} />
          </Switch>
        </Wrapper>
      )}

      <CreateSubdomain />
      <ConfirmSubdomain />
      <TransferDomainModal />
      <ExtendSubscription />
      <PlaceBidModal />
      <SetRecord />
      <SetAddress />
      <SellModal />
    </>
  )
}
