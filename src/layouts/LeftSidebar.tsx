import LogoImg from '@/assets/login_logo.webp'
import { LinkButton, ToggleButton } from '@/components/Button'

const LeftSidebar = () => {
  return (
    <div className="flex flex-shrink-0 py-5 px-7 w-52 text-center border-r-[0.5px] border-r-theme-75">
      <div className="mx-auto w-full">
        <section className="pb-6 w-full">
          <div className="flex">
            <img src={LogoImg} alt="logo image" className="m-auto w-24" />
          </div>
          <div className="flex justify-around items-center pt-3 w-full">
            <div className="mt-1.5 w-11 h-11 i-heroicons-user-circle-solid"></div>
            <div className="text-left">
              <p className="text-xl">username</p>
              <p className="text-theme-300">points</p>
            </div>
          </div>
        </section>
        <hr className="border-t border-t-theme-75" />
        <section className="my-2 w-full h-[270px]">
          <div className="flex flex-col justify-evenly w-full h-full">
            <LinkButton href="/" isTarget={false} text="百家樂" />
            <LinkButton href="/streamers" isTarget={false} text="美女主播" />
            <LinkButton href="/lists" isTarget={false} text="快速好路" />
            <LinkButton href="/rankings" isTarget={false} text="排行榜" />
            <LinkButton
              href="https://t.me/richman5888"
              isTarget={true}
              text="成人影片"
            />
          </div>
        </section>
        <hr className="pb-1 border-1 border-theme-75" />
        <section className="w-full h-44">
          <div className="flex flex-col justify-around w-full h-full">
            <ToggleButton isTarget={false} href="">
              <div className="text-lg i-heroicons-megaphone-solid"></div>
              <p>會員公告</p>
            </ToggleButton>
            <ToggleButton isTarget={false} href="">
              <div className="text-lg i-heroicons-information-circle"></div>
              <p>遊戲說明</p>
            </ToggleButton>
            <ToggleButton
              isTarget={true}
              href="https://page.line.me/?accountId=315xktcy"
            >
              <div className="text-lg i-heroicons-phone-arrow-up-right-solid"></div>
              <p>客服中心</p>
            </ToggleButton>
            <ToggleButton isTarget={true} href="/">
              <div className="text-lg i-mdi-cellphone-arrow-down-variant"></div>
              <p>APP下載</p>
            </ToggleButton>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LeftSidebar
