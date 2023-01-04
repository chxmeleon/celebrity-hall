import { useSetup } from '@/contexts/LanguageContext'

const CustomModal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isShow, closeModal } = useSetup()
  return (
    <>
      <div className={`${isShow ? 'block' : 'hidden'} relative w-full h-full `}>
        <div
          onClick={closeModal}
          className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center h-screen bg-black/30 backdrop-blur-sm"
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="p-4 m-auto bg-gradient-to-br rounded-md border w-1/2 h-3/4 border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md overflow-y-scroll"
          >
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-2xl i-heroicons-x-circle"
              ></button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomModal 
