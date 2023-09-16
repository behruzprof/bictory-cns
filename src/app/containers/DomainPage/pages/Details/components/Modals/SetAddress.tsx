import { Box } from "@material-ui/core"
import { DomainPageActions } from "app/containers/DomainPage/slice"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { BButton } from "app/components/BButton"
import { BModal } from "app/components/BModal"
import { Spacer } from "app/components/common/Spacer"
import { NormalInput } from "app/components/Inputs"
import { StyledText } from "app/components/Modals/style"
import { DomainPageSelectors } from "app/containers/DomainPage/selectors"
import { BText } from "app/components/common/BText"
import { GridLoading } from "app/components/grid_loading/gridLoading"
import { formatCurrencyWithMaxFraction } from "utils/formatters"
import { Divider } from "app/components/common/Divider"
import { IconBox } from "app/containers/DomainPage/style"
import { ReactComponent as ConcordiumLogo } from "images/icons/concordium-logo.svg"
import { GlobalSelectors } from "app/selectors"
import useDevice from "hooks/useDevice"

export const SetAddress = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(DomainPageSelectors.isOpenSetAddressModal)
  const resolverNewAddress = useSelector(DomainPageSelectors.resolverNewAddress)

  const { isMobile } = useDevice()

  const isLoadingSetAddressFee = useSelector(
    DomainPageSelectors.isLoadingSetAddressFee
  )
  const setAddressFee = useSelector(DomainPageSelectors.setAddressFee)

  const walletInfoData = useSelector(GlobalSelectors.walletInfoData)

  const onClose = () => {
    dispatch(DomainPageActions.setIsOpenSetAddressModal(false))
  }

  const setAddress = () => {
    onClose()

    if (walletInfoData && !isMobile) {
      dispatch(DomainPageActions.startSetAddressProccess())
      return
    }
    dispatch(
      globalActions.setIsOpenConnectWalletInfo({
        open: true,
        afterConnection: DomainPageActions.startSetAddressProccess,
      })
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(DomainPageActions.setResolverNewAddress(event.target.value))
  }

  return (
    <BModal isOpen={isOpen} onClose={onClose} modalsize="medium" title="Record">
      <StyledText>
        Please, provide your new Concordium resolver wallet address
      </StyledText>

      <Spacer vSpace={CssVariables.Space16} />

      <Spacer vSpace={CssVariables.Space8} />

      <Box display="flex" alignItems="center" mb={3}>
        <NormalInput onChange={handleChange} />
      </Box>

      {isLoadingSetAddressFee ? (
        <GridLoading />
      ) : (
        <>
          {setAddressFee ? (
            <Box>
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
                        Number(setAddressFee).toString(),
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
                        Number(setAddressFee).toString(),
                        4
                      )}
                    </Box>
                  </BText>
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </>
      )}

      <BButton
        onClick={setAddress}
        btn="secondary"
        label="Approve"
        mt={4}
        disabled={resolverNewAddress === ""}
        fullWidth
      />

      <Spacer vSpace={CssVariables.Space32} />
    </BModal>
  )
}
