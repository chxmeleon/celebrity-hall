import { clsx as cx } from 'clsx'
import { useAuth } from '@/contexts/AuthContext'
import { useSetup } from '@/contexts/SetupContext'
import { RightSidebarButton } from '@/components/common/Button'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import logoImgMobile from '/logo_m.webp'
import { useWallet } from '@/hooks/profile'

const icons = {
  heart: cx`i-heroicons-heart-solid text-2xl hover:text-pink-500 `,
  user: cx`i-heroicons-user-solid text-2xl hover:text-amber-200`,
  document: cx`i-heroicons-document-text-solid text-2xl hover:text-amber-200`,
  chart: cx`i-heroicons-chart-pie-solid text-[24px] hover:text-amber-200`,
  global: cx`i-heroicons-cog-8-tooth text-2xl hover:text-amber-200`,
  refresh: cx`i-mdi-refresh text-2xl hover:text-amber-200`,
  bar: cx`i-heroicons-bars-3-solid text-2xl hover:text-amber-200 mt-1.5`,
  out: cx`i-heroicons-arrow-right-on-rectangle-solid text-2xl`,
  gear: cx`i-heroicons-cog-6-tooth-solid text-2xl`,
  notice: cx`i-heroicons-megaphone-solid text-2xl`,
  info: cx`i-heroicons-information-circle-solid text-2xl`,
  phone: cx`i-heroicons-phone-arrow-up-right-solid text-2xl`,
  sexy: cx`i-mdi-head-heart-outline text-2xl`
}

const Header = () => {
  const { user } = useWallet()
  const { logout } = useAuth()
  const { openSetup, openNotice } = useSetup()
  const [toggle, setToggle] = useState(false)
  const sidebarRef = useRef<HTMLButtonElement>(null)
  const onToggle = () => {
    setToggle((toggle) => !toggle)
  }

  const onCloseSide = () => setToggle(false)
  const stopProp = (e: React.MouseEvent) => e.stopPropagation()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!sidebarRef.current?.contains(e.target as Node | null)) {
        setToggle(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebarRef, toggle])

  return (
    <header className="relative" ref={sidebarRef} onClick={onCloseSide}>
      <nav className="absolute top-0 left-0 z-40 w-full h-12 border-b bg-theme-50 border-b-theme-75">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex ml-1 w-full h-full md:hidden">
            <a href="/home/rooms" className="my-auto ">
              <img src={logoImgMobile} alt="logo img" className="w-auto h-6" />
            </a>
          </div>
          <div className="flex justify-end items-center px-3 w-full h-full bg-theme-50">
            <div className="m-auto w-2/3 text-xs md:hidden">
              <div className="m-auto w-2/3 text-right">
                <p className="truncate">{user?.profile?.nickname}</p>
                <p className="inline-flex pt-1 truncate text-theme-300">
                  <span>$</span>
                  <span>{user?.profile?.balance?.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div
              className="flex justify-around items-center w-[5rem] bg-theme-50"
              onClick={stopProp}
            >
              {/* <button className={icons.heart}></button> */}
              {/* <button className={icons.chart}></button> */}
              <button
                onClick={(e) => window.location.reload()}
                className={icons.refresh}
              ></button>
              <div className="relative">
                <button className={icons.bar} onClick={onToggle}></button>
                <div
                  className={`${
                    toggle ? '' : ' hidden'
                  } absolute w-[17.5rem] min-h-fit max-h-fit -translate-x-[16rem] z-40 bg-theme-50/95 border border-theme-75 border-y-transparent mt-2`}
                >
                  <div
                    className="inline-block w-full text-lg"
                    onClick={stopProp}
                  >
                    <RightSidebarButton
                      href=""
                      isLink={false}
                      isTarget={false}
                      onClick={openNotice}
                    >
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
                      isLink={true}
                      isTarget={true}
                      onClick={() => setToggle(false)}
                    >
                      <i className={icons.user}></i>
                      <p>
                        <FormattedMessage
                          id="dropdown.profile"
                          defaultMessage="Profile"
                        />
                      </p>
                    </RightSidebarButton>
                    <RightSidebarButton
                      href=""
                      isLink={false}
                      isTarget={false}
                      onClick={() => null}
                    >
                      <i className={icons.info}></i>
                      <p>
                        <FormattedMessage
                          id="dropdown.info"
                          defaultMessage="info"
                        />
                      </p>
                    </RightSidebarButton>
                    <RightSidebarButton
                      isLink={false}
                      href="https://page.line.me/?accountId=315xktcy"
                      isTarget={true}
                      onClick={() => setToggle(false)}
                    >
                      <i className={icons.phone}></i>
                      <p>
                        <FormattedMessage
                          id="dropdown.service"
                          defaultMessage="service"
                        />
                      </p>
                    </RightSidebarButton>
                    <RightSidebarButton
                      isLink={false}
                      href=""
                      isTarget={false}
                      onClick={openSetup}
                    >
                      <i className={icons.gear}></i>
                      <p>
                        <FormattedMessage
                          id="setting.setting"
                          defaultMessage="Setting"
                        />
                      </p>
                    </RightSidebarButton>
                    <RightSidebarButton
                      isLink={false}
                      href="https://t.me/richman5888"
                      isTarget={true}
                      onClick={() => setToggle(false)}
                    >
                      <i className={icons.sexy}></i>
                      <p>
                        <FormattedMessage
                          id="dropdown.porn"
                          defaultMessage="Adult Video"
                        />
                      </p>
                    </RightSidebarButton>
                    <RightSidebarButton
                      href=""
                      isLink={false}
                      isTarget={false}
                      onClick={logout}
                    >
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
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
