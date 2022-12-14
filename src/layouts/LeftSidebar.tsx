import LogoImg from '@/assets/login_logo.webp'
import { LinkButton, ToggleButton } from '@/components/Button'

const LeftSidebar = () => {
  return (
    <div className="flex flex-shrink-0 py-5 px-4 w-52 text-center border-r-[0.5px] border-r-theme-75">
      <div className="mx-auto w-full h-full">
        <section className="pb-5 w-full">
          <div className="flex">
            <img src={LogoImg} alt="logo image" className="m-auto w-24" />
          </div>
          <div className="flex justify-around items-center pt-6 w-full">
            <div className="mt-1.5 w-11 h-11 i-heroicons-user-circle-solid"></div>
            <div className="text-left">
              <p className="text-xl">username</p>
              <p className="text-theme-300">points</p>
            </div>
          </div>
        </section>
        <hr className="py-1 border-t-1 border-t-theme-75" />
        <section className="w-full h-80">
          <div className="flex flex-col justify-evenly w-full h-full">
            <LinkButton href="/">
              <p>百家樂</p>
            </LinkButton>
            <LinkButton href="/">
              <p>美女主播</p>
            </LinkButton>
            <LinkButton href="/">
              <p>快速好路</p>
            </LinkButton>
            <LinkButton href="/">
              <p>排行榜</p>
            </LinkButton>
            <LinkButton href="/">
              <p>成人影片</p>
            </LinkButton>
          </div>
        </section>
        <hr className="my-4 border-1 border-theme-75" />
        <section className="w-full h-44">
          <div className="flex flex-col justify-around w-full h-full">
            <ToggleButton>
              <div className="flex justify-around items-center m-auto w-2/3">
                <div className="text-lg i-heroicons-megaphone-solid"></div>
                <p>會員公告</p>
              </div>
            </ToggleButton>
            <ToggleButton>
              <div className="flex justify-around items-center m-auto w-2/3">
                <div className="text-lg i-heroicons-information-circle"></div>
                <p>遊戲說明</p>
              </div>
            </ToggleButton>
            <ToggleButton>
              <div className="flex justify-around items-center m-auto w-2/3">
                <div className="text-lg i-heroicons-phone-arrow-up-right-solid"></div>
                <p>客服中心</p>
              </div>
            </ToggleButton>
            <ToggleButton>
              <div className="flex justify-around items-center m-auto w-2/3">
                <div className="text-lg i-mdi-cellphone-arrow-down-variant"></div>
                <p>APP下載</p>
              </div>
            </ToggleButton>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LeftSidebar
