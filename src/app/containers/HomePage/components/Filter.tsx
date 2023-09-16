import { BAutoComplete } from "app/components/BAutoComplete"
import { DomainsOptionsType } from "../types"
import { useQuery } from "hooks/queryHook"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { HomePageSelectors } from "../selectors"
import { HomePageActions } from "../slice"

export const FilterOptions: DomainsOptionsType[] = [
  "Ongoing auctions",
  "Ending soon auctions",
  "New auctions",
]

export const Filter = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const query = useQuery()

  const filterStatus = useSelector(HomePageSelectors.filterValue)

  const onChange = (value) => {
    dispatch(HomePageActions.setFilterValue(value))
    history.push({
      search: `&filterStatus=${value}`,
    })
  }

  useEffect(() => {
    const filterStatus = FilterOptions.find(
      (option) => option === query.get("filterStatus")
    )
    if (filterStatus) dispatch(HomePageActions.setFilterValue(filterStatus))
  }, [])

  return (
    <BAutoComplete
      options={FilterOptions}
      value={filterStatus}
      onChange={onChange}
    />
  )
}
