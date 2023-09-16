/**
 *
 * HomePage
 *
 */

import { Spacer } from "app/components/common/Spacer"
import { useSelector } from "react-redux"
import styled from "styled-components/macro"
import { CssVariables } from "styles/global-styles"
import { media } from "styles/media"
import { Filter } from "./components/Filter"
import { Head } from "./components/Head"
import { Pagination } from "./components/Pagination"
import { TotalDomain } from "./components/TotalDomain"
import { HomePageSelectors } from "./selectors"
import { useHomePageSlice } from "./slice"

export const HomePage = () => {
  useHomePageSlice()
  const searchedValue = useSelector(HomePageSelectors.searchValue)

  return (
    <>
      <Head />
      <Spacer vSpace={CssVariables.Space56} />
      {!searchedValue && (
        <Wrapper>
          <TotalDomain />

          <Filter />
        </Wrapper>
      )}
      <Spacer vSpace={CssVariables.Space32} />
      <Pagination />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  ${media.sm`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
`
