import { MultiplePlayers } from './MultiplePlayers'
import { SinglePlayer } from './SinglePlayer'

type BetDeskProps = {
  isToggle: boolean
  isDisabled: boolean
  targetsData: { [key: string]: [] }
  selectedChip: { [key: string]: string }
}

const BetDesk: React.FC<BetDeskProps> = ({
  isToggle,
  isDisabled,
  targetsData,
  selectedChip
}) => {
  return (
    <div className="relative h-full">
      {isToggle ? (
        <SinglePlayer isDisabled={isDisabled} selectedChip={selectedChip} />
      ) : (
        <MultiplePlayers
          isDisabled={isDisabled}
          targetsData={targetsData}
          selectedChip={selectedChip}
        />
      )}
    </div>
  )
}

export default BetDesk
