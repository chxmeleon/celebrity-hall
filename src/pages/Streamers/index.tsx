import streamer from "@/assets/streamers/streamer.png";
import heart from "@/assets/rankings/heart.png";

export const Win: React.FC<{ percent: number }> = ({ percent }) => {
  return (
    <div className="flex items-center sm:mr-[32px] mr-[10px]">
      <span className="rounded-full bg-[#FF5F85] w-[25px] h-[25px] flex">
        <div className="m-auto text-[14px]">勝</div>
      </span>
      <span className="sm:ml-[10px] ml-[5px] text-[16px]">{percent}%</span>
    </div>
  );
};

export const Heart: React.FC<{ like: number }> = ({ like }) => {
  return (
    <div className="flex items-center">
      <span className="rounded-full bg-[#FF5F85] w-[25px] h-[25px] flex">
        <img
          className="m-auto w-[12.42px] h-[11.04px]"
          src={heart}
          alt="heart"
        />
      </span>
      <span className="sm:ml-[10px] ml-[5px] text-[16px]">{like}</span>
    </div>
  );
};

const StreamersCard: React.FC<{ data: Array<any> }> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div className="sm:mr-[40px] sm:mb-[55px] mb-[35px]">
          <img
            className="sm:w-[401px] sm:h-[355px] w-[278px] h-[246px]"
            src={streamer}
          />
          <div className="flex items-center justify-between">
            <div className="sm:text-[32px] text-[24px]">小辣椒</div>
            <div className="flex">
              <Win percent={87} />
              <Heart like={172} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Streamers = () => {
  return (
    <div className="m-[50px]">
      <div className="flex flex-wrap">
        <StreamersCard data={[1, 2, 3, 4, 5]} />
      </div>
    </div>
  );
};

export default Streamers;
