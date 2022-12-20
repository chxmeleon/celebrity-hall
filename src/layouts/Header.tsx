import { clsx as cx } from 'clsx'
import { useAuth } from '@/hooks/useAuth'
import { useSetup } from '@/hooks/useSetup'
import { buttonStyle as bts } from '@/components/buttonStyle'
import { RightSidebarButton } from '@/components/Button'

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
}

const Header = () => {
  const { logout } = useAuth()
  const { openModal } = useSetup()
  return (
    <header className="relative">
      <nav className="absolute top-0 left-0 w-full h-12 border-b bg-theme-50 border-b-theme-75">
        <div className="flex justify-end items-center px-3 w-full h-full">
          <div className="flex justify-around text-2xl w-[12rem]">
            <button className={icons.heart}></button>
            <button className={icons.chart}></button>
            <button className={icons.refresh}></button>
            <button className={icons.bar}></button>
          </div>
        </div>
      </nav>
      <div className="relative w-full">
        <div className="fixed right-6 top-12 rounded-xl border h-fit z-[10] w-[13.5rem] bg-theme-50/70 border-theme-75 backdrop-blur-md">
          <div className="flex flex-col justify-between w-full first:rounded-t-xl last-child:rounded-b-xl ">
            <RightSidebarButton href="" isTarget={false} onClick={openModal}>
              <i className={icons.gear}></i>
              <p>Setting</p>
            </RightSidebarButton>
            <RightSidebarButton href="" isTarget={false} onClick={logout}>
              <i className={icons.out}></i>
              <p>Logout</p>
            </RightSidebarButton>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
