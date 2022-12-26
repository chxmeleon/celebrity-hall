import LogoImg from "@/assets/login_logo.webp";
import { LinkButton } from "@/components/Button";
import { FormattedMessage } from "react-intl";

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
        <section className="my-2 w-full h-[430px]">
          <div className="flex flex-col justify-evenly w-full h-full">
            <LinkButton href="/home/rooms" isTarget={false}>
              <FormattedMessage id="layout.all" defaultMessage="Explore" />
            </LinkButton>
            <LinkButton href="/home/liverooms" isTarget={false}>
              <FormattedMessage
                id="layout.liverooms"
                defaultMessage="Live Rooms"
              />
            </LinkButton>
            <LinkButton href="/home/mutualrooms" isTarget={false}>
              <FormattedMessage
                id="layout.mutualrooms"
                defaultMessage="Mutual Rooms"
              />
            </LinkButton>
            <LinkButton href="/home/following" isTarget={false}>
              <FormattedMessage
                id="layout.following"
                defaultMessage="Following"
              />
            </LinkButton>
            <LinkButton href="/home/tables" isTarget={false}>
              <FormattedMessage id="layout.tables" defaultMessage="Tables" />
            </LinkButton>
            <LinkButton href="/home/rankings" isTarget={false}>
              <FormattedMessage
                id="layout.rankings"
                defaultMessage="Rankings"
              />
            </LinkButton>
            <LinkButton href="/home/streamers" isTarget={false}>
              <FormattedMessage
                id="layout.streamers"
                defaultMessage="Streamers"
              />
            </LinkButton>
            <LinkButton href="https://google.com/" isTarget={true}>
              <FormattedMessage
                id="layout.appdownload"
                defaultMessage="App Download"
              />
            </LinkButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeftSidebar;
