import styled from "styled-components"
import { CssVariables } from "styles/global-styles"

export const Divider = styled.hr<{ color?: string }>`
  margin: 1rem 0;
  border-color: ${({ color }) => (color ? color : `${CssVariables.Black3}`)};
`
