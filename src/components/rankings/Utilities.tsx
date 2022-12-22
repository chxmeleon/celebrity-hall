import React from "react";
import { Link } from "react-router-dom";

export const Name: React.FC<{ name: string }> = ({ name }) => {
  return <div className="text-[24px] mt-[5px]">{name}</div>;
};

export const BodyShape: React.FC<{ height: number; weight: number }> = ({
  height,
  weight,
}) => {
  return (
    <div className="text-[13px]">
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
      <span className="flex items-center justify-center rounded-[5px] border-[0.5px] w-[35px] h-[18px] leading-[15px]">
        <span className="text-[12px]">時段</span>
      </span>
      <span className="text-[18px] pl-[6px]">
        {start} - {end}
      </span>
    </div>
  );
};

export const Heart: React.FC<{ like: number }> = ({ like }) => {
  return (
    <div className="flex mt-[8px] items-center">
      <span className="rounded-full bg-[#FF5F85] w-[30px] h-[30px] flex">
        <img
          className="m-auto"
          src="../src/assets/rankings/heart.png"
          alt="heart"
        />
      </span>
      <span className="ml-[7px] text-[32px]">{like}</span>
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
        className="rounded-full w-[156px] h-[156px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-[15px]"
        src="../src/assets/rankings/anchor.png"
        alt="Avatar"
      />
    );
  }
  return (
    <img
      className="rounded-full w-[126px] h-[126px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      src="../src/assets/rankings/anchor.png"
      alt="Avatar"
    />
  );
};

export const Rank: React.FC<{ rank: string }> = ({ rank }) => {
  return (
    <img
      className="absolute top-[-33px] left-[18px] z-10"
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
  return (
    <div className="mt-[10px]">
      <div className="flex justify-between w-[500px] text-[30px] text-white">
        <Link
          to="/home/rankings"
          className={`${
            buttonConfig[
              isSelected === "rankings" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          主播榜
        </Link>
        <Link
          to="/home/contribute-ranking"
          className={`${
            buttonConfig[
              isSelected === "contribute-ranking" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          貢獻榜
        </Link>
        <div
          className={`${
            buttonConfig[
              isSelected === "point-ranking" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          勝點榜
        </div>
        <div
          className={`${
            buttonConfig[
              isSelected === "board-ranking" ? "isSelected" : "notSelected"
            ]
          }`}
        >
          局數榜
        </div>
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
  );
};

export const SimpleCardAvatar: React.FC<{ img?: string }> = ({ img }) => {
  if (img) {
    return (
      <img
        className="rounded-full w-[50px] h-[50px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white"
        src="../src/assets/rankings/anchor.png"
        alt="Avatar"
      />
    );
  }
  return <div className="w-[50px] h-[50px] i-heroicons-user-circle-solid" />;
};

export const SimpleCardName: React.FC<{ name: string }> = ({ name }) => {
  return <div className="text-[20px] ml-[10px]">{name}</div>;
};

export const SimpleCardPoint: React.FC<{ point: number }> = ({ point }) => {
  return (
    <div className="text-[#FCD140] text-[64px] italic font-black">{point}</div>
  );
};

export const SimpleCardRank: React.FC<{ rank: string }> = ({ rank }) => {
  if (rank === "3rd") {
    return (
      <img
        className="absolute top-[-52px] right-[89px] z-10"
        src={`../src/assets/rankings/${rank}-lg.png`}
        alt={`${rank}`}
      />
    );
  }

  if (rank === "2nd") {
    return (
      <img
        className="absolute top-[-51px] right-[89px] z-10"
        src={`../src/assets/rankings/${rank}-lg.png`}
        alt={`${rank}`}
      />
    );
  }

  return (
    <img
      className="absolute top-[-53px] right-[72px] z-10"
      src={`../src/assets/rankings/${rank}-lg.png`}
      alt={`${rank}`}
    />
  );
};
