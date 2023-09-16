import { Box } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { maxYear, minYear } from "../../constants"
import { DomainPageSelectors } from "../../selectors"
import { DomainPageActions } from "../../slice"
import { IconButton } from "../../style"
import { ReactComponent as PlusSquareIcon } from "images/icons/plus-square.svg"
import { ReactComponent as MinusSquareIcon } from "images/icons/minus-square.svg"

export const ExtendCounter = () => {
  const dispatch = useDispatch()

  const extendYear = useSelector(DomainPageSelectors.extendYear)
  const allowedYearToExtend = useSelector(
    DomainPageSelectors.allowedYearToExtend
  )

  const incrementYear = () => {
    dispatch(DomainPageActions.incrementExtendYear())
  }

  const decrementYear = () => {
    dispatch(DomainPageActions.decrementExtendYear())
  }

  return (
    <Box display="flex" alignItems="center">
      <Box ml={1}>
        <IconButton
          onClick={decrementYear}
          fill={
            extendYear === minYear ? CssVariables.Gray500 : CssVariables.Danger
          }
        >
          <MinusSquareIcon />
        </IconButton>
      </Box>
      <Box ml={1}>
        <IconButton
          onClick={incrementYear}
          fill={
            extendYear === allowedYearToExtend
              ? CssVariables.Gray500
              : CssVariables.Secondary
          }
        >
          <PlusSquareIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
