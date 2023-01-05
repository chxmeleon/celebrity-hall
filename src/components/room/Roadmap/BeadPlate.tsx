import { winRecord, WinRecordTile, BaseGrid } from './road'

const BeadPlate: React.FC = () => {
  return (
    <BaseGrid>
      {winRecord.map((item, idx) => {
        return <WinRecordTile key={idx} status={item} />
      })}
    </BaseGrid>
  )
}

export default BeadPlate
