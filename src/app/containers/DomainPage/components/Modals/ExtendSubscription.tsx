import { Box } from "@material-ui/core"
import { BModal } from "app/components/BModal"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { Divider } from "app/components/common/Divider"
import { DomainPageSelectors } from "app/containers/DomainPage/selectors"
import { DomainPageActions } from "app/containers/DomainPage/slice"
import { ReactComponent as ConcordiumLogo } from "images/icons/concordium-logo.svg"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { BButton } from "app/components/BButton"
import { Spacer } from "app/components/common/Spacer"
import styled from "styled-components/macro"
import { IconBox } from "app/containers/DomainPage/style"
import { globalActions } from "app/slice"
import { useEffect } from "react"
import { formatCurrencyWithMaxFraction } from "utils/formatters"
import { GridLoading } from "app/components/grid_loading/gridLoading"
import { ExtendCounter } from "../ExtendCounter"
import { maxYear } from "../../constants"
import { GlobalSelectors } from "app/selectors"
import useDevice from "hooks/useDevice"

export const ExtendSubscription = () => {
  const dispatch = useDispatch()

  const extendYear = useSelector(DomainPageSelectors.extendYear)
  const domain = useSelector(DomainPageSelectors.domain)

  const isOpenExtendModal = useSelector(DomainPageSelectors.isOpenExtendModal)
  const { isMobile } = useDevice()

  const isLoadingExtendFee = useSelector(DomainPageSelectors.isLoadingExtendFee)
  const extendPriceByYear = useSelector(DomainPageSelectors.extendPriceByYear)
  const extendFee = useSelector(DomainPageSelectors.extendFee)

  const totalExtendPrice = useSelector(DomainPageSelectors.totalExtendPrice)
  const allowedYearToExtend = useSelector(
    DomainPageSelectors.allowedYearToExtend
  )
  const walletInfoData = useSelector(GlobalSelectors.walletInfoData)

  const closeExtendSubModal = () => {
    dispatch(DomainPageActions.setIsOpenExtendModal(false))
  }

  const extendDomain = () => {
    closeExtendSubModal()
    if (walletInfoData && !isMobile) {
      dispatch(DomainPageActions.startExtendDomainProccess())
      return
    }
    dispatch(
      globalActions.setIsOpenConnectWalletInfo({
        open: true,
        afterConnection: DomainPageActions.startExtendDomainProccess,
      })
    )
  }

  useEffect(() => {
    if (domain && isOpenExtendModal) dispatch(DomainPageActions.getExtendFee())
  }, [domain, isOpenExtendModal])

  return (
    <BModal
      modalsize="medium"
      title="Renew Subscription"
      isOpen={isOpenExtendModal}
      onClose={closeExtendSubModal}
    >
      {domain && (
        <>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
          >
            <BTitle size="h5" weight="reg">
              {domain.name}
            </BTitle>
            <BText size="m" color={CssVariables.Gray4}>
              Increase the subscription period of this domain to keep it active.
              Maximum allowed period for domain subscription is {maxYear} years.
            </BText>

            <Spacer vSpace={CssVariables.Space24} />
            {allowedYearToExtend === 0 ? (
              <>
                You have reached maximum period allowed to be subscribed for
                domain
              </>
            ) : (
              <>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <BText ml={3} mb={1} size="xs" color={CssVariables.Gray4}>
                    Duration
                  </BText>

                  <DurationWrapper>
                    <Box>{extendYear} Year</Box>

                    <ExtendCounter />
                  </DurationWrapper>
                </Box>

                <Box
                  width="100%"
                  mt={3}
                  display="flex"
                  flexDirection="column"
                  color={CssVariables.Gray3}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <BText size="m">Active Period:</BText>
                    <BText size="m" color={CssVariables.White}>
                      <Box display="flex" alignItems="center">
                        {extendYear} Year
                      </Box>
                    </BText>
                  </Box>

                  {isLoadingExtendFee ? (
                    <GridLoading />
                  ) : (
                    <>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <BText size="m">Domain Price:</BText>
                        <BText size="m" color={CssVariables.White}>
                          <Box display="flex" alignItems="center">
                            <IconBox mr={1}>
                              <ConcordiumLogo fill={CssVariables.White} />
                            </IconBox>
                            {formatCurrencyWithMaxFraction(
                              Number(extendPriceByYear).toString(),
                              4
                            )}
                          </Box>
                        </BText>
                      </Box>

                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <BText size="m">Max Gas Limit : </BText>

                        <BText size="m" color={CssVariables.White}>
                          <Box display="flex" alignItems="center">
                            <IconBox mr={1}>
                              <ConcordiumLogo fill={CssVariables.White} />
                            </IconBox>
                            {formatCurrencyWithMaxFraction(
                              Number(extendFee).toString(),
                              4
                            )}
                          </Box>
                        </BText>
                      </Box>

                      <Divider />

                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <BText size="m" color={CssVariables.Primary}>
                          Total:
                        </BText>
                        <BText size="m" color={CssVariables.White}>
                          <Box display="flex" alignItems="center">
                            <IconBox mr={1}>
                              <ConcordiumLogo fill={CssVariables.White} />
                            </IconBox>
                            {formatCurrencyWithMaxFraction(
                              Number(totalExtendPrice).toString(),
                              4
                            )}
                          </Box>
                        </BText>
                      </Box>
                    </>
                  )}
                </Box>
              </>
            )}
          </Box>

          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            pt={3}
            mt={1}
          >
            {allowedYearToExtend !== 0 && (
              <Box mb={3} width>
                <BButton
                  onClick={extendDomain}
                  loadingLabel="Registering..."
                  btn="secondary"
                  btnsize="medium"
                  fullWidth
                >
                  Renew Subscription
                </BButton>
              </Box>
            )}

            <BButton
              onClick={closeExtendSubModal}
              fullWidth
              btn="outlineDanger"
              btnsize="medium"
            >
              Cancel
            </BButton>
          </Box>
        </>
      )}
    </BModal>
  )
}

const DurationWrapper = styled.div`
  border: 1px solid ${CssVariables.Gray5};
  width: 100%;
  border-radius: 4px;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
`
