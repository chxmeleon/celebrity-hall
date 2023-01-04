import { MultiplePlayers } from './MultiplePlayers'
import { SinglePlayer } from './SinglePlayer'

type BetDeskProps = {
  isToggle: boolean
}

const BetDesk: React.FC<BetDeskProps> = ({ isToggle }) => {
  return (
    <div className="relative h-full">
      {isToggle ? <SinglePlayer /> : <MultiplePlayers />}
    </div>
  )
}

export default BetDesk
