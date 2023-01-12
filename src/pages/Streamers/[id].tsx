import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_STREAMER } from '@/gql/streamers'
import { WebRTCStream } from '@/components/streamers/streamPlayer'

const Streamer = () => {
  const params = useParams()
  const { loading, data } = useQuery(GET_STREAMER, {
    variables: { id: `${params.id}` }
  })

  if (loading) {
    return <div className="m-[50px]">loading</div>
  }
  return (
    <div className="flex justify-center m-[50px]">
      {data.streamer.stream.name && data.streamer.stream.key && (
        <div className="w-[56.25vh] h-[100vh]">
          <WebRTCStream
            streamName={data.streamer.stream.name}
            streamKey={data.streamer.stream.key}
          />
        </div>
      )}
    </div>
  )
}

export default Streamer
