import { useSetup } from '@/hooks/useSetup'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const Modal = () => {
  const { locale, isShow, closeModal, handleSelectValue, isSelected } = useSetup()

  return (
    <>
      {isShow && (
        <div className="relative w-full h-full">
          <div
            onClick={closeModal}
            className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center h-screen bg-black/30 backdrop-blur-sm"
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-5 m-auto w-1/4 h-1/4 bg-gradient-to-br rounded-md border border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md"
            >
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-2xl i-heroicons-x-circle-solid"
                ></button>
              </div>
              <div className="w-full flex justify-between p-3">
                <div className="w-1/4 py-2.5 pl-1 text-sm font-medium tracking-widest">
                  <FormattedMessage
                    id="chooseacountry"
                    defaultMessage="choose a language"
                  />
                </div>
                <select
                  className=" w-3/4 text-sm text-center text-gray-100 rounded-md border-r-[16px] border-theme-150 bg-theme-150 focus:outline-0"
                  value={isSelected}
                  defaultValue={locale}
                  onChange={handleSelectValue}
                >
                  <option value="en-us">
                    <FormattedMessage id="enUS" />
                  </option>
                  <option value="zh-tw">
                    <FormattedMessage id="zhTW" />
                  </option>
                  <option value="zh-cn">
                    <FormattedMessage id="zhCN" />
                  </option>
                  <option value="id">
                    <FormattedMessage id="id" />
                  </option>
                  <option value="vi">
                    <FormattedMessage id="vi" />
                  </option>
                  <option value="ph">
                    <FormattedMessage id="ph" />
                  </option>
                  <option value="th">
                    <FormattedMessage id="th" />
                  </option>
                </select>
              </div>
              <div className="w-full flex justify-between p-3">
                <div>Voice</div>
                <div></div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
