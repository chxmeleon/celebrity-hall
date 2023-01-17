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
    <div className="flex justify-between p-8 w-full h-full">
      <div className="grid overflow-y-auto grid-cols-1 grid-flow-row gap-4 sm:w-2/3 h-full md:grid-cols-2">
        <StreamersCards data={data.streamers} onStreamChanged={setStream} />
      </div>
      <div className="hidden w-1/3 sm:block">
        {stream.name && stream.key && (
          <WebRTCStream streamName={stream.name} streamKey={stream.key} />
        )}
      </div>
    </div>
  )
}

export default Streamers
