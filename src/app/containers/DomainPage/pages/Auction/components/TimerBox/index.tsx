import { BText } from "app/components/common/BText"
import { FC } from "react"
import { Time, TitleBox, Wrapper } from "./style"

interface Props {
  time: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
  isEndAuction: boolean
}

export const TimerBox: FC<Props> = ({ time, isEndAuction }) => {
  return (
    <Wrapper isEndAuction={isEndAuction}>
      <TitleBox>
        <BText size="s" weight="reg">
          {isEndAuction ? "Auction ended" : "Auction ends in"}
        </BText>
      </TitleBox>
      <Time>
        {time.days}
        <BText size="xs" weight="reg">
          Days
        </BText>
      </Time>
      <Time>:</Time>
      <Time>
        {time.hours}
        <BText size="xs" weight="reg">
          Hours
        </BText>
      </Time>
      <Time>:</Time>
      <Time>
        {time.minutes}
        <BText size="xs" weight="reg">
          Minutes
        </BText>
      </Time>
      <Time>:</Time>
      <Time>
        {time.seconds}
        <BText size="xs" weight="reg">
          Seconds
        </BText>
      </Time>
    </Wrapper>
  )
}
