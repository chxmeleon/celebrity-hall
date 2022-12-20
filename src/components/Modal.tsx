import { useSetup } from '@/hooks/useSetup'
import React from 'react'
import { FormattedMessage } from 'react-intl'


const Modal = () => {
  const { isShow, closeModal, handleSelectValue, isSelected } = useSetup()

  return (
    <>
      {isShow && (
        <div className="relative w-full h-full">
          <div
            onClick={closeModal}
            className="   flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center h-screen  bg-black/30 backdrop-blur-sm "
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-5 m-auto w-1/4 h-1/4 rounded-md border-theme-300/50 bg-theme-70/75 backdrop-blur-md border"
            >
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-2xl i-heroicons-x-circle-solid"
                ></button>
              </div>
              <div className="w-full">
                <label className="block py-5 text-sm font-medium pl-1">
                  <FormattedMessage id="language" />
                </label>
                <select
                  className="block p-2.5 w-full text-sm text-center text-gray-100 rounded-md border-r-[16px] border-theme-150 bg-theme-150 focus:outline-0"
                  value={isSelected}
                  onChange={handleSelectValue}
                >
                  <option selected>
                    <FormattedMessage
                      id="chooseacountry"
                      defaultMessage="choose a language"
                    />
                  </option>
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
