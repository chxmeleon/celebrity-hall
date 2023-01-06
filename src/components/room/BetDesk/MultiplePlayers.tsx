import { btnIdx } from './deskStyle'
import { FormattedMessage } from 'react-intl'
import { useSetup } from '@/contexts/SetupContext'

type MultiProps = {
  isActive: boolean
  idx: number
}

const MultiGrid: React.FC<MultiProps> = ({ isActive, idx }) => {
  return (
    <>
      {idx === 0 ? (
        <div className={isActive ? btnIdx.isUserL : btnIdx.bln} />
      ) : idx === 6 ? (
        <div className={isActive ? btnIdx.isUserR : btnIdx.brn} />
      ) : (
        <div className={isActive ? btnIdx.isUserN : btnIdx.bnn} />
      )}
    </>
  )
}

const userData = [
  { id: 0, username: 'A', balance: 1889 },
  { id: 1, username: 'B', balance: 1117 },
  { id: '', username: '', balance: '' },
  { id: '', username: '', balance: '' },
  { id: 4, username: 'ewpe', balance: 12 },
  { id: 5, username: 'eeasdf', balance: 21 },
  { id: '', username: '', balance: '' }
]

const multipleGrid = userData.map((item: any, idx: number) => {
  const isActive = item.username !== null && item.id === idx
  return <MultiGrid isActive={isActive} idx={idx} key={idx} />
})

const userInfo = userData.map((item, idx) => {
  return (
    <div key={idx} className="flex items-center p-1 w-full">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 i-heroicons-user-circle-solid text-theme-300"></div>
      </div>
      <div className="pl-5 w-full">
        <p>{item.username}</p>
        <p className="text-amber-300">{item.balance}</p>
      </div>
    </div>
  )
})

export const MultiplePlayers = () => {
  const { isRegular } = useSetup()

  return (
    <>
      <div className="grid absolute bottom-3 z-20 grid-cols-7 gap-9 px-20 m-auto w-full h-1/3">
        {userInfo}
      </div>
      <div className="grid grid-rows-3 m-auto w-[91%] h-full bet-skew px-2 pb-4 pt-0.5 [&_p]:font-normal">
        <div className="grid grid-cols-11">
          <button className={btnIdx.tl2}>
            <div className="text-grid-400">
              <FormattedMessage id="common.playerDragon" />
            </div>
          </button>
          <button className={btnIdx.tn2}>
            <div className="flex justify-around items-center px-5 w-full text-grid-400">
              <div>
                <p>1:11</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.playerPair" />
              </div>
            </div>
          </button>
          <button className={btnIdx.tn3}>
            <div className="flex justify-evenly items-center m-auto w-2/3 text-grid-200">
              <div className="font-medium">SUPER 6</div>
              <p>1:20</p>
            </div>
          </button>
          <button className={btnIdx.tn2}>
            <div className="flex justify-around items-center px-5 w-full text-grid-100">
              <div>
                <FormattedMessage id="screens.baccaratRoom.dealerPair" />
              </div>
              <div>
                <p>1:11</p>
              </div>
            </div>
          </button>
          <button className={btnIdx.tr2}>
            <div className="text-grid-100">
              <FormattedMessage id="common.dealerDragon" />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-11">
          <button className={btnIdx.cl4}>
            <div className="flex justify-evenly items-center m-auto w-2/3 text-grid-400">
              <div>
                <p>1:1</p>
              </div>
              <div>
                <FormattedMessage id="screens.baccaratRoom.player" />
              </div>
            </div>
          </button>
          <button className={btnIdx.cn3}>
            <div className="flex justify-around m-auto w-1/3 text-grid-300">
              <FormattedMessage id="common.simpleTie" />
              <div>
                <p>1:8</p>
              </div>
            </div>
          </button>
          <button className={btnIdx.cr4}>
            <div className="flex justify-evenly items-center m-auto w-2/3 text-grid-100">
              <div>
                <FormattedMessage id="common.dealer" />
              </div>
              <div>{isRegular ? <p>1:1</p> : <p>1:0.95</p>}</div>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-7">{multipleGrid}</div>
      </div>
    </>
  )
}
