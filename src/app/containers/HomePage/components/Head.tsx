import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { NormalInput } from "app/components/Inputs"
import { PageableParams } from "app/constants"
import { useQuery } from "hooks/queryHook"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { CssVariables } from "styles/global-styles"
import { media } from "styles/media"
import { HomePageSelectors } from "../selectors"
import { HomePageActions } from "../slice"

export const Head = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const query = useQuery()

  const searchText = useSelector(HomePageSelectors.searchText)
  const errorValue = useSelector(HomePageSelectors.errorValue)
  const helperText = useSelector(HomePageSelectors.helperText)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const domainName = event.target.value
    dispatch(HomePageActions.setSearchValue(domainName))
    history.push({
      search: `?page=${PageableParams.page}`,
    })
  }

  useEffect(() => {
    const searchedDomain = query.get("name")
    if (searchedDomain) dispatch(HomePageActions.setSearchValue(searchedDomain))
  }, [])

  return (
    <StyledHead>
      <BTitle size="h3" weight="med">
        Find Your Domain Name
      </BTitle>
      <StyledInput
        placeholder="Search Domain name"
        value={searchText}
        onInput={handleChange}
        error={errorValue}
        InputProps={{
          endAdornment: <CcdBox>.CCD</CcdBox>,
        }}
      />
      {errorValue && <BText color={CssVariables.Error}>{helperText}</BText>}
    </StyledHead>
  )
}

const StyledHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 650px;
  margin: auto;
  gap: 24px;
`

export const CcdBox = styled.div`
  background: ${CssVariables.Black3};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 34px;
  font-size: 18px;
  font-weight: 700;
  height: calc(54px - 14px);
  color: ${CssVariables.White};
  margin-right: 7px;
  cursor: default;
  transform: scale(0);
  opacity: 0;
  transition: all 0.3s;
`

const StyledInput = styled(NormalInput)`
  max-width: 643px;
  .MuiInputBase-root {
    border-radius: 12px;
    padding: 0;
    .MuiInputBase-input {
      padding: 0 10px 0 30px;
      height: 54px;
      font-size: 18px;
      font-weight: 400;
    }
    &.Mui-focused {
      border-color: ${CssVariables.Secondary};
      ${CcdBox} {
        transform: scale(1);
        opacity: 1;
        transition: all 0.3s;
      }
    }
  }

  ${media.lg`
    max-width: 440px;
  `}
  ${media.md`
    max-width: 340px;
  `}
`
