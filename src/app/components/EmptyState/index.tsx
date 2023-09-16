import { Box } from "@material-ui/core"
import { FC } from "react"
import { CssVariables } from "styles/global-styles"
import { BText } from "../common/BText"
import { EmptyStateIcon, Wrapper } from "./style"

interface Props {
  title?: string
}

export const EmptyState: FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <EmptyStateIcon />
      {title && (
        <Box mb={1} textAlign="center">
          <BText size="m" weight="med" color={`${CssVariables.White}`}>
            {title}
          </BText>
        </Box>
      )}
      {children}
    </Wrapper>
  )
}
