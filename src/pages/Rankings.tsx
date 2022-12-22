import React from "react";
import {
  RankingCard3,
  RankingCard2,
  RankingCard1,
  RankingCardOther,
} from "../components/rankings/RankingCards";

const Rankings = () => {
  return (
    <div className="mx-6 my-3">
      <div className="mt-[10px]">
        <div className="flex justify-between w-[500px] text-[30px] text-white">
          <div className="border-white border-b-[3px]">主播榜</div>
          <div>貢獻榜</div>
          <div>勝點榜</div>
          <div>局數榜</div>
        </div>
        <div className="flex justify-between w-[175px] mt-[10px] text-[14px]">
          <div className="rounded-[60px] bg-[#FFED82] w-[79px] h-[32px] items-center flex text-black justify-center">
            月榜
          </div>
          <div className="text-[#FFED82] w-[79px] h-[32px] items-center flex justify-center">
            週榜
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end mt-[10px] m-auto w-[1020px]">
        <RankingCard2 />
        <RankingCard1 />
        <RankingCard3 />
      </div>
      <div className="flex justify-between items-end mt-[60px] m-auto w-[1445px]">
        <RankingCardOther rank={4} />
        <RankingCardOther rank={5} />
        <RankingCardOther rank={6} />
      </div>
    </div>
  );
};

export default Rankings;
