import { Box } from "@material-ui/core"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"
import { media } from "styles/media"

export const FooterBox = styled.footer`
  display: flex;
  width: 100%;
  padding: 48px 0 52px 0;
  background: ${CssVariables.Black1};
  font-family: "DM Sans", sans-serif;
  color: ${CssVariables.Gray500};
  position: relative;
  z-index: 9;
  border-top: 1px solid ${CssVariables.Main};
`

export const JoinTitle = styled.div`
  font-size: 20px;
  color: ${CssVariables.White};
  margin-bottom: 8px;
  font-weight: 500;
`

export const SubTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
`

export const FooterWrapper = styled.div`
  border-top: 1px solid ${CssVariables.Main};
  padding-top: 30px;
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${CssVariables.White};
  margin-bottom: 20px;
`

export const Description = styled.div`
  color: ${CssVariables.White};
  a {
    text-decoration: none;
  }
`

export const FooterItem = styled(Box)`
  max-width: 300px;
  min-width: 200px;
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  ${media.md`
    min-width: auto;
    margin-bottom: 20px;
  `}
`

export const ItemTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
`

export const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  margin-bottom: 12px;
  a {
    color: ${CssVariables.Gray500};
    font-weight: 500;
    &:hover {
      color: ${CssVariables.Secondary};
    }
  }
`

export const Socials = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  p {
    color: #bdbdbd;
    font-family: "Inter", sans-serif;
  }
  a {
    width: 32px;
    height: 32px;
    transition: all 0.3s ease;
    margin-left: 13px;
    svg {
      circle {
        fill: ${CssVariables.Gray500};
      }
      path {
        fill: ${CssVariables.Black1};
      }
    }
    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.2);
      svg {
        circle {
          fill: ${CssVariables.Secondary};
        }
      }
    }
  }
`
