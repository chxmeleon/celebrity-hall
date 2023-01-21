import React from 'react'
import {
  Name,
  BodyShape,
  Timetable,
  Heart,
  Avatar,
  Rank,
  SimpleCardRank,
  SimpleCardAvatar,
  SimpleCardName,
  SimpleCardPoint
} from './Utilities'

export const RankingCard3: React.FC<{
  likesCount: number
  username: string
  avatarUrl: string | null
}> = ({ likesCount, username, avatarUrl }) => {
  return (
    <div className="relative mx-auto bg-gradient-to-br p-[2px] rounded-[15px] from-rankingBorder-300 to-rankingBorder-301">
      <div className="flex flex-col justify-between py-2 h-full text-white bg-gradient-to-tl md:py-5 md:px-3 from-rankingbg-100 via-rankingbg-200 to-rankingbg-300 rounded-[15px]">
        <Rank rank="3rd" />
        <div className="flex flex-col items-center m-auto">
          <Avatar img={avatarUrl} />
          <Name name={username} />
          {/* <BodyShape height={162} weight={52} />
          <Timetable start="16:00" end="00:00" /> */}
          <Heart like={likesCount} />
        </div>
      </div>
    </div>
  )
}

export const RankingCard2: React.FC<{
  likesCount: number
  username: string
  avatarUrl: string | null
}> = ({ likesCount, username, avatarUrl }) => {
  return (
    <div className="relative mx-auto bg-gradient-to-br p-[2px] rounded-[15px] from-rankingBorder-200 to-rankingBorder-201">
      <div className="flex flex-col justify-between py-4 h-full text-white bg-gradient-to-tl md:py-9 md:px-3 from-rankingbg-100 via-rankingbg-200 to-rankingbg-300 rounded-[15px]">
        <Rank rank="2nd" />
        <div className="flex flex-col items-center m-auto">
          <Avatar img={avatarUrl} />
          <Name name={username} />
          {/* <BodyShape height={162} weight={52} />
          <Timetable start="16:00" end="00:00" /> */}
          <Heart like={likesCount} />
        </div>
      </div>
    </div>
  )
}

export const RankingCard1: React.FC<{
  likesCount: number
  username: string
  avatarUrl: string | null
}> = ({ likesCount, username, avatarUrl }) => {
  return (
    <div className="relative mx-auto w-full h-full bg-gradient-to-br p-[2px] rounded-[15px] from-rankingBorder-100 to-rankingBorder-101">
      <div className="flex flex-col justify-between py-3 h-full text-white bg-gradient-to-tl md:py-9 md:px-3 from-rankingbg-100 via-rankingbg-200 to-rankingbg-300 rounded-[15px]">
        <Rank rank="1st" />
        <div className="flex flex-col items-center m-auto">
          <Avatar rank="1st" img={avatarUrl} />
          <Name name={username} />
          {/* <BodyShape height={162} weight={46} />
          <Timetable start="18:00" end="16:00" /> */}
          <Heart like={likesCount} />
        </div>
      </div>
    </div>
  )
}
export const RankingCardOther: React.FC<{
  rank: number
  likesCount: number
  username: string
  avatarUrl: string | null
}> = ({ likesCount, username, avatarUrl, rank }) => {
  return (
    <div className="flex bg-[#262626] text-white h-16 mb-3 md:h-48 sm:rounded-[20px] rounded-[5px] items-center justify-center">
      <div className="flex justify-between items-center w-4/5">
        <div className="text-[10px] sm:text-[24px]">{rank}</div>
        <Avatar img={avatarUrl} />
        <div className="flex justify-between items-center w-9/12 sm:flex-col sm:items-start sm:w-fit">

          <Name name={username} />
          {/* <div>
            <BodyShape height={162} weight={46} />
            <Timetable start="18:00" end="16:00" />
          </div> */}
          <Heart like={likesCount} />
        </div>
      </div>
    </div>
  )
}

export const SimpleRankingCard3: React.FC<{
  point: number
  username: string
  avatarUrl: string | null
}> = ({ point, username, avatarUrl }) => {
  return (
    <div className="relative bg-gradient-to-br rounded-[15px] p-[2px] from-rankingBorder-300 to-rankingBorder-301">
      <div className="flex flex-col justify-between py-2 h-full text-white bg-gradient-to-tl md:py-5 md:px-3 from-rankingbg-100 via-rankingbg-200 to-rankingbg-300 rounded-[15px]">
        <div className="w-full flex flex-col items-center m-auto">
          <SimpleCardRank rank="3rd" />
          <div className="w-full flex justify-center items-center  mt-[50px] sm:mt-[115px]">
            <SimpleCardAvatar img={avatarUrl} />
            <SimpleCardName name={username} />
          </div>
          <SimpleCardPoint point={point} rank="3rd" />
        </div>
      </div>
    </div>
  )
}

export const SimpleRankingCard2: React.FC<{
  point: number
  username: string
  avatarUrl: string | null
}> = ({ point, username, avatarUrl }) => {
  return (
    <div className="relative bg-gradient-to-br rounded-[15px] p-[2px] from-rankingBorder-200 to-rankingBorder-201">
      <div className="flex relative flex-col justify-between py-4 h-full text-white bg-gradient-to-tl md:py-9 md:px-3 from-rankingbg-100 via-rankingbg-200 to-rankingbg-300 rounded-[15px]">
        <div className="w-full flex flex-col items-center m-auto">
          <SimpleCardRank rank="2nd" />
          <div className="w-full flex justify-center items-center  mt-[55px] sm:mt-[130px]">
            <SimpleCardAvatar img={avatarUrl} />
            <SimpleCardName name={username} />
          </div>
          <SimpleCardPoint point={point} rank="2nd" />
        </div>
      </div>
    </div>
  )
}

export const SimpleRankingCard1: React.FC<{
  point: number
  username: string
  avatarUrl: string | null
}> = ({ point, username, avatarUrl }) => {
  return (
    <div className="relative bg-gradient-to-br rounded-[15px] p-[2px] from-rankingBorder-100 to-rankingBorder-101">
      <div className="flex flex-col justify-between py-3 h-full text-white bg-gradient-to-tl md:py-9 md:px-3 from-rankingbg-100 via-rankingbg-200 to-rankingbg-300 rounded-[15px]">
        <div className="w-full flex flex-col items-center m-auto">
          <SimpleCardRank rank="1st" />
          <div className="w-full flex justify-center items-center  mt-[70px] sm:mt-[180px]">
            <SimpleCardAvatar img={avatarUrl} />
            <SimpleCardName name={username} />
          </div>
          <SimpleCardPoint point={point} rank="1st" />
        </div>
      </div>
    </div>
  )
}
