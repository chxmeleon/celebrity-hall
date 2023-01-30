import {
  SimpleRankingCard3,
  SimpleRankingCard2,
  SimpleRankingCard1
} from '../components/rankings/RankingCards'
import { Tabs, RankingTable } from '../components/rankings/Utilities'
import { useQuery } from '@apollo/client'
import { GET_USERRANKING } from '@/gql/ranking'
import { useState } from 'react'
import { mapRankingData } from '@/components/rankings/mapper'

const UserRanking = ({ type }: { type: string }) => {
  const [subTabSelected, setSubTabSelected] = useState('month')
  const { loading, data } = useQuery(GET_USERRANKING, {
    variables: { range: subTabSelected, type: type }
  })

  if (loading) {
    return <div className="m-[50px]">loading</div>
  }

  const mappedData = mapRankingData({ data: data.userRanking, type })
  const dataAfter3rd = mappedData.filter((item, index) => index > 2)

  return (
    <div className="overflow-y-scroll p-2 w-full h-full md:p-8">
      <Tabs
        isSelected={type}
        subTabSelected={subTabSelected}
        onSubTabSelected={setSubTabSelected}
      />
      <div className="flex gap-2 justify-between items-end m-auto mt-7 w-full md:gap-4 md:w-3/4">
        {mappedData[1] && (
          <div className="w-1/3">
            <SimpleRankingCard2
              point={mappedData[1].point}
              username={mappedData[1].username}
              avatarUrl={mappedData[1].avatar}
            />
          </div>
        )}
        {mappedData[0] && (
          <div className="w-1/3">
            <SimpleRankingCard1
              point={mappedData[0].point}
              username={mappedData[0].username}
              avatarUrl={mappedData[0].avatar}
            />
          </div>
        )}
        {mappedData[2] && (
          <div className="w-1/3">
            <SimpleRankingCard3
              point={mappedData[2].point}
              username={mappedData[2].username}
              avatarUrl={mappedData[2].avatar}
            />
          </div>
        )}
      </div>
      {dataAfter3rd.length > 0 && (
        <div className="flex flex-col items-center h-full mt-[31px]">
          <RankingTable data={dataAfter3rd} />
        </div>
      )}
    </div>
  )
}

export default UserRanking
