import { Box } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { BButton } from "app/components/BButton"
import { BModal } from "app/components/BModal"
import { BText } from "app/components/common/BText"
import { Spacer } from "app/components/common/Spacer"
import { DomainPageSelectors } from "app/containers/DomainPage/selectors"
import { DomainPageActions } from "app/containers/DomainPage/slice"
import styled from "styled-components/macro"
import { formatCurrencyWithMaxFraction } from "utils/formatters"
import { IconBox } from "app/containers/DomainPage/style"
import { ReactComponent as ConcordiumLogo } from "images/icons/concordium-logo.svg"
import { Divider } from "app/components/common/Divider"
import { useEffect } from "react"
import { GridLoading } from "app/components/grid_loading/gridLoading"
import { FeeMismatchWarning } from "app/components/feeMismatchWarning"
import useDevice from "hooks/useDevice"

export const ConfirmSubdomain = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(GlobalSelectors.isOpenConfirmSubdomain)
  const { isMobile } = useDevice()

  const subdomainName = useSelector(DomainPageSelectors.subdomainName)
  const domain = useSelector(DomainPageSelectors.domain)
  const walletInfoData = useSelector(GlobalSelectors.walletInfoData)
  const slippagePercent = useSelector(DomainPageSelectors.slippage)

  const isLoadingSubdomainFee = useSelector(
    DomainPageSelectors.isLoadingSubdomainFee
  )
  const subdomainPrice = useSelector(DomainPageSelectors.subdomainPrice)
  const subdomainPriceSlippage = useSelector(
    DomainPageSelectors.subdomainPriceSlippage
  )
  const subdomainFee = useSelector(DomainPageSelectors.subdomainFee)
  const totalSubdomainPrice = useSelector(
    DomainPageSelectors.totalSubdomainPrice
  )

  const onClose = () => {
    dispatch(globalActions.setIsOpenConfirmSubdomain(false))
  }

  const createSubdomain = () => {
    onClose()
    if (walletInfoData && !isMobile) {
      dispatch(DomainPageActions.startSubdomainRegisterProccess())
      return
    }
    dispatch(
      globalActions.setIsOpenConnectWalletInfo({
        open: true,
        afterConnection: DomainPageActions.startSubdomainRegisterProccess,
      })
    )
  }

  useEffect(() => {
    if (domain && isOpen && subdomainName)
      dispatch(DomainPageActions.getSubdomainFee())
  }, [domain, isOpen, subdomainName])

  return (
    <BModal
      isOpen={isOpen}
      onClose={onClose}
      modalsize="medium"
      title="Confirm Details"
    >
      <StyledText>
        {subdomainName}.{domain?.name}
      </StyledText>
      <StyledText>Please review name and confirm price.</StyledText>

      <Spacer vSpace={CssVariables.Space40} />

      {isLoadingSubdomainFee ? (
        <GridLoading />
      ) : (
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <BText size="m">Subdomain Price:</BText>
            <BText size="m" color={CssVariables.White}>
              <Box display="flex" alignItems="center">
                <IconBox mr={1}>
                  <ConcordiumLogo fill={CssVariables.White} />
                </IconBox>
                {formatCurrencyWithMaxFraction(
                  Number(subdomainPrice).toString(),
                  4
                )}
              </Box>
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
              <Box display="flex" alignItems="center">
                <IconBox mr={1}>
                  <ConcordiumLogo fill={CssVariables.White} />
                </IconBox>
                {formatCurrencyWithMaxFraction(
                  subdomainPriceSlippage.toString(),
                  4
                )}
              </Box>
            </BText>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <BText size="m">Max Gas Limit : </BText>
            <BText size="m" color={CssVariables.White}>
              <Box display="flex" alignItems="center">
                <IconBox mr={1}>
                  <ConcordiumLogo fill={CssVariables.White} />
                </IconBox>
                {formatCurrencyWithMaxFraction(subdomainFee?.toString(), 4)}
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
                  totalSubdomainPrice.toString(),
                  4
                )}
              </Box>
            </BText>
          </Box>
        </Box>
      )}
      <Spacer vSpace={CssVariables.Space72} />

      <BButton
        onClick={createSubdomain}
        btn="secondary"
        label="Approve"
        fullWidth
      />

      <Spacer vSpace={CssVariables.Space24} />

      <BButton onClick={onClose} btn="outlineDanger" label="Cancel" fullWidth />
      <FeeMismatchWarning />

      <Spacer vSpace={CssVariables.Space32} />
    </BModal>
  )
}

export const StyledText = styled(BText)`
  max-width: 325px;
  text-align: center;
  margin: 0 auto;
  color: ${CssVariables.Gray4};
`

export const Devider = styled.div`
  width: 100%;
  height: 1px;
  background: ${CssVariables.Gray3};
`
