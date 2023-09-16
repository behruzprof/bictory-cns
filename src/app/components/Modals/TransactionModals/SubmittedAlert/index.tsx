import { Box } from "@material-ui/core"
import { GlobalSelectors } from "app/selectors"
import { globalActions } from "app/slice"
import { useDispatch, useSelector } from "react-redux"
import { BModal } from "../../../BModal"
import { ModalAlert } from "app/components/BModal/ModalAlert"
import { SubTitle } from "../style"
import { BButton } from "app/components/BButton"
import { RedirectToCcdTx } from "app/components/common/RedirectToCcdTx"

export const SubmittedAlert = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(GlobalSelectors.isOpenSubmittedAlert)
  const txHash = useSelector(GlobalSelectors.txHash)

  const onClose = () =>
    dispatch(globalActions.setIsOpenSubmittedAlert({ open: false }))

  return (
    <BModal isOpen={isOpen} onClose={onClose} modalsize="medium" title="Alert">
      <ModalAlert mode="success" title="Transaction Submitted">
        <SubTitle>
          This transaction was successfully submitted on the blockchain.{" "}
          {txHash && (
            <RedirectToCcdTx address={txHash}>
              See transaction on explorer
            </RedirectToCcdTx>
          )}
        </SubTitle>
      </ModalAlert>
      <Box mt={6}>
        <BButton
          btnsize="medium"
          fullWidth
          btn="outlineSecondary"
          onClick={onClose}
        >
          Close
        </BButton>
      </Box>
    </BModal>
  )
}
