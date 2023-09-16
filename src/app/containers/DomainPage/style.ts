import { Box, ButtonBase } from "@material-ui/core"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

export const ButtonGroups = styled(Box)`
  margin-bottom: 63px;
  button {
    margin-right: 16px;
  }
`

export const Wrapper = styled.div`
  color: ${CssVariables.Gray500};
`

export const IconButton = styled(ButtonBase)<{
  fill?: string
  stroke?: string
}>`
  &.MuiButtonBase-root {
    width: 24px;
    height: 24px;
    padding: 1px;
    border-radius: 6px;
    ${({ fill, stroke }) => (fill || stroke ? `color: ${fill || stroke}` : "")};
    svg {
      width: 24px;
      height: 24px;
      ${({ fill }) => (fill ? `fill: ${fill}` : "")};
      ${({ stroke }) => (stroke ? `stroke: ${stroke}` : "")};
    }
    &:disabled {
      svg {
        fill: ${CssVariables.Gray3};
      }
    }
  }
`

export const IconBox = styled(Box)<{ fill?: string; stroke?: string }>`
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  svg {
    ${({ fill }) => (fill ? `fill: ${fill}` : "")};
    ${({ stroke }) => (stroke ? `stroke: ${stroke}` : "")};
  }
`
