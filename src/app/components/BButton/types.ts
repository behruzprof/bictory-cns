import {
  ColorProps,
  FlexboxProps,
  FontSizeProps,
  LayoutProps,
  SpaceProps,
} from "styled-system"

export interface BButtonProps
  extends ColorProps,
    SpaceProps,
    FlexboxProps,
    LayoutProps,
    FontSizeProps {
  btnsize?: btnSize
  label?: string
  className?: string
  btn?: btnType
  loadingLabel?: string
  isLoading?: boolean
}

type btnType =
  | "primary"
  | "outlinePrimary"
  | "secondary"
  | "outlineSecondary"
  | "danger"
  | "outlineDanger"
  | "roundedOutlineGray"
  | "roundedSecondary"

type btnSize = "small" | "medium" | "large"
