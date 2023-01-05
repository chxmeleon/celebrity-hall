import { winRecord, CockroachRecordTile, BaseGrid } from './road'

const CockroachRoad = () => {
  return (
    <BaseGrid>
      {winRecord.map((item, idx) => {
        return <CockroachRecordTile key={idx} status={item} />
      })}
    </BaseGrid>
  )
}

export default CockroachRoad
