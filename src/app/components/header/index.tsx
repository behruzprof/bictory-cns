import styled from "styled-components"
import { CssVariables } from "styles/global-styles"
import { Navbar } from "./components/Navbar"

export const Header = () => {
  return (
    <HeaderWrapper>
      <Navbar />
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.nav`
  padding: 18px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  margin-left: auto;
  background: ${CssVariables.Black1};
  border-bottom: 1px solid ${CssVariables.Main};
`
