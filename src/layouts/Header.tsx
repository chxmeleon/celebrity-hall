
const Header = () => {
  return (
    <header className="relative">
      <nav className="absolute left-0 top-0 bg-[#131313] h-12 w-full">
        <div className="flex justify-end items-center px-3 w-full h-full">
          <div className="flex justify-around text-2xl w-[14rem]">
            <button className="i-mdi-heart hover:text-pink-500"></button>
            <button className="i-mdi-account hover:text-theme-300"></button>
            <button className="i-mdi-file-document hover:text-theme-300"></button>
            <button className="i-mdi-chart-pie hover:text-theme-300"></button>
            <button className="i-mdi-web hover:text-theme-300"></button>
            <button className="i-mdi-refresh hover:text-theme-300"></button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
