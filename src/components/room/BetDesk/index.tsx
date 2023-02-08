import { MultiplePlayers } from './MultiplePlayers'
import { SinglePlayer } from './SinglePlayer'

type BetDeskProps = {
  isToggle: boolean
  isDisabled: boolean
  targetsData: {[key: string]: []}
}

const BetDesk: React.FC<BetDeskProps> = ({ isToggle, isDisabled, targetsData }) => {
  return (
    <div className="relative h-full">
      {isToggle ? (
        <SinglePlayer isDisabled={isDisabled} />
      ) : (
        <MultiplePlayers isDisabled={isDisabled} targetsData={targetsData}  />
      )}
    </div>
  )
}

export default BetDesk
