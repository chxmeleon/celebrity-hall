import LogoImg from '@/assets/login_logo.webp'
import { LinkButton } from '@/components/Button'

const LeftSidebar = () => {
  return (
    <div className="flex flex-shrink-0 py-5 px-7 w-52 text-center border-r-[0.5px] border-r-theme-75">
      <div className="mx-auto w-full">
        <section className="pb-6 w-full">
          <div className="flex">
            <img src={LogoImg} alt="logo image" className="m-auto w-24"/>
          </div>
          <div className="flex justify-around items-center pt-3 w-full">
            <div className="mt-1.5 w-11 h-11 i-heroicons-user-circle-solid"></div>
            <div className="text-left">
              <p className="text-xl">username</p>
              <p className="text-theme-300">points</p>
            </div>
          </div>
        </section>
        <hr className="border-t border-t-theme-75"/>
        <section className="my-2 w-full h-[430px]">
          <div className="flex flex-col justify-evenly w-full h-full">
            <LinkButton href="/home/rooms" isTarget={false} text="全部" />
            <LinkButton href="/home/liverooms" isTarget={false} text="互動廳" />
            <LinkButton href="/home/mutualrooms" isTarget={false} text="現場廳" />
            <LinkButton href="/home/rankings" isTarget={false} text="關注" />
            <LinkButton href="/home/tables" isTarget={false} text="多台下注" />
            <LinkButton href="/home/rankings" isTarget={false} text="排行榜" />
            <LinkButton href="/home/streamers" isTarget={false} text="美女主播" />
            <LinkButton href="https://google.com/" isTarget={true} text="APP下載" />
          </div>
        </section>
      </div>
    </div>
  )
}

export default LeftSidebar
