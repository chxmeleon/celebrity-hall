import React from "react";

const Rankings = () => {
  return (
    <div className="mx-6 my-3">
      <div className="flex justify-between px-3 text-lg w-1/5 font-light">
        <div>荷官金鑽</div>
        <div>荷官大富豪</div>
        <div>貢獻榜</div>
      </div>
      <div className="flex justify-between px-3 text-lg font-light m-auto">
        <div className="relative rounded-[15px] w-[320px] h-[329px] mx-auto  mt-10 bg-gradient-to-br p-[4px] from-rankingBorder-100 to-rankingBorder-200">
          <div className="flex flex-col justify-between h-full bg-gradient-to-tl from-rankingbg-100  via-rankingbg-200 to-rankingbg-300 text-white rounded-[15px]">
            <img
              className="absolute top-[-33px] left-[18px]"
              src="../src/assets/2nd.png"
              alt="2nd"
            />
            <div className="m-auto flex flex-col items-center">
              <img
                className="rounded-full w-[126px] h-[126px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                src="../src/assets/anchor.png"
                alt="anchor"
              />
              <div className="text-[24px] mt-[5px]">方方</div>
              <div className="text-[13px]">162 cm / 52 kg</div>
              <div className="flex items-center">
                <span className="flex items-center justify-center rounded-[5px] border-[0.5px] w-[35px] h-[18px] leading-[15px]">
                  <span className="text-[12px]">時段</span>
                </span>
                <span className="text-[18px] pl-[6px]">16:00 - 00:00</span>
              </div>
              <div className="flex mt-[12px]">
                <span className="rounded-full bg-[#FF5F85] w-[30px] h-[30px] flex">
                  <img
                    className="m-auto"
                    src="../src/assets/heart.png"
                    alt="heart"
                  />
                </span>
                <span className="ml-[7px]">100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
