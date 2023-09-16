import { FC } from "react"
import styled from "styled-components/macro"

export const RedirectToCcdTx: FC<{ address: string }> = ({
  address,
  children,
}) => {
  const url = `${process.env.REACT_APP_CCD_TX_URL}${address}`

  return (
    <StyledLink href={url} target="_blank">
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.a`
  cursor: pointer;
`
