import {
  RankingCard3,
  RankingCard2,
  RankingCard1,
  RankingCardOther
} from '../components/rankings/RankingCards'
import { useQuery } from '@apollo/client'
import { Tabs } from '../components/rankings/Utilities'
import { GET_STREAMERRANKING } from '@/gql/ranking'
import { useState } from 'react'

const Rankings = () => {
  const [subTabSelected, setSubTabSelected] = useState('month')

  const { loading, data } = useQuery(GET_STREAMERRANKING, {
    variables: { range: subTabSelected }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden p-2 w-full h-full md:p-8">
      <Tabs
        isSelected="rankings"
        subTabSelected={subTabSelected}
        onSubTabSelected={setSubTabSelected}
      />
      <div className="flex justify-between items-end m-auto mt-6 w-full gap-2 md:gap-4 md:w-3/4">
        {data.newStreamerRanking[1] && (
          <div className="w-1/3 h-full md:p-2">
            <RankingCard2
              username={data.newStreamerRanking[1].nickname}
              likesCount={data.newStreamerRanking[1].likesCount}
              avatarUrl={data.newStreamerRanking[1].avatar}
            />
          </div>
        )}
        {data.newStreamerRanking[0] && (
          <div className="w-1/3 md:p-2 md:h-full">
            <RankingCard1
              username={data.newStreamerRanking[0].nickname}
              likesCount={data.newStreamerRanking[0].likesCount}
              avatarUrl={data.newStreamerRanking[0].avatar}
            />
          </div>
        )}
        {data.newStreamerRanking[2] && (
          <div className="w-1/3 md:p-2">
            <RankingCard3
              username={data.newStreamerRanking[2].nickname}
              likesCount={data.newStreamerRanking[2].likesCount}
              avatarUrl={data.newStreamerRanking[2].avatar}
            />
          </div>
        )}
      </div>
      <div className="gap-4 justify-around items-center pt-3 m-auto w-full md:flex md:pt-6">
        {data.newStreamerRanking[3] && (
          <div className="md:w-1/3">
            <RankingCardOther
              rank={4}
              username={data.newStreamerRanking[3].nickname}
              likesCount={data.newStreamerRanking[3].likesCount}
              avatarUrl={data.newStreamerRanking[3].avatar}
            />
          </div>
        )}
        {data.newStreamerRanking[4] && (
          <div className="md:w-1/3">
            <RankingCardOther
              rank={5}
              username={data.newStreamerRanking[4].nickname}
              likesCount={data.newStreamerRanking[4].likesCount}
              avatarUrl={data.newStreamerRanking[4].avatar}
            />
          </div>
        )}
        {data.newStreamerRanking[5] && (
          <div className="md:w-1/3">
            <RankingCardOther
              rank={6}
              username={data.newStreamerRanking[5].nickname}
              likesCount={data.newStreamerRanking[5].likesCount}
              avatarUrl={data.newStreamerRanking[5].avatar}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Rankings
