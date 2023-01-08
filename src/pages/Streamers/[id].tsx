import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_STREAMER } from '@/gql/streamers'
import { WebRTCStream } from '@/components/room/RoomStream/streamPlayer'

const Streamer = () => {
  const params = useParams()
  const { loading, data } = useQuery(GET_STREAMER, {
    variables: { id: `${params.id}` }
  })
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  return (
    <div className="m-[50px] flex justify-center">
      {data.streamer.stream.name && data.streamer.stream.key && (
        <WebRTCStream
          className="w-[56.25vh] h-[100vh]"
          streamName={data.streamer.stream.name}
          streamKey={data.streamer.stream.key}
        />
      )}
    </div>
  )
}

export default Streamer
