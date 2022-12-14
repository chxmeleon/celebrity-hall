import LogoImg from '@/assets/login_logo.webp'
import { LinkButton } from '@/components/Button'

const LeftSidebar = () => {
  return (
    <div className="flex flex-grow py-1 px-4 w-52 text-center border-r-[0.5px] border-r-theme-75">
      <div className="mx-auto w-full h-full flex flex-col justify-around">
        <section>
          <div className="flex">
            <img src={LogoImg} alt="logo image" className="m-auto w-24" />
          </div>
          <div className="flex justify-around items-center w-full">
            <div className="mt-1.5 w-11 h-11 i-heroicons-user-circle-solid"></div>
            <div className="text-left">
              <div>username</div>
              <div>points</div>
            </div>
          </div>
        </section>
        <hr className="border-1 border-theme-75" />
        <section className="w-full h-1/2 ">
          <div className="w-full h-1/2 flex flex-col justify-around">
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
        <hr className="border-1 border-theme-75" />
        <section>
          <div>會員公告</div>
          <div>遊戲說明</div>
          <div>客服中心</div>
          <div>APP下載</div>
        </section>
      </div>
    </div>
  )
}

export default LeftSidebar
