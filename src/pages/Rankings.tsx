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
    <div className="sm:mx-6 sm:my-3">
      <Tabs
        isSelected="rankings"
        subTabSelected={subTabSelected}
        onSubTabSelected={setSubTabSelected}
      />
      <div className="flex justify-between items-end sm:mt-[10px] m-auto sm:w-[1020px] w-full">
        {data.newStreamerRanking[1] && (
          <RankingCard2
            username={data.newStreamerRanking[1].nickname}
            likesCount={data.newStreamerRanking[1].likesCount}
            avatarUrl={data.newStreamerRanking[1].avatar}
          />
        )}
        {data.newStreamerRanking[0] && (
          <RankingCard1
            username={data.newStreamerRanking[0].nickname}
            likesCount={data.newStreamerRanking[0].likesCount}
            avatarUrl={data.newStreamerRanking[0].avatar}
          />
        )}
        {data.newStreamerRanking[2] && (
          <RankingCard3
            username={data.newStreamerRanking[2].nickname}
            likesCount={data.newStreamerRanking[2].likesCount}
            avatarUrl={data.newStreamerRanking[2].avatar}
          />
        )}
      </div>
      <div className="flex sm:flex-row flex-col sm:mt-[60px] mt-[16px] m-auto sm:w-[1445px] w-full px-[6px]">
        {data.newStreamerRanking[3] && (
          <RankingCardOther
            rank={4}
            username={data.newStreamerRanking[3].nickname}
            likesCount={data.newStreamerRanking[3].likesCount}
            avatarUrl={data.newStreamerRanking[3].avatar}
          />
        )}
        {data.newStreamerRanking[4] && (
          <RankingCardOther
            rank={5}
            username={data.newStreamerRanking[4].nickname}
            likesCount={data.newStreamerRanking[4].likesCount}
            avatarUrl={data.newStreamerRanking[4].avatar}
          />
        )}
        {data.newStreamerRanking[5] && (
          <RankingCardOther
            rank={6}
            username={data.newStreamerRanking[5].nickname}
            likesCount={data.newStreamerRanking[5].likesCount}
            avatarUrl={data.newStreamerRanking[5].avatar}
          />
        )}
      </div>
    </div>
  )
}

export default Rankings
