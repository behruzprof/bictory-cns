import { BText } from "app/components/common/BText"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

export const SubTitle = styled(BText)`
  font-size: 14px;
  margin-top: 2px;
  color: ${CssVariables.Gray3};
  text-align: center;
  max-width: 350px;
  a {
    color: ${CssVariables.Primary};
    text-decoration: underline;
  }
`
