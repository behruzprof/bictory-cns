import { FC } from "react"
import Jdenticon from "react-jdenticon"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"

interface Props {
  name?: string
}

export const Avatar: FC<Props> = ({ name = "", ...props }) => {
  return (
    <Wrapper {...props}>
      <Jdenticon value={name} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${CssVariables.White};
  width: max-content;
  border: 3px solid ${CssVariables.Secondary};
  border-radius: 6px;
`
