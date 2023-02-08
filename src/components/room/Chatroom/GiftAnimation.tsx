import { giftSrc } from '@/libs/giftlist'
import { clsx as cx } from 'clsx'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'

interface GiftAnimatioPorps {
  isShow: boolean
  selectedGift: string
}

const GiftAnimation: React.FC<GiftAnimatioPorps> = ({
  isShow,
  selectedGift
}) => {
  const snowflake = document.createElement('img')
  snowflake.src = giftSrc[selectedGift]

  const [isTrigger, setIsTrigger] = useState(false)

  useEffect(() => {
    if (isShow) {
      setIsTrigger(true)
    }

    setTimeout(() => {
      setIsTrigger(false)
    }, 7800)

    return () => {
      setIsTrigger(false)
    }
  }, [isShow])

  return (
    <div
      className={cx(
        'absolute z-30 pointer-events-none w-[352px] h-[109px]',
        isTrigger ? '' : 'hidden'
      )}
    >
      <div
        className={cx(
          'relative w-full h-full duration-500 ease-in-out',
          isShow ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Snowfall
          speed={[0.2, 4]}
          wind={[3, -0.7]}
          rotationSpeed={[0, 0]}
          images={[snowflake]}
          snowflakeCount={22}
          radius={[23, 23]}
        />
      </div>
    </div>
  )
}

export default GiftAnimation
