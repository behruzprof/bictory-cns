import { Box } from "@material-ui/core"
import { BModal } from "app/components/BModal"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { Divider } from "app/components/common/Divider"
import { DomainPageSelectors } from "app/containers/DomainPage/selectors"
import { DomainPageActions } from "app/containers/DomainPage/slice"
import { IconBox } from "app/containers/DomainPage/style"
import { ReactComponent as ConcordiumLogo } from "images/icons/concordium-logo.svg"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { BButton } from "app/components/BButton"
import { Counter } from "../Counter"
import { globalActions } from "app/slice"
import { formatCurrencyWithMaxFraction } from "utils/formatters"
import { GlobalSelectors } from "app/selectors"
import { FeeMismatchWarning } from "app/components/feeMismatchWarning"
import useDevice from "hooks/useDevice"

export const RegisterConfirmModal = () => {
  const dispatch = useDispatch()

  const year = useSelector(DomainPageSelectors.year)
  const domain = useSelector(DomainPageSelectors.domain)
  const isCreatingDomain = useSelector(DomainPageSelectors.isCreatingDomain)
  const { isMobile } = useDevice()
  const domainRegisterPriceInCCD = useSelector(
    DomainPageSelectors.domainRegisterPriceInCCD
  )
  const registerFee = useSelector(DomainPageSelectors.registerFee)

  const domainRegPriceSlippageInCCD = useSelector(
    DomainPageSelectors.domainRegPriceSlippageInCCD
  )
  const totalRegPriceInCCD = useSelector(DomainPageSelectors.totalRegPriceInCCD)
  const slippagePercent = useSelector(DomainPageSelectors.slippage)

  const isOpenConfirmModal = useSelector(
    DomainPageSelectors.isOpenConfirmModalDomain
  )

  const walletInfoData = useSelector(GlobalSelectors.walletInfoData)

  const closeConfirmModal = () => {
    dispatch(DomainPageActions.setIsOpenConfirmModal(false))
  }

  const registerDomain = () => {
    if (walletInfoData && !isMobile) {
      dispatch(DomainPageActions.startRegisterProcess())
      return
    }
    dispatch(
      globalActions.setIsOpenConnectWalletInfo({
        open: true,
        afterConnection: DomainPageActions.startRegisterProcess,
      })
    )
    closeConfirmModal()
  }

  return (
    <BModal
      modalsize="medium"
      title="Confirm Details"
      isOpen={isOpenConfirmModal}
      onClose={closeConfirmModal}
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
              Please review name and confirm price.
            </BText>
            <Box
              width="100%"
              mt={6}
              display="flex"
              flexDirection="column"
              color={CssVariables.Gray3}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <BText size="m">Active Period:</BText>
                <Box display="flex" alignItems="center">
                  <BText size="m" color={CssVariables.White}>
                    {year} Year
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
                  <Box display="flex" alignItems="center">
                    <IconBox mr={1}>
                      <ConcordiumLogo fill={CssVariables.White} />
                    </IconBox>
                    {formatCurrencyWithMaxFraction(
                      Number(domainRegisterPriceInCCD).toString(),
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
                      domainRegPriceSlippageInCCD.toString(),
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
                    {formatCurrencyWithMaxFraction(registerFee?.toString(), 4)}
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
                      totalRegPriceInCCD.toString(),
                      4
                    )}
                  </Box>
                </BText>
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            pt={3}
            mt={3}
          >
            <Box mb={3} width>
              <BButton
                onClick={registerDomain}
                loadingLabel="Registering..."
                isLoading={isCreatingDomain}
                btn="secondary"
                btnsize="medium"
                fullWidth
              >
                Approve
              </BButton>
            </Box>
            <BButton
              onClick={closeConfirmModal}
              fullWidth
              btn="outlineDanger"
              btnsize="medium"
            >
              Cancel
            </BButton>
            <FeeMismatchWarning />
          </Box>
        </>
      )}
    </BModal>
  )
}
