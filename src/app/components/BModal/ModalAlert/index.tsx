import { FC } from "react"
import { ReactComponent as VerifyIcon } from "images/icons/verify.svg"
import { ReactComponent as WarningIcon } from "images/icons/warning.svg"
import { Wrapper, IconBox, Title, Body } from "./style"
import { ModalAlertProps, Mode } from "../types"

export const ModalAlert: FC<ModalAlertProps> = ({ mode, title, children }) => {
  return (
    <Wrapper>
      <IconBox mode={mode}>
        <Icon mode={mode} />
      </IconBox>
      <Title>{title ? title : ""}</Title>
      <Body>{children}</Body>
    </Wrapper>
  )
}

const Icon: FC<{ mode: Mode }> = ({ mode }) => {
  switch (mode) {
    case "success":
      return <VerifyIcon />
    case "warning":
      return <WarningIcon />
    case "info":
      return <WarningIcon />
    case "error":
      return <WarningIcon />
    default:
      return <></>
  }
}
