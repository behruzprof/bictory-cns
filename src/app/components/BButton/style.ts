import styled from "styled-components/macro"
import { Button } from "@material-ui/core"
import { CssVariables } from "styles/global-styles"
import { BButtonProps } from "./types"
import { color, flexbox, fontSize, layout, space, variant } from "styled-system"

export const StyledButton = styled(Button)<BButtonProps>`
  &.MuiButton-root {
    background: ${CssVariables.White};
    color: ${CssVariables.Black1};
    font-weight: 500;
    line-height: normal;
    text-transform: none;
    border-style: solid;

    padding: 7px 14px;
    font-size: 16px;
    border-radius: 8px;
    border-width: 3px;

    .loader {
      color: ${CssVariables.Black1};
      margin-right: 8px;
    }
    &:hover {
      background: ${CssVariables.Black1};
      color: ${CssVariables.White};
      .loader {
        color: ${CssVariables.White};
      }
    }
    &:active {
      outline: none;
    }
    &:disabled {
      background: ${CssVariables.Gray4};
      border-color: ${CssVariables.Gray3};
      color: ${CssVariables.Gray3};
      .loader {
        color: ${CssVariables.Gray3};
      }
    }

    ${variant({
      prop: "btnsize",
      variants: {
        small: {
          padding: "8px 16px",
          fontSize: "14px",
          borderRadius: "4px",
          borderWidth: "3px",
        },
        medium: {
          padding: ["10px 20px", "12px 25px", "15px 30px"],
          fontSize: ["14px", "15px", "16px"],
          borderRadius: "8px",
          borderWidth: ["2px", "2.5px", "3px"],
        },
      },
    })};

    ${variant({
      prop: "btn",
      variants: {
        primary: {
          background: CssVariables.Primary,
          color: CssVariables.Black1,
          borderColor: "transparent",
          ".loader": {
            color: CssVariables.Black1,
          },
          "&:hover": {
            background: CssVariables.DarkYellow,
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
          "&:active, &:focus": {
            background: CssVariables.LightYellow,
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: "transparent",
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
        },
        secondary: {
          background: CssVariables.Secondary,
          color: CssVariables.Black1,
          borderColor: "transparent",
          ".loader": {
            color: CssVariables.Black1,
          },
          "&:hover": {
            background: CssVariables.DarkGreen,
            borderColor: CssVariables.Secondary,
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
          "&:active, &:focus": {
            background: CssVariables.LightGreen,
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: "transparent",
            color: CssVariables.Gray3,
          },
        },
        outlineSecondary: {
          background: "transparent",
          color: CssVariables.Secondary,
          borderColor: CssVariables.Secondary,
          ".loader": {
            color: CssVariables.Black1,
          },
          "&:hover": {
            background: CssVariables.DarkGreen,
            borderColor: CssVariables.Secondary,
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
          "&:active, &:focus": {
            background: CssVariables.LightGreen,
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: "transparent",
            color: CssVariables.Gray3,
          },
        },
        outlinePrimary: {
          background: "transparent",
          color: CssVariables.Primary,
          borderColor: CssVariables.Primary,
          ".loader": {
            color: CssVariables.Black1,
          },
          "&:hover": {
            background: CssVariables.LightYellow,
            borderColor: CssVariables.Primary,
            color: CssVariables.Primary,
            ".loader": {
              color: CssVariables.Primary,
            },
          },
          "&:active, &:focus": {
            background: "transparent",
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: CssVariables.DarkYellow,
            color: CssVariables.DarkYellow,
            ".loader": {
              color: CssVariables.DarkYellow,
            },
          },
        },
        outlineDanger: {
          background: CssVariables.Black1,
          color: CssVariables.Danger,
          borderColor: CssVariables.Danger,
          ".loader": {
            color: CssVariables.Danger,
          },
          "&:hover": {
            background: CssVariables.Danger,
            borderColor: CssVariables.Danger,
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
          "&:active, &:focus": {
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: "transparent",
          },
        },
        danger: {
          background: CssVariables.Danger,
          color: CssVariables.Black1,
          borderColor: "transparent",
          ".loader": {
            color: CssVariables.Black1,
          },
          "&:hover": {
            background: CssVariables.Black1,
            borderColor: CssVariables.Danger,
            color: CssVariables.Danger,
            ".loader": {
              color: CssVariables.Danger,
            },
          },
          "&:active, &:focus": {
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: "transparent",
          },
        },
        roundedOutlineGray: {
          background: "transparent",
          color: CssVariables.Gray500,
          border: `1px solid ${CssVariables.Gray500}`,
          borderRadius: "40px",
          ".loader": {
            color: CssVariables.Gray500,
          },
          "&:hover": {
            borderColor: CssVariables.Gray4,
            color: CssVariables.Gray4,
            ".loader": {
              color: CssVariables.Gray4,
            },
          },
          "&:active, &:focus": {
            background: "transparent",
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: CssVariables.Gray5,
            color: CssVariables.Gray5,
            ".loader": {
              color: CssVariables.Gray5,
            },
          },
        },
        roundedSecondary: {
          background: CssVariables.Secondary,
          color: CssVariables.Black1,
          border: `1px solid ${CssVariables.Black1}`,
          borderRadius: "40px",
          ".loader": {
            color: CssVariables.Black1,
          },
          "&:hover": {
            background: CssVariables.DarkGreen,
            borderColor: CssVariables.Black1,
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
          "&:active, &:focus": {
            background: CssVariables.LightGreen,
            outlineStyle: "solid",
            outlineColor: CssVariables.Black1,
            borderColor: CssVariables.Gray5,
            color: CssVariables.Black1,
            ".loader": {
              color: CssVariables.Black1,
            },
          },
        },
      },
    })};

    ${fontSize}
    ${color}
    ${space}
    ${layout}
    ${flexbox}
  }
`
