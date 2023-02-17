import { ResponsiveContext } from '@/hooks/useResponsive'
import { clsx as cx } from 'clsx'
import { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
  isShow: boolean
  onClose: () => void
  size: string
  solidBackground?: boolean
}

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  isShow,
  onClose,
  size,
  solidBackground = false
}) => {
  const modalRoot = document.getElementById('modal-root')

  const { onResizeWindow } = useContext(ResponsiveContext)

  useEffect(() => {
    onResizeWindow?.()
  }, [onResizeWindow, isShow])

  return (
    <>
      {isShow && modalRoot
        ? ReactDOM.createPortal(
            <div
              className={`${
                isShow ? 'block' : 'hidden'
              } relative w-full h-full`}
            >
              <div
                onClick={onClose}
                className={cx(
                  'flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center w-full h-full  backdrop-blur-sm',
                  solidBackground ? 'bg-black' : 'bg-black/30'
                )}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className={cx(
                    'p-1 md:p-6 m-auto bg-gradient-to-br rounded-md border border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md',
                    size
                  )}
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
            </div>,
            modalRoot
          )
        : null}
    </>
  )
}
export default Modal
