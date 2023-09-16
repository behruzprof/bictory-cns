import styled from "styled-components/macro"
import { NavLink } from "react-router-dom"
import { AppPages } from "app/constants"
import { CssVariables } from "styles/global-styles"

const navItems = [
  { id: 1, url: AppPages, text: "Domains" },
  {
    id: 2,
    url: `${AppPages}`,
    text: "My Account",
  },
  { id: 3, url: `${AppPages}`, text: "Bookmarks" },
  {
    id: 4,
    url: `${AppPages}`,
    text: "Support/FAQs",
  },
]

export const Navbar = () => {
  return (
    <Nav>
      {navItems.map((item) => (
        <NavigationLink key={item.id} to={item.url} activeClassName="selected">
          {item.text}
        </NavigationLink>
      ))}
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  gap: 10px 32px;
  justify-content: center;
`

const NavigationLink = styled(NavLink)`
  color: ${CssVariables.Gray1};
  transition: 0.3s;

  &.selected {
    color: ${CssVariables.Primary};
  }

  &:hover {
    color: ${CssVariables.Primary};
  }
`
