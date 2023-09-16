import styled from "styled-components"
import { ReactComponent as bookmark } from "images/icons/bookmark.svg"
import { CssVariables } from "styles/global-styles"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { globalActions } from "app/slice"
import { GlobalSelectors } from "app/selectors"

interface Props {
  favorite: boolean | undefined
  domainName: string
}

export const BookMark: FC<Props> = ({ favorite, domainName }) => {
  const dispatch = useDispatch()
  const [fav, setFav] = useState<boolean | undefined>(favorite)
  const loggedIn = useSelector(GlobalSelectors.loggedIn)

  const handleTap = () => {
    if (loggedIn) {
      dispatch(globalActions.likeDomain({ domainName, favorited: fav }))
      setFav((prev) => !prev)
    } else {
      dispatch(globalActions.setIsOpenConnectWalletInfo({ open: true }))
    }
  }

  return <BookMarkIcon onClick={handleTap} active={fav} />
}

export const BookMarkIcon = styled(bookmark)<{ active?: boolean }>`
  width: 18px;
  height: 18px;
  cursor: pointer;
  path {
    stroke: ${({ active }) =>
      active ? `${CssVariables.White}` : `${CssVariables.Gray500}`};
    fill: ${({ active }) => (active ? `${CssVariables.White}` : `transparent`)};
  }
`
