import { FC } from "react"
import { BButtonProps } from "./types"
import { StyledButton } from "./style"
import { Box, ButtonProps, CircularProgress } from "@material-ui/core"

/**
 * Global Bictory Button component
 *
 * @author Shaha <shaha@bictory.io>
 * @version 1.0.0
 *
 * For props type used {@link BButtonProps}
 *
 * @param {'small' | 'medium'} btnsize
 *
 * @param {
 *  'primary' |
 *  'outlinePrimary' |
 *  'secondary' |
 *  'outlineSecondary' |
 *  'danger' |
 *  'outlineDanger' |
 *  'roundedOutlineGray' |
 *  'roundedSecondary'
 * } btn
 *
 * @param {boolean} isLoading - for show loading
 *
 * @param {string} label - button inner text
 *
 * @param {string} loadingLabel - on loading text
 */

export const BButton: FC<ButtonProps & BButtonProps> = ({
  btnsize,
  className,
  children,
  label,
  btn,
  loadingLabel,
  isLoading,
  ...otherProps
}) => (
  <StyledButton
    btnsize={btnsize}
    className={className}
    btn={btn}
    {...otherProps}
  >
    {isLoading ? (
      <Box display="flex" alignItems="center">
        <CircularProgress size={12} className="loader" /> {loadingLabel}
      </Box>
    ) : (
      children || label
    )}
  </StyledButton>
)
