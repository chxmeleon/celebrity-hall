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
    <div className="sm:mx-6 sm:my-3">
      <Tabs
        isSelected={type}
        subTabSelected={subTabSelected}
        onSubTabSelected={setSubTabSelected}
      />
      <div className="flex justify-between items-end sm:mt-[10px] m-auto sm:w-[1020px] w-[388px]">
        {mappedData[1] && (
          <SimpleRankingCard2
            point={mappedData[1].point}
            username={mappedData[1].username}
            avatarUrl={mappedData[1].avatar}
          />
        )}
        {mappedData[0] && (
          <SimpleRankingCard1
            point={mappedData[0].point}
            username={mappedData[0].username}
            avatarUrl={mappedData[0].avatar}
          />
        )}
        {mappedData[2] && (
          <SimpleRankingCard3
            point={mappedData[2].point}
            username={mappedData[2].username}
            avatarUrl={mappedData[2].avatar}
          />
        )}
      </div>
      {dataAfter3rd.length > 0 && (
        <div className="mt-[31px] flex flex-col items-center">
          <RankingTable data={dataAfter3rd} />
        </div>
      )}
    </div>
  )
}

export default UserRanking
