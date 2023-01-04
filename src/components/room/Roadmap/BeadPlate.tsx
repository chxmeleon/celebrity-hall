import { Tile } from './road'

const beadPlateRecord = ['p', 'd', 'p', 'b', 'p', 'd', 'b', 'd', 'p', 'd',  'b',  'p', 'b', 'p', 'p', 'b', 'b', 'p', 'd', 'p', 'b', 'b', 'b', 'b', 'p', 'd', 'd', 'p', 'p', 'd', 'p', 'b', 'p', 'd', 'd', 'p', 'd', 'd', 'd', 'd', 'd', 'p', 'd', 'b', 'p', '', '', '', '', '', '', '', ' ', ' ']

const BeadPlate: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="grid grid-rows-6 grid-flow-col w-full h-full">
        {beadPlateRecord.map((item, idx) => {
          return (
            <Tile key={idx} status={item}>
              {item}
            </Tile>
          )
        })}
      </div>
    </div>
  )
}

export default BeadPlate
