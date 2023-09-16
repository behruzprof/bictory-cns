import { StatusType } from "app/types"
import { CssVariables } from "styles/global-styles"
import styled from "styled-components/macro"

export const Status = styled.span<{ status: StatusType }>`
  color: ${({ status }) => getStatusColor(status)};
`
export const getStatusColor = (status: StatusType) => {
  switch (status.toLowerCase()) {
    case "available":
      return CssVariables.Secondary
    case "registered":
      return CssVariables.Gray3
    case "on_auction":
      return CssVariables.Secondary
    case "reserved":
      return CssVariables.Primary
    default:
      return CssVariables.Gray3
  }
}
