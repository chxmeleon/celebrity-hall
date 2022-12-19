import React from 'react'
import { FormattedMessage } from 'react-intl'

type ModalProps = {
  show: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  locale: string
}

const Modal: React.FC<ModalProps> = (props) => {
  const { show, onClick, onChange, locale } = props

  return (
    <>
      {show && (
        <div className="relative w-full h-full">
          <div
            onClick={onClick}
            className="flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center h-screen bg-theme-50/30 backdrop-blur-sm"
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-6 m-auto w-1/4 h-1/4 rounded-md border-yellow-400 bg-theme-70 border-[1px]"
            >
              <div className="flex justify-end">
                <div
                  onClick={onClick}
                  className="text-2xl i-heroicons-x-circle-solid"
                ></div>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">
                  <FormattedMessage id="language" />
                </label>
                <select
                  className="block p-2.5 w-full text-sm text-center text-gray-100 rounded-md border-r-[16px] border-theme-150 bg-theme-150 focus:outline-0"
                  value={locale}
                  onChange={onChange}
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
