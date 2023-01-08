import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_STREAMERS } from '@/gql/streamers'
import { StreamersCards } from '@/components/streamers/index'
import { WebRTCStream } from '@/components/room/RoomStream/streamPlayer'

export interface streamType {
  name: 'string' | null
  key: 'string' | null
}

const Streamers = () => {
  const [stream, setStream] = useState<streamType>({ name: null, key: null })
  const { loading, data } = useQuery(GET_STREAMERS)
  if (loading) {
    return <div className="m-[50px]">loading</div>
  }

  return (
    <div className="m-[50px] flex">
      <div className="flex flex-wrap sm:w-[900px]">
        <StreamersCards data={data.streamers} onStreamChanged={setStream} />
      </div>
      <div className="sm:block hidden">
        {stream.name && stream.key && (
          <WebRTCStream
            className="w-[calc(100vw-1200px)] h-[calc((100vw-1200px)*1.78)]"
            streamName={stream.name}
            streamKey={stream.key}
          />
        )}
      </div>
    </div>
  )
}

export default Streamers
