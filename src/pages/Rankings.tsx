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
      <div className="flex justify-between px-3 text-lg w-1/5 font-light">
        <div>荷官金鑽</div>
        <div>荷官大富豪</div>
        <div>貢獻榜</div>
      </div>
      <div className="flex justify-between items-end mt-[50px] m-auto w-[1020px]">
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
