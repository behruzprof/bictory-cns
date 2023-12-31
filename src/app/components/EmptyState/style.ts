import styled from "styled-components/macro"
import { ReactComponent as emptyState } from "images/icons/empty-state.svg"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 230px;
`

export const EmptyStateIcon = styled(emptyState)`
  width: 150px;
  height: 150px;
  margin-bottom: 13px;
`
