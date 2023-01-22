import { useLanguage } from '@/contexts/LanguageContext'
import { useSetup } from '@/contexts/SetupContext'
import { FormattedMessage } from 'react-intl'

const SetupModal: React.FC = () => {
  const { locale, handleSelectValue, isSelected } = useLanguage()
  const { isShowSetup, closeSetup } = useSetup()

  return (
    <div
      className={`${isShowSetup ? '' : 'hidden'}  absolute w-full h-full`}
    >
      <div
        onClick={closeSetup}
        className="flex overflow-x-hidden overflow-y-hidden absolute inset-0 z-50 justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="p-4 m-auto bg-gradient-to-br rounded-md border w-5/6 md:w-[620px] min-h-fit border-theme-300/50 from-theme-50/75 via-theme-75/90 to-theme-50/50 backdrop-blur-md"
        >
          <div className="flex justify-end">
            <button
              onClick={closeSetup}
              className="text-2xl i-heroicons-x-circle"
            ></button>
          </div>
          <h1 className="pt-3 pb-6 text-2xl font-semibold text-center">
            <FormattedMessage id="setting.setting" defaultMessage="Setting" />
          </h1>
          <div className="flex justify-between p-3 w-full h-auto">
            <div className="flex-grow py-2.5 pl-1 font-medium tracking-wider text-md">
              <FormattedMessage
                id="setting.chooseacountry"
                defaultMessage="Language"
              />
            </div>
            <select
              className="relative w-1/2 text-sm text-center text-gray-100 rounded-md border-r-[16px] border-theme-150 bg-theme-150 focus:outline-0"
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
          <div className="flex justify-between items-center p-3 w-full">
            <div className="flex-grow py-2.5 pl-1 font-medium tracking-wider text-md">
              <FormattedMessage
                id="setting.gameVolume"
                defaultMessage="Game Volume"
              />
            </div>
            <div className="w-1/2">
              <input
                type="range"
                defaultValue="50"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="flex justify-between items-center p-3 w-full">
            <div className="flex-grow py-2.5 pl-1 font-medium tracking-wider text-md">
              <FormattedMessage
                id="setting.soundEffectsVolume"
                defaultMessage="Sound Effects Volume"
              />
            </div>
            <div className="w-1/2">
              <input
                type="range"
                defaultValue="50"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
          <div className="flex justify-between items-center p-3 w-full">
            <div className="flex-grow py-2.5 pl-1 font-medium tracking-wider text-md">
              <FormattedMessage
                id="setting.giftVolume"
                defaultMessage="Gift Volume"
              />
            </div>
            <div className="w-1/2">
              <input
                type="range"
                defaultValue="50"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupModal
