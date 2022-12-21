import React from "react";

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
        <img className="m-auto" src="../src/assets/heart.png" alt="heart" />
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
        src="../src/assets/anchor.png"
        alt="Avatar"
      />
    );
  }
  return (
    <img
      className="rounded-full w-[126px] h-[126px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      src="../src/assets/anchor.png"
      alt="Avatar"
    />
  );
};

export const Rank: React.FC<{ rank: string }> = ({ rank }) => {
  return (
    <img
      className="absolute top-[-33px] left-[18px] z-10"
      src={`../src/assets/${rank}.png`}
      alt={`${rank}`}
    />
  );
};
