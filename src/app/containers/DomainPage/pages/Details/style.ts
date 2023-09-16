import { Tooltip, withStyles } from "@material-ui/core"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

export const StyledTooltip = withStyles(() => ({
  tooltip: {
    padding: "17px 16px",
    background: CssVariables.Black3,
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
  },
  arrow: {
    color: CssVariables.Black3,
  },
}))(Tooltip)
