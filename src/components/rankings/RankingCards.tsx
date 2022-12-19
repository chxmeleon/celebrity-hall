import React from "react";
import { Name, BodyShape, Timetable, Heart, Avatar, Rank } from "./Utilities";

export function RankingCard3(): JSX.Element {
  return (
    <div className="relative rounded-[15px] w-[320px] h-[301px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-300 to-rankingBorder-301">
      <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
        <Rank rank="3rd" />
        <div className="m-auto flex flex-col items-center">
          <Avatar />
          <Name name="方方" />
          <BodyShape height={162} weight={52} />
          <Timetable start="16:00" end="00:00" />
          <Heart like={100} />
        </div>
      </div>
    </div>
  );
}

export function RankingCard2(): JSX.Element {
  return (
    <div className="relative rounded-[15px] w-[320px] h-[329px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-200 to-rankingBorder-201">
      <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
        <Rank rank="2nd" />
        <div className="m-auto flex flex-col items-center">
          <Avatar />
          <Name name="方方" />
          <BodyShape height={162} weight={52} />
          <Timetable start="16:00" end="00:00" />
          <Heart like={100} />
        </div>
      </div>
    </div>
  );
}

export function RankingCard1(): JSX.Element {
  return (
    <div className="relative rounded-[15px] w-[320px] h-[375px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-100 to-rankingBorder-101">
      <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
        <Rank rank="1st" />
        <div className="m-auto flex flex-col items-center">
          <Avatar rank="1st" />
          <Name name="Angela" />
          <BodyShape height={162} weight={46} />
          <Timetable start="18:00" end="16:00" />
          <Heart like={189} />
        </div>
      </div>
    </div>
  );
}

export function RankingCardOther({ rank }: { rank: number }): JSX.Element {
  return (
    <div className="w-[468px] h-[215px] flex h-full bg-[#262626] text-white rounded-[20px] items-center justify-center">
      <div className="w-[370px] flex justify-between items-center">
        <div className="text-[24px]">{rank}</div>
        <Avatar />
        <div>
          <Name name="Angela" />
          <BodyShape height={162} weight={46} />
          <Timetable start="18:00" end="16:00" />
          <Heart like={189} />
        </div>
      </div>
    </div>
  );
}
