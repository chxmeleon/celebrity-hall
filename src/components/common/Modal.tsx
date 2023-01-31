import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
  isShow: boolean
  onClose: () => void
}

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  isShow,
  onClose
}) => {
  return (
    <Portal>
      <div className={`${isShow ? 'block' : 'hidden'} relative w-full h-full`}>
        <div
          onClick={onClose}
          className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm"
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="p-1 md:p-6 m-auto w-4/5 md:w-1/2 h-[79%] bg-gradient-to-br rounded-md border border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md"
          >
            <div className="flex justify-end w-full h-10">
              <button
                onClick={onClose}
                className="text-2xl i-heroicons-x-circle"
              ></button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal

const Portal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const el = document.createElement('div')

  
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    modalRoot?.appendChild(el)

    return () => {
      modalRoot?.removeChild(el)
    }
  }, [el])

  return ReactDOM.createPortal(children, el)
}
