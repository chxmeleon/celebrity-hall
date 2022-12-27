import React from "react";
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
  SimpleCardPoint,
} from "./Utilities";

export const RankingCard3: React.FC = () => {
  return (
    <div className="relative rounded-[15px] sm:w-[320px] w-[121px] sm:h-[301px] h-[146px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-300 to-rankingBorder-301">
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
};

export const RankingCard2: React.FC = () => {
  return (
    <div className="relative rounded-[15px] sm:w-[320px] w-[121px] sm:h-[329px] h-[156px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-200 to-rankingBorder-201">
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
};

export const RankingCard1: React.FC = () => {
  return (
    <div className="relative rounded-[15px] sm:w-[320px] w-[121px] sm:h-[375px] h-[170px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-100 to-rankingBorder-101">
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
};

export const RankingCardOther: React.FC<{ rank: number }> = ({ rank }) => {
  return (
    <div className="sm:w-[468px] sm:h-[215px] w-[382px] h-[64px] flex bg-[#262626] text-white sm:rounded-[20px] rounded-[5px] items-center justify-center mb-[6px] mx-[4px]">
      <div className="sm:w-[370px] w-[340px] flex justify-between items-center">
        <div className="sm:text-[24px] text-[10px]">{rank}</div>
        <Avatar />
        <div className="flex sm:items-start items-center justify-between w-[220px] sm:flex-col sm:w-fit">
          <Name name="Angela" />
          <div>
            <BodyShape height={162} weight={46} />
            <Timetable start="18:00" end="16:00" />
          </div>
          <Heart like={189} />
        </div>
      </div>
    </div>
  );
};

export const SimpleRankingCard3: React.FC = () => {
  return (
    <div className="relative rounded-[15px] sm:w-[320px] w-[121px] sm:h-[301px] h-[146px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-300 to-rankingBorder-301">
      <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
        <SimpleCardRank rank="3rd" />
        <div className="m-auto flex flex-col items-center">
          <div className="m-auto flex sm:mt-[115px] mt-[50px] items-center">
            <SimpleCardAvatar />
            <SimpleCardName name="Angela" />
          </div>
          <SimpleCardPoint point={4567} rank="3rd" />
        </div>
      </div>
    </div>
  );
};

export const SimpleRankingCard2: React.FC = () => {
  return (
    <div className="relative rounded-[15px] sm:w-[320px] w-[121px] sm:h-[329px] h-[156px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-200 to-rankingBorder-201">
      <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
        <SimpleCardRank rank="2nd" />
        <div className="m-auto flex flex-col items-center">
          <div className="m-auto flex sm:mt-[130px] mt-[55px] items-center">
            <SimpleCardAvatar />
            <SimpleCardName name="Angela" />
          </div>
          <SimpleCardPoint point={4567} rank="2nd" />
        </div>
      </div>
    </div>
  );
};

export const SimpleRankingCard1: React.FC = () => {
  return (
    <div className="relative rounded-[15px] sm:w-[320px] w-[121px] sm:h-[375px] h-[170px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-100 to-rankingBorder-101">
      <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
        <SimpleCardRank rank="1st" />
        <div className="m-auto flex flex-col items-center">
          <div className="m-auto flex sm:mt-[180px] mt-[70px] items-center">
            <SimpleCardAvatar />
            <SimpleCardName name="Angela" />
          </div>
          <SimpleCardPoint point={4567} rank="1st" />
        </div>
      </div>
    </div>
  );
};
