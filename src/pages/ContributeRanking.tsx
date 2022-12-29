import React from "react";
import {
  SimpleRankingCard3,
  SimpleRankingCard2,
  SimpleRankingCard1,
} from "../components/rankings/RankingCards";
import { Tabs, RankingTable } from "../components/rankings/Utilities";

const ContributeRanking = () => {
  return (
    <div className="sm:mx-6 sm:my-3">
      <Tabs isSelected="contribute-ranking" />
      <div className="flex justify-between items-end sm:mt-[10px] m-auto sm:w-[1020px] w-[388px]">
        <SimpleRankingCard2 />
        <SimpleRankingCard1 />
        <SimpleRankingCard3 />
      </div>
      <div className="mt-[31px] flex flex-col items-center">
        <RankingTable
          data={[
            { rank: 4, name: "xxxxxxxx", point: 1234 },
            { rank: 4, name: "xxxxxxxx", point: 1234 },
            { rank: 4, name: "xxxxxxxx", point: 1234 },
          ]}
        />
      </div>
    </div>
  );
};

export default ContributeRanking;
