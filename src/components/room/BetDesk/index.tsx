import { MultiplePlayers } from './MultiplePlayers'
import { SinglePlayer } from './SinglePlayer'

type BetDeskProps = {
  isToggle: boolean
  isDisabled: boolean
}

const BetDesk: React.FC<BetDeskProps> = ({ isToggle, isDisabled }) => {
  return (
    <div className="relative h-full">
      {isToggle ? <SinglePlayer isDisabled={isDisabled} /> : <MultiplePlayers isDisabled={isDisabled} />}
    </div>
  )
}

export default BetDesk
