import React, { useState, Dispatch, SetStateAction } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export const Name: React.FC<{ name: string }> = ({ name }) => {
  return <div className="sm:text-[24px] text-[10px] mt-[5px]">{name}</div>;
};

export const BodyShape: React.FC<{ height: number; weight: number }> = ({
  height,
  weight,
}) => {
  return (
    <div className="sm:text-[13px] text-[9px]">
      {height} cm / {weight} kg
    </div>
  );
};

export const Timetable: React.FC<{ start: string; end: string }> = ({
  start,
  end,
}) => {
  return (
    <div className="flex items-center">
      <span className="flex items-center justify-center rounded-[5px] border-[0.5px] sm:w-[35px] w-[28px] sm:h-[18px] h-[15px] leading-[15px]">
        <span className="sm:text-[12px] text-[9px]">時段</span>
      </span>
      <span className="sm:text-[18px] text-[10px] sm:pl-[6px] pl-[2px]">
        {start} - {end}
      </span>
    </div>
  );
};

export const Heart: React.FC<{ like: number }> = ({ like }) => {
  return (
    <div className="flex mt-[8px] items-center">
      <span className="rounded-full bg-[#FF5F85] sm:w-[30px] w-[17px] sm:h-[30px] h-[17px] flex">
        <img
          className="m-auto w-[8.44px] h-[7.51px] sm:w-[15.65px] sm:h-[13.92px]"
          src="../src/assets/rankings/heart.png"
          alt="heart"
        />
      </span>
      <span className="ml-[7px] sm:text-[32px] text-[15px]">{like}</span>
    </div>
  );
};

export const Avatar: React.FC<{ img?: string; rank?: string }> = ({
  img,
  rank,
}) => {
  if (rank === "1st") {
    return (
      <img
        className="rounded-full sm:w-[156px] sm:h-[156px] w-[75px] h-[75px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:mb-[15px]"
        src="../src/assets/rankings/anchor.png"
        alt="Avatar"
      />
    );
  }
  return (
    <img
      className="rounded-full sm:w-[126px] w-[51px] sm:h-[126px] h-[51px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      src="../src/assets/rankings/anchor.png"
      alt="Avatar"
    />
  );
};

export const Rank: React.FC<{ rank: string }> = ({ rank }) => {
  if (rank === "1st") {
    return (
      <img
        className="absolute sm:top-[-33px] sm:left-[18px] top-[-12px] left-[10px] z-10 w-[40px] h-[59px] sm:w-[114px] sm:h-[158px]"
        src={`../src/assets/rankings/${rank}.png`}
        alt={`${rank}`}
      />
    );
  }

  return (
    <img
      className="absolute sm:top-[-33px] sm:left-[18px] top-[-15px] left-[10px] z-10 w-[40px] h-[59px] sm:w-[90px] sm:h-[126px]"
      src={`../src/assets/rankings/${rank}.png`}
      alt={`${rank}`}
    />
  );
};

const buttonConfig = {
  isSelected: "border-white border-b-[3px]",
  notSelected: "opacity-40",
};

