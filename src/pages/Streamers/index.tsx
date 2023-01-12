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
    <div className="flex m-[50px]">
      <div className="flex flex-wrap sm:w-[900px]">
        <StreamersCards data={data.streamers} onStreamChanged={setStream} />
      </div>
      <div className="hidden sm:block">
        {stream.name && stream.key && (
          <div className="w-[calc(100vw-1200px)] h-[calc((100vw-1200px)*1.78)]">
            <WebRTCStream streamName={stream.name} streamKey={stream.key} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Streamers
