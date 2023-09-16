import { Tooltip, TooltipProps, withStyles } from "@material-ui/core"
import { FC } from "react"
import { CssVariables } from "styles/global-styles"

export const BToolTip: FC<TooltipProps> = ({ children, ...props }) => {
  return (
    <BToolTipStyled {...props} arrow>
      {children}
    </BToolTipStyled>
  )
}

const BToolTipStyled = withStyles(() => ({
  tooltip: {
    padding: CssVariables.Space16,
    background: CssVariables.Info,
    fontSize: "14px",
  },
  arrow: {
    color: CssVariables.Info,
  },
}))(Tooltip)
