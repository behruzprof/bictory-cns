import { FC } from "react"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

export const RedirectToCcdScan: FC<{ address: string }> = ({
  address,
  children,
}) => {
  const url = `${process.env.REACT_APP_CCD_SCAN_URL}${address}`

  return (
    <StyledLink onClick={() => window.open(url, "_blank")}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.div`
  cursor: pointer;
  transition: 300ms;
  &:hover {
    color: ${CssVariables.Secondary};
  }
`
