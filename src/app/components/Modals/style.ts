import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"
import { BText } from "../common/BText"
import { ReactComponent as cryptoX } from "images/icons/cryptoxIcon.svg"
import { ReactComponent as arrowRight } from "images/icons/chevronRight.svg"

export const StyledText = styled(BText)`
  max-width: 325px;
  text-align: center;
  margin: 0 auto;
  color: ${CssVariables.Gray4};
`

export const HighlightedBox = styled.div`
  border: 2px solid ${CssVariables.Secondary};
  border-radius: 4px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const CryptoxIcon = styled(cryptoX)`
  width: 32px;
`

export const ArrowRight = styled(arrowRight)`
  width: 10px;
`

export const CustomLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 250px;
  margin: 0 auto;
  color: ${CssVariables.Primary};
`

export const Devider = styled.div`
  width: 100%;
  height: 1px;
  background: ${CssVariables.Gray3};
`

export const WalletAddress = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`
