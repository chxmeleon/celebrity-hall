import { clsx as cx } from 'clsx'

const icons = {
  heart: cx`i-heroicons-heart-solid hover:text-pink-500`,
  user: cx`i-heroicons-user-solid text-2xl hover:text-amber-200`,
  document: cx`i-heroicons-document-text-solid hover:text-amber-200`,
  chart: cx`i-heroicons-chart-pie-solid hover:text-amber-200`,
  global: cx`i-heroicons-cog-8-tooth hover:text-amber-200`,
  refresh: cx`i-mdi-refresh hover:text-amber-200`,
  bar: cx`i-heroicons-bars-3-solid`,
}

const Header = () => {

  return (
    <header className="relative">
      <nav className="absolute top-0 left-0 w-full h-12 bg-theme-50">
        <div className="flex justify-end items-center px-3 w-full h-full">
          <div className="flex justify-around text-2xl w-[10rem]">
            <button className={icons.heart}></button>
            <button className={icons.chart}></button>
            <button className={icons.refresh}></button>
            <button className={icons.bar}></button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
