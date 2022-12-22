import { btnIdx } from './deskStyle'
import { FormattedMessage } from 'react-intl'

const fackUserData = [
  { username: 'A', balance: 1889 },
  { username: 'B', balance: 1117 },
  { username: 'e', balance: 1118 },
  { username: 'die', balance: 11 },
  { username: 'ewpe', balance: 12 },
  { username: 'eeasdf', balance: 21 },
  { username: 'ee', balance: 11 },
]

const userInfo = fackUserData.map((item, idx) => {
  return (
    <div key={idx} className="flex items-center p-1 w-full">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 i-heroicons-user-circle-solid text-theme-300"></div>
      </div>
      <div className="w-full pl-5">
        <p>{item.username}</p>
        <p className="text-amber-300">{item.balance}</p>
      </div>
    </div>
  )
})

const BetDesk = () => {
  return (
    <div className="relative h-full">
      <div className="grid absolute bottom-5 grid-cols-7 gap-9 px-20 m-auto w-full h-1/3">
        {userInfo}
      </div>
      <div className="grid grid-rows-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 ">
        <div className="grid grid-cols-11">
          <button className={btnIdx.tl2}>
            <FormattedMessage id="screens.baccaratRoom.player" />
          </button>
          <button className={btnIdx.tn2}>
            <div className="flex justify-around items-center px-5 w-full">
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
            </div>
          </button>
          <button className={btnIdx.tn3}>
            <FormattedMessage id="screens.baccaratRoom.player" />
          </button>
          <button className={btnIdx.tn2}>
            <div className="flex justify-around items-center px-5 w-full">
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
            </div>
          </button>
          <button className={btnIdx.tr2}>
            <FormattedMessage id="screens.baccaratRoom.player" />
          </button>
        </div>
        <div className="grid grid-cols-11">
          <button className={btnIdx.cl4}>
            <div className="flex justify-evenly items-center m-auto w-2/3">
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
            </div>
          </button>
          <button className={btnIdx.cn3}>
            <FormattedMessage id="screens.baccaratRoom.player" />
          </button>
          <button className={btnIdx.cr4}>
            <div className="flex justify-evenly items-center m-auto w-2/3">
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-7">
          <div className={btnIdx.bln}></div>
          <div className={btnIdx.bnn}></div>
          <div className={btnIdx.bnn}></div>
          <div className={btnIdx.bnn}></div>
          <div className={btnIdx.bnn}></div>
          <div className={btnIdx.bnn}></div>
          <div className={btnIdx.brn}></div>
        </div>
      </div>
    </div>
  )
}

export default BetDesk
