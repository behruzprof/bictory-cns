import styled from "styled-components/macro"
import { media } from "styles/media"

export const FlexSpacer = styled.div`
  flex: 1;

  ${media.sm`
    display: none;
  `}
`
