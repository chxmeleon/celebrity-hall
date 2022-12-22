import { btnIdx } from './deskStyle'
import { FormattedMessage } from 'react-intl'
import { MultiplePlayers } from './MultiplePlayers'
import { SinglePlayer } from './SinglePlayer'



const BetDesk = () => {
  return (
    <div className="relative h-full">
      <SinglePlayer />
    </div>
  )
}

export default BetDesk
