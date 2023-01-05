import { useQuery } from '@apollo/client'
import { GET_STREAMERS } from '@/gql/announcements'
import { StreamersCard } from '@/components/streamers/index'

const Streamers = () => {
  const { loading, data } = useQuery(GET_STREAMERS)
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }

  return (
    <div className="m-[50px]">
      <div className="flex flex-wrap">
        <StreamersCard data={data.streamers} />
      </div>
    </div>
  )
}

export default Streamers
