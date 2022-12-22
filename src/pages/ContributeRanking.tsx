import React from "react";
import {
  SimpleRankingCard3,
  SimpleRankingCard2,
  SimpleRankingCard1,
  RankingCardOther,
} from "../components/rankings/RankingCards";
import { Tabs } from "../components/rankings/Utilities";

const ContributeRanking = () => {
  return (
    <div className="mx-6 my-3">
      <Tabs isSelected="contribute-ranking" />
      <div className="flex justify-between items-end mt-[10px] m-auto w-[1020px]">
        <SimpleRankingCard2 />
        <SimpleRankingCard1 />
        <SimpleRankingCard3 />
      </div>
      <div className="mt-[31px]">
        <div className="bg-[#262626] w-[1602px] h-[52px] flex items-center justify-between border-b border-[#505050] rounded-t-[20px]">
          <div className="text-[14px] bg-[#D9D9D9] rounded-full w-[40px] h-[40px] text-[#505050] flex items-center justify-center ml-[71px]">
            4
          </div>
          <div className="text-[14px]">xxxxx</div>
          <div className="mr-[210px] text-[14px]">3333</div>
        </div>
        <div className="bg-[#262626] w-[1602px] h-[52px] flex items-center justify-between border-b border-[#505050]">
          <div className="text-[14px] bg-[#D9D9D9] rounded-full w-[40px] h-[40px] text-[#505050] flex items-center justify-center ml-[71px]">
            4
          </div>
          <div className="text-[14px]">xxxxx</div>
          <div className="mr-[210px] text-[14px]">3333</div>
        </div>
        <div className="bg-[#262626] w-[1602px] h-[52px] flex items-center justify-between rounded-b-[20px]">
          <div className="text-[14px] bg-[#D9D9D9] rounded-full w-[40px] h-[40px] text-[#505050] flex items-center justify-center ml-[71px]">
            4
          </div>
          <div className="text-[14px]">xxxxx</div>
          <div className="mr-[210px] text-[14px]">3333</div>
        </div>
      </div>
    </div>
  );
};

export default ContributeRanking;
