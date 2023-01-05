import { winRecord, BigRecordTile, BaseGrid } from './road'

const BigEyeRoad: React.FC = () => {
  return (
    <BaseGrid>
      {winRecord.map((item, idx) => {
        return <BigRecordTile key={idx} status={item} />
      })}
    </BaseGrid>
  )
}

export default BigEyeRoad
