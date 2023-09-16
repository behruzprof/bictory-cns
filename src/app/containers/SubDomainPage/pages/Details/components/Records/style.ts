import { Box } from "@material-ui/core"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"
import { media } from "styles/media"

export const RecordBox = styled(Box)`
  border: 2px solid ${CssVariables.Main};
  padding: 40px;
  display: flex;
  flex-direction: column;
  word-break: break-word;
  ${media.md`
    padding: 20px;
  `}

  ${media.sm`
    padding: 15px;
  `}
`
