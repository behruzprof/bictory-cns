import { TextField } from "@material-ui/core"
import styled, { css } from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

export const StyledInput = styled(TextField)<{ error?: boolean | undefined }>`
  border-radius: 4px;
  color: ${CssVariables.White};
  width: 100%;
  .MuiInputBase-input {
    height: 38px;
    padding: 0 12px 0 24px;
    font-size: 14px;
    font-weight: 400;
    color: ${CssVariables.White};
    &::placeholder {
      color: ${CssVariables.Gray5};
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .MuiInputBase-root {
    background: ${CssVariables.Black1};
    border: 1px solid ${CssVariables.Gray500};
    border-radius: 4px;
    &.MuiInput-underline:before,
    &.MuiInput-underline:after {
      display: none;
    }
    ${({ error = false }) =>
      error &&
      css`
        border-color: ${CssVariables.Error};
      `}
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: ${CssVariables.Black1};
  }

  .MuiOutlinedInput-root {
    &.Mui-error .MuiOutlinedInput-notchedOutline {
      border-color: ${CssVariables.Error};
    }
  }

  .MuiFormHelperText-root.Mui-error {
    color: ${CssVariables.Error};
  }

  .MuiInputBase-adornedEnd {
    color: ${CssVariables.Gray500};
  }
`
