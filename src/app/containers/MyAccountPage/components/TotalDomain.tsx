import { Box } from "@material-ui/core"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { Spacer } from "app/components/common/Spacer"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { MyAccountSelectors } from "../selectors"

export const TotalDomain = () => {
  const totalCount = useSelector(MyAccountSelectors.total)
  const filterStatus = useSelector(MyAccountSelectors.filterValue)

  if (!filterStatus) {
    return <Spacer vSpace={CssVariables.Space32} />
  }

  return (
    <Box>
      <BTitle size="h5" weight="med">
        {filterStatus} ({totalCount})
      </BTitle>
      <Spacer vSpace={CssVariables.Space16} />
      <BText size="m" color={CssVariables.Gray1}>
        See all domain names in your wallet
      </BText>
    </Box>
  )
}
