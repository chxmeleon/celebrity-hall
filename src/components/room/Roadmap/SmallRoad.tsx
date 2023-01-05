import { winRecord, SmallRecordTile, BaseGrid } from './road'

const SmallRoad = () => {
  return (
    <BaseGrid>
      {winRecord.map((item, idx) => {
        return <SmallRecordTile key={idx} status={item} />
      })}
    </BaseGrid>
  )
}

export default SmallRoad
