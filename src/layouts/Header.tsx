import { clsx as cx } from 'clsx'
import { useAuth } from '@/contexts/AuthContext'
import { useSetup } from '@/contexts/LanguageContext'
import { RightSidebarButton } from '@/components/Button'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

const icons = {
  heart: cx`i-heroicons-heart-solid text-2xl hover:text-pink-500 `,
  user: cx`i-heroicons-user-solid text-2xl hover:text-amber-200`,
  document: cx`i-heroicons-document-text-solid text-2xl hover:text-amber-200`,
  chart: cx`i-heroicons-chart-pie-solid text-[24px] hover:text-amber-200`,
  global: cx`i-heroicons-cog-8-tooth text-2xl hover:text-amber-200`,
  refresh: cx`i-mdi-refresh text-2xl hover:text-amber-200 mt-0.5`,
  bar: cx`i-heroicons-bars-3-solid text-2xl hover:text-amber-200 `,
  out: cx`i-heroicons-arrow-right-on-rectangle-solid text-2xl`,
  gear: cx`i-heroicons-cog-6-tooth-solid text-2xl`,
  notice: cx`i-heroicons-megaphone-solid text-2xl`,
  info: cx`i-heroicons-information-circle-solid text-2xl`,
  phone: cx`i-heroicons-phone-arrow-up-right-solid text-2xl`,
  sexy: cx`i-mdi-head-heart-outline text-2xl`,
}

const Header = () => {
  const { logout } = useAuth()
  const { openModal } = useSetup()
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
        <div className="flex justify-end items-center px-3 w-full h-full bg-theme-50">
          <div
            className="flex justify-around items-center w-[12rem] bg-theme-50"
            onClick={stopProp}
          >
            <button className={icons.heart}></button>
            <button className={icons.chart}></button>
            <button className={icons.refresh}></button>
            <div className="inline-block relative mt-1.5">
              <button className={icons.bar} onClick={onToggle}></button>
              <div
                className={`${
                  toggle
                    ? 'h-fit opacity-100 scale-y-100 translate-y-2'
                    : 'h-0 opacity-0 scale-y-[28%] -translate-y-36'
                } absolute w-[17.5rem] min-h-fit max-h-fit  -translate-x-[16rem] -z-10 transition-all duration-300 ease-in-out bg-theme-50/95 border border-theme-75 border-y-transparent`}
              >
                <div className="inline-block w-full text-lg" onClick={stopProp}>
                  <RightSidebarButton
                    href=""
                    isTarget={false}
                    onClick={() => null}
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
                    href=""
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
                  <RightSidebarButton
                    href=""
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
                  <RightSidebarButton
                    href=""
                    isTarget={false}
                    onClick={openModal}
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
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
