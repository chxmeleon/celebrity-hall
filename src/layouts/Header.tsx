import { clsx as cx } from 'clsx'

const icons = {
  heart: cx`i-heroicons-heart-solid hover:text-pink-500`,
  user: cx`i-heroicons-user-solid text-2xl hover:text-amber-200`,
  document: cx`i-heroicons-document-text-solid hover:text-amber-200`,
  chart: cx`i-heroicons-chart-pie-solid hover:text-amber-200`,
  global: cx`i-heroicons-cog-8-tooth hover:text-amber-200`,
  refresh: cx`i-mdi-refresh hover:text-amber-200`,
}

const Header = () => {
  return (
    <header className="relative">
      <nav className="absolute left-0 top-0 bg-theme-50 h-12 w-full">
        <div className="flex justify-end items-center px-3 w-full h-full">
          <div className="flex justify-around text-2xl w-[14rem]">
            <button className={icons.heart}></button>
            <button className={icons.user}></button>
            <button className={icons.document}></button>
            <button className={icons.chart}></button>
            <button className={icons.global}></button>
            <button className={icons.refresh}></button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