export const Tabs: React.FC<{ isSelected: string }> = ({ isSelected }) => {
  const [subTabSelected, setSubTabSelected] = useState("month");
  return (
    <div className="mt-[10px]">
      <div className="flex justify-between sm:w-[500px] w-full sm:text-[30px] text-[15px] text-white">
        <Link
          to="/home/rankings"
          className={`${
            buttonConfig[
              isSelected === "rankings" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          <FormattedMessage id="ranking.Tab.anchor" defaultMessage="主播榜" />
        </Link>
        <Link
          to="/home/contribute-ranking"
          className={`${
            buttonConfig[
              isSelected === "contribute-ranking" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          <FormattedMessage
            id="ranking.Tab.contribute"
            defaultMessage="貢獻榜"
          />
        </Link>
        <div
          className={`${
            buttonConfig[
              isSelected === "point-ranking" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          <FormattedMessage id="ranking.Tab.point" defaultMessage="勝點榜" />
        </div>
        <div
          className={`${
            buttonConfig[
              isSelected === "board-ranking" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          <FormattedMessage id="ranking.Tab.board" defaultMessage="局數榜" />
        </div>
      </div>
      <SubTabs selected={subTabSelected} setSelected={setSubTabSelected} />
    </div>
  );
};

const SubTabsConfig = {
  isSelected:
    "rounded-[60px] bg-[#FFED82] sm:w-[79px] sm:h-[32px] w-[48px] h-[17px] items-center flex text-black justify-center",
  notSelected:
    "text-[#FFED82] sm:w-[79px] sm:h-[32px] w-[48px] h-[17px] items-center flex justify-center",
};

export const SubTabs: React.FC<{
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}> = ({ selected, setSelected }) => {
  return (
    <div className="flex sm:justify-between justify-center sm:w-[175px] mt-[10px] sm:text-[14px] text-[9px]">
      <button
        className={`${
          SubTabsConfig[selected === "month" ? "isSelected" : "notSelected"]
        }`}
        onClick={() => setSelected("month")}
      >
        <FormattedMessage id="ranking.period.month" defaultMessage="月榜" />
      </button>
      <button
        className={`${
          SubTabsConfig[selected === "week" ? "isSelected" : "notSelected"]
        }`}
        onClick={() => setSelected("week")}
      >
        <FormattedMessage id="ranking.period.week" defaultMessage="週榜" />
      </button>
    </div>
  );
};

export const SimpleCardAvatar: React.FC<{ img?: string }> = ({ img }) => {
  if (img) {
    return (
      <img
        className="rounded-full sm:w-[50px] sm:h-[50px] w-[18px] h-[18px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white"
        src="../src/assets/rankings/anchor.png"
        alt="Avatar"
      />
    );
  }
  return (
    <div className="sm:w-[50px] sm:h-[50px] w-[18px] h-[18px] i-heroicons-user-circle-solid" />
  );
};

export const SimpleCardName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="sm:text-[20px] text-[10px] sm:ml-[10px] ml-[5px]">
      {name}
    </div>
  );
};

const SimpleCardPointConfig = {
  "1st": "text-[#FCD140] sm:text-[64px] text-[24px] italic font-black",
  "2nd": "text-[#CCCCCC] sm:text-[64px] text-[24px] italic font-black",
  "3rd": "text-[#D0AA89] sm:text-[64px] text-[24px] italic font-black",
};

export const SimpleCardPoint: React.FC<{
  point: number;
  rank: "1st" | "2nd" | "3rd";
}> = ({ point, rank }) => {
  return <div className={`${SimpleCardPointConfig[rank]}`}>{point}</div>;
};

export const SimpleCardRank: React.FC<{ rank: string }> = ({ rank }) => {
  if (rank === "3rd") {
    return (
      <img
        className="absolute sm:top-[-52px] top-[-27px] sm:right-[89px] right-[22px] z-10 w-[75px] sm:w-[142px]"
        src={`../src/assets/rankings/${rank}-lg.png`}
        alt={`${rank}`}
      />
    );
  }

  if (rank === "2nd") {
    return (
      <img
        className="absolute sm:top-[-51px] sm:right-[89px] top-[-27px] right-[22px] z-10 w-[75px] sm:w-[142px]"
        src={`../src/assets/rankings/${rank}-lg.png`}
        alt={`${rank}`}
      />
    );
  }

  return (
    <img
      className="absolute sm:top-[-53px] sm:right-[72px] top-[-22px] right-[22px] z-10 w-[75px] sm:w-[178px]"
      src={`../src/assets/rankings/${rank}-lg.png`}
      alt={`${rank}`}
    />
  );
};

const RankingTableFtRow: React.FC<{
  rank: number;
  name: string;
  point: number;
  index: number;
  length: number;
}> = ({ rank, name, point, index, length }) => {
  if (index === 0) {
    return (
      <div className="bg-[#262626] w-11/12 h-[59px] flex items-center justify-between sm:border-b sm:border-[#505050] sm:rounded-t-[20px] sm:rounded-b-[0px] rounded-[5px] sm:mb-[0px] mb-[6px]">
        <div className="sm:text-[14px] text-[11px] bg-[#D9D9D9] rounded-full sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] text-[#505050] flex items-center justify-center sm:ml-[71px] ml-[10px]">
          {rank}
        </div>
        <div className="text-[14px]">{name}</div>
        <div className="sm:mr-[210px] mr-[10px] text-[14px]">{point}</div>
      </div>
    );
  }
  if (index + 1 === length) {
    return (
      <div className="bg-[#262626] w-11/12 h-[59px] flex items-center justify-between sm:rounded-b-[20px] sm:rounded-t-[0px] rounded-[5px]">
        <div className="sm:text-[14px] text-[11px] bg-[#D9D9D9] rounded-full sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] text-[#505050] flex items-center justify-center sm:ml-[71px] ml-[10px]">
          {rank}
        </div>
        <div className="text-[14px]">{name}</div>
        <div className="sm:mr-[210px] mr-[10px] text-[14px]">{point}</div>
      </div>
    );
  }
  return (
    <div className="bg-[#262626] w-11/12 h-[52px] flex items-center justify-between sm:border-b sm:border-[#505050] sm:mb-[0px] mb-[6px] rounded-[5px] sm:rounded-[0px]">
      <div className="sm:text-[14px] text-[11px] bg-[#D9D9D9] rounded-full sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] text-[#505050] flex items-center justify-center sm:ml-[71px] ml-[10px]">
        {rank}
      </div>
      <div className="text-[14px]">{name}</div>
      <div className="sm:mr-[210px] mr-[10px] text-[14px]">{point}</div>
    </div>
  );
};

export const RankingTable: React.FC<{
  data: Array<{ rank: number; name: string; point: number }>;
}> = ({ data }) => {
  return (
    <>
      {data.map((element, index) => (
        <RankingTableFtRow
          rank={element.rank}
          name={element.name}
          point={element.point}
          length={data.length}
          index={index}
          key={index}
        />
      ))}
    </>
  );
};
