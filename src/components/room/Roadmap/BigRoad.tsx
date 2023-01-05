import { winRecord, BigRecordTile, BaseGrid } from './road'

const BigRoad: React.FC = () => {
  return (
    <BaseGrid>
      {winRecord.map((item, idx) => {
        return <BigRecordTile key={idx} status={item} />
      })}
    </BaseGrid>
  )
}

export default BigRoad
