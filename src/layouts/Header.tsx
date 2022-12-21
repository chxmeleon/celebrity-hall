import { clsx as cx } from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { useSetup } from "@/hooks/useSetup";
import { RightSidebarButton } from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

const icons = {
  heart: cx`i-heroicons-heart-solid text-2xl hover:text-pink-500`,
  user: cx`i-heroicons-user-solid text-2xl hover:text-amber-200`,
  document: cx`i-heroicons-document-text-solid text-2xl hover:text-amber-200`,
  chart: cx`i-heroicons-chart-pie-solid text-2xl hover:text-amber-200`,
  global: cx`i-heroicons-cog-8-tooth text-2xl hover:text-amber-200`,
  refresh: cx`i-mdi-refresh text-2xl hover:text-amber-200`,
  bar: cx`i-heroicons-bars-3-solid text-2xl hover:text-amber-200`,
  out: cx`i-heroicons-arrow-right-on-rectangle-solid text-2xl`,
  gear: cx`i-heroicons-cog-6-tooth-solid text-2xl`,
  notice: cx`i-heroicons-megaphone-solid text-2xl`,
  info: cx`i-heroicons-information-circle-solid text-2xl`,
  phone: cx`i-heroicons-phone-arrow-up-right-solid text-2xl`,
  sexy: cx`i-mdi-head-heart-outline text-2xl`,
};

const Header = () => {
  const { logout } = useAuth();
  const { openModal } = useSetup();
  const [toggle, setToggle] = useState(false);
  const sidebarRef = useRef<HTMLButtonElement>(null);
  const onToggle = () => {
    setToggle((toggle) => !toggle);
  };

  const onCloseSide = () => setToggle(false);
  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!sidebarRef.current?.contains(e.target as Node | null)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, toggle]);

  return (
    <header className="relative" ref={sidebarRef} onClick={onCloseSide}>
      <nav className="absolute top-0 left-0 z-20 w-full h-12 border-b bg-theme-50 border-b-theme-75">
        <div className="flex justify-end items-center px-3 w-full h-full">
          <div
            className="flex justify-around text-2xl w-[12rem]"
            onClick={stopProp}
          >
            <button className={icons.heart}></button>
            <button className={icons.chart}></button>
            <button className={icons.refresh}></button>
            <button className={icons.bar} onClick={onToggle}></button>
          </div>
        </div>
      </nav>
      <div className="relative w-full">
        <div
          className={`${
            toggle ? 'h-[343px] opacity-100' : 'h-0 opacity-0 hidden'
          } fixed w-[17.5rem] max-w-fit min-h-fit max-h-fit top-12 right-4 z-40 transition-all duration-200 ease-in-out bg-theme-50/80 border border-theme-75 border-y-transparent`}
        >
          <div className="block w-full" onClick={stopProp}>
            <RightSidebarButton href="" isTarget={false} onClick={() => null}>
              <i className={icons.notice}></i>
              <p>
                <FormattedMessage
                  id="dropdown.notice"
                  defaultMessage="Notice"
                />
              </p>
            </RightSidebarButton>
            <RightSidebarButton
              href="/home/profile"
              isTarget={false}
              onClick={() => null}
            >
              <i className={icons.user}></i>
              <p>
                <FormattedMessage
                  id="dropdown.profile"
                  defaultMessage="Profile"
                />
              </p>
            </RightSidebarButton>
            <RightSidebarButton href="" isTarget={false} onClick={() => null}>
              <i className={icons.info}></i>
              <p>
                <FormattedMessage id="dropdown.info" defaultMessage="info" />
              </p>
            </RightSidebarButton>
            <RightSidebarButton
              href="https://page.line.me/?accountId=315xktcy"
              isTarget={true}
              onClick={() => null}
            >
              <i className={icons.phone}></i>
              <p>
                <FormattedMessage
                  id="dropdown.service"
                  defaultMessage="service"
                />
              </p>
            </RightSidebarButton>
            <RightSidebarButton href="" isTarget={false} onClick={openModal}>
              <i className={icons.gear}></i>
              <p>
                <FormattedMessage
                  id="setting.setting"
                  defaultMessage="Setting"
                />
              </p>
            </RightSidebarButton>
            <RightSidebarButton
              href="https://t.me/richman5888"
              isTarget={true}
              onClick={() => null}
            >
              <i className={icons.sexy}></i>
              <p>
                <FormattedMessage
                  id="dropdown.porn"
                  defaultMessage="Adult Video"
                />
              </p>
            </RightSidebarButton>
            <RightSidebarButton href="" isTarget={false} onClick={logout}>
              <i className={icons.out}></i>
              <p>
                <FormattedMessage
                  id="dropdown.logout"
                  defaultMessage="Logout"
                />
              </p>
            </RightSidebarButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
