import { Box } from "@material-ui/core"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { Spacer } from "app/components/common/Spacer"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/global-styles"
import { HomePageSelectors } from "../selectors"

export const TotalDomain = () => {
  const totalCount = useSelector(HomePageSelectors.total)
  const filterStatus = useSelector(HomePageSelectors.filterValue)

  if (!filterStatus) {
    return <Spacer vSpace={CssVariables.Space32} />
  }

  return (
    <Box>
      <BTitle size="h5" weight="med">
        {filterStatus} ({totalCount})
      </BTitle>
      <Spacer vSpace={CssVariables.Space16} />
      <BText size="m" color={CssVariables.Gray500}>
        See ongoing auctions for domains.
      </BText>
    </Box>
  )
}
