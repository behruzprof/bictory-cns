import { Box } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { BModal } from "app/components/BModal"
import { SubTitle } from "app/components/Modals/TransactionModals/style"
import { BButton } from "app/components/BButton"
import { BText } from "app/components/common/BText"
import { ImageWrapper } from "./style"
import bannerImg from "images/sell.png"
import { DomainPageSelectors } from "app/containers/DomainPage/selectors"

export const SellModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(GlobalSelectors.isOpenSellAlert)
  const nftId = useSelector(DomainPageSelectors.nftId)
  const isLoadingNftId = useSelector(DomainPageSelectors.isLoadingNftId)

  const onClose = () => dispatch(globalActions.setIsOpenSellAlert(false))

  return (
    <BModal
      isOpen={isOpen}
      onClose={onClose}
      modalsize="medium"
      title="Visit Marketplace"
    >
      <ImageWrapper>
        <img src={bannerImg} />
      </ImageWrapper>
      <Box
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <BText fontWeight="900" mb={2}>
          Trade CNS Domains on BictoryNFT
        </BText>
        <SubTitle>
          Buying and Selling of CNS Domain names will happen on an NFT
          marketplace. Continue to BictoryNFT Marketplace?
        </SubTitle>
      </Box>
      <Box mt={6}>
        <a
          href={
            nftId
              ? `${process.env.REACT_APP_NFT_URL}nft/detail/${nftId}`
              : // eslint-disable-next-line
                "javascript:void(0)"
          }
          target={nftId ? "_blank" : ""}
          rel="noreferrer"
        >
          <BButton
            btnsize="medium"
            fullWidth
            btn="secondary"
            loadingLabel="Loading nft id"
            isLoading={!!isLoadingNftId}
            disabled={!nftId}
          >
            Yes, Continue
          </BButton>
        </a>
        <Box mt={3}>
          <BButton
            btnsize="medium"
            fullWidth
            btn="outlineDanger"
            onClick={onClose}
          >
            Cancel
          </BButton>
        </Box>
      </Box>
    </BModal>
  )
}
