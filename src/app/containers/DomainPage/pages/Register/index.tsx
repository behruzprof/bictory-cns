import { Box, Grid } from "@material-ui/core"
import { BButton } from "app/components/BButton"
import { Card } from "app/components/Cards"
import { Status } from "app/components/common/Status"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { FC, useEffect, useMemo } from "react"
import { CssVariables } from "styles/global-styles"
import { useDispatch, useSelector } from "react-redux"
import { DomainPageActions } from "../../slice"
import { Divider } from "app/components/common/Divider"
import { Steps } from "./components/Steps"
import { DomainPageSelectors } from "../../selectors"
import { Counter } from "../../components/Counter"
import { formatCurrencyWithMaxFraction } from "utils/formatters"
import { GridLoading } from "app/components/grid_loading/gridLoading"
import { GlobalSelectors } from "app/selectors"
import { StatusEnum } from "app/types"
import { AuthorizationRequiredButton } from "app/components/AuthorizationRequiredButton"
import { replace } from "connected-react-router"
import { statusToTab } from "utils/commonUtils"
import { RegisterButton } from "./components/Steps/registerButton"

interface Props {}

export const Register: FC<Props> = () => {
  const dispatch = useDispatch()

  const userData = useSelector(GlobalSelectors.user)
  const year = useSelector(DomainPageSelectors.year)
  const domain = useSelector(DomainPageSelectors.domain)
  const favoriteDomains = useSelector(GlobalSelectors.favoriteDomains)
  const registerFee = useSelector(DomainPageSelectors.registerFee)
  const registerFeeUSD = useSelector(DomainPageSelectors.registerFeeUSD)

  const isLoadingRegisterFee = useSelector(
    DomainPageSelectors.isLoadingRegGasFee
  )
  const domainRegisterPriceInCCD = useSelector(
    DomainPageSelectors.domainRegisterPriceInCCD
  )
  const domainRegisterPriceInUSD = useSelector(
    DomainPageSelectors.domainRegisterPriceInUSD
  )
  const domainRegPriceSlippageInCCD = useSelector(
    DomainPageSelectors.domainRegPriceSlippageInCCD
  )
  const domainRegPriceSlippageInUSD = useSelector(
    DomainPageSelectors.domainRegPriceSlippageInUSD
  )
  const totalRegPriceInCCD = useSelector(DomainPageSelectors.totalRegPriceInCCD)
  const totalRegPriceInUSD = useSelector(DomainPageSelectors.totalRegPriceInUSD)
  const slippagePercent = useSelector(DomainPageSelectors.slippage)

  const isFavDns = favoriteDomains?.some(
    (favDomain) => favDomain === domain?.name
  )

  useEffect(() => {
    if (domain && userData?.wallet_address)
      dispatch(DomainPageActions.getRegisterFee())
  }, [domain, userData?.wallet_address])

  const isReserved = useMemo(
    () => domainRegisterPriceInUSD === 0,
    [domainRegisterPriceInUSD]
  )

  useEffect(() => {
    if (
      domain &&
      !domain?.available &&
      domain?.entity?.status !== StatusEnum.available
    ) {
      dispatch(
        replace(
          `/domain/${domain?.entity?.id}/${statusToTab(domain?.entity?.status)}`
        )
      )
    }
  }, [domain])

  return (
    <>
      {domain && (
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" mb={4}>
            <BText size="l">Register a new domain name</BText>
          </Box>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={4} md={5} sm={6}>
                <Box
                  alignItems="center"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  mb={3}
                >
                  <Box
                    display="flex"
                    maxWidth="340px"
                    width="100%"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Card
                      status={
                        isReserved ? StatusEnum.reserved : StatusEnum.available
                      }
                      domainName={domain.name}
                      id={domain.name}
                      available={isReserved ? false : domain.available}
                      favorite={isFavDns}
                      disabled
                    />
                    <Box mt={2} width="100%">
                      {isReserved ? (
                        <BText color={CssVariables.Primary}>
                          Contact with bictory support if you want to register
                          this domain
                        </BText>
                      ) : (
                        <AuthorizationRequiredButton
                          text="Connect Wallet to Register"
                          btnsize="medium"
                          fullWidth
                        >
                          <RegisterButton />
                        </AuthorizationRequiredButton>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={8} md={6} sm={6}>
                <BTitle size="h5" weight="reg">
                  {domain.name}
                </BTitle>
                <BText size="m" weight="reg" color={CssVariables.Gray4}>
                  This Domain is {` `}
                  <Status status="available">
                    {isReserved ? "Reserved" : "Available"}
                  </Status>
                </BText>
                {isReserved ? (
                  <></>
                ) : (
                  <>
                    <Box mt={5} mb={2}>
                      <BText size="s" color={CssVariables.Primary}>
                        Registration Information
                      </BText>
                    </Box>
                    <Grid container>
                      <Grid item xs={12} lg={10} md={11} sm={12}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <BText size="m">Active Period:</BText>
                          <Box display="flex" alignItems="center">
                            <BText size="m" color={CssVariables.White}>
                              {year} Year.
                            </BText>

                            <Counter />
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <BText size="m">Domain Price:</BText>
                          <BText size="m" color={CssVariables.White}>
                            {formatCurrencyWithMaxFraction(
                              Number(domainRegisterPriceInCCD).toString(),
                              4
                            )}{" "}
                            CCD (~
                            {formatCurrencyWithMaxFraction(
                              Number(domainRegisterPriceInUSD).toString(),
                              4
                            )}{" "}
                            $ )
                          </BText>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <BText size="m">Slippage ({slippagePercent}%):</BText>
                          <BText size="m" color={CssVariables.White}>
                            {formatCurrencyWithMaxFraction(
                              domainRegPriceSlippageInCCD.toString(),
                              4
                            )}{" "}
                            CCD (~
                            {formatCurrencyWithMaxFraction(
                              domainRegPriceSlippageInUSD.toString(),
                              4
                            )}{" "}
                            $ )
                          </BText>
                        </Box>

                        {isLoadingRegisterFee ? (
                          <GridLoading />
                        ) : (
                          <>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mb={2}
                            >
                              <BText size="m">Max Gas Limit : </BText>
                              <BText size="m" color={CssVariables.White}>
                                {formatCurrencyWithMaxFraction(
                                  registerFee?.toString(),
                                  4
                                )}{" "}
                                CCD (~
                                {formatCurrencyWithMaxFraction(
                                  registerFeeUSD?.toString(),
                                  4
                                )}{" "}
                                $ )
                              </BText>
                            </Box>
                            <Divider />
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mb={2}
                            >
                              <BText size="m">Total:</BText>
                              <BText size="m" color={CssVariables.White}>
                                {formatCurrencyWithMaxFraction(
                                  totalRegPriceInCCD.toString(),
                                  4
                                )}{" "}
                                CCD (~
                                {formatCurrencyWithMaxFraction(
                                  totalRegPriceInUSD?.toString(),
                                  4
                                )}{" "}
                                $ )
                              </BText>
                            </Box>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
          <Steps />
        </Box>
      )}
    </>
  )
}
