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
import { NormalInput } from "app/components/Inputs"
import { Spacer } from "app/components/common/Spacer"
import { globalActions } from "app/slice"
import { useEffect } from "react"
import { formatCurrencyWithMaxFraction } from "utils/formatters"
import { GridLoading } from "app/components/grid_loading/gridLoading"
import { GlobalSelectors } from "app/selectors"
import useDevice from "hooks/useDevice"

export const TransferDomainModal = () => {
  const dispatch = useDispatch()

  const domain = useSelector(DomainPageSelectors.domain)
  const transferDomainWalletAddress = useSelector(
    DomainPageSelectors.transferDomainWalletAddress
  )

  const { isMobile } = useDevice()

  const isOpenTransferModal = useSelector(
    DomainPageSelectors.isOpenTransferModal
  )

  const isLoadingTransferFee = useSelector(
    DomainPageSelectors.isLoadingTransferFee
  )
  const transferFee = useSelector(DomainPageSelectors.transferFee)

  const walletInfoData = useSelector(GlobalSelectors.walletInfoData)

  const closeTransferModal = () => {
    dispatch(DomainPageActions.setIsOpenTransferModal(false))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      DomainPageActions.setTransferDomainWalletAddress(event.target.value)
    )
  }

  const transferDomain = () => {
    closeTransferModal()
    if (walletInfoData && !isMobile) {
      dispatch(DomainPageActions.startTransferDomainProccess())
      return
    }
    dispatch(
      globalActions.setIsOpenConnectWalletInfo({
        open: true,
        afterConnection: DomainPageActions.startTransferDomainProccess,
      })
    )
  }

  useEffect(() => {
    if (domain && isOpenTransferModal)
      dispatch(DomainPageActions.getTransferFee())
  }, [domain, isOpenTransferModal])

  return (
    <BModal
      modalsize="medium"
      title="Transfer Domain"
      isOpen={isOpenTransferModal}
      onClose={closeTransferModal}
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
              Confirm domain and transfer address
            </BText>

            <Spacer vSpace={CssVariables.Space24} />

            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <BText ml={3} mb={1} size="xs" color={CssVariables.Gray4}>
                Enter Address
              </BText>

              <NormalInput
                value={transferDomainWalletAddress}
                onChange={handleChange}
              />
            </Box>

            {isLoadingTransferFee ? (
              <GridLoading />
            ) : (
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
                  <BText size="m">Max Gas Limit : </BText>
                  <BText size="m" color={CssVariables.White}>
                    <Box display="flex" alignItems="center">
                      <IconBox mr={1}>
                        <ConcordiumLogo fill={CssVariables.White} />
                      </IconBox>
                      {formatCurrencyWithMaxFraction(
                        Number(transferFee).toString(),
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
                        Number(transferFee).toString(),
                        4
                      )}
                    </Box>
                  </BText>
                </Box>
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            pt={3}
            mt={1}
          >
            <Box mb={3} width>
              <BButton
                onClick={transferDomain}
                loadingLabel="Transfer..."
                btn="secondary"
                btnsize="medium"
                fullWidth
              >
                Transfer Domain
              </BButton>
            </Box>
            <BButton
              onClick={closeTransferModal}
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
