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
