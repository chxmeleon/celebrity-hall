import React from "react";
import {
  RankingCard3,
  RankingCard2,
  RankingCard1,
  RankingCardOther,
} from "../components/rankings/RankingCards";
import { Tabs } from "../components/rankings/Utilities";

const Rankings = () => {
  return (
    <div className="mx-6 my-3">
      <Tabs isSelected="rankings" />
      <div className="flex justify-between items-end sm:mt-[10px] m-auto sm:w-[1020px] w-[388px]">
        <RankingCard2 />
        <RankingCard1 />
        <RankingCard3 />
      </div>
      <div className="flex sm:flex-row flex-col sm:mt-[60px] mt-[16px] m-auto sm:w-[1445px] w-[388px]">
        <RankingCardOther rank={4} />
        <RankingCardOther rank={5} />
        <RankingCardOther rank={6} />
      </div>
    </div>
  );
};

export default Rankings;
