import React, { FC } from "react"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

interface Props {
  checked: boolean
  onClick: (val) => void
}

export const BCheckbox: FC<Props> = ({ checked, ...others }) => {
  return (
    <CheckboxContainer checked={checked} {...others}>
      <HiddenCheckbox value={checked} />
      <IconBox checked={checked} />
    </CheckboxContainer>
  )
}

interface CheckboxProps {
  checked: boolean
}

export const CheckboxContainer = styled.div<CheckboxProps>`
  width: 51px;
  height: 26px;
  position: relative;
  background: ${({ checked }) =>
    checked ? CssVariables.Secondary : CssVariables.Gray3};
  display: flex;
  align-items: center;
  border-radius: 13px;
  padding: 1px 0;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;
`

export const IconBox = styled.div<CheckboxProps>`
  background: ${({ checked }) =>
    checked ? CssVariables.White : CssVariables.Gray5};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  position: absolute;
  transition: all 0.3s ease-in-out;
  left: ${({ checked }) => (checked ? "calc(100% - 23px)" : "1px")};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })<any>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
`
