import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_STREAMERS } from '@/gql/streamers'
import { StreamersCards } from '@/components/streamers/index'
import { WebRTCStream } from '@/components/streamers/streamPlayer'

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
    <>
      <div className="block p-2 py-4 w-full h-full md:hidden">
        <div className="overflow-y-auto w-full h-full">
          <StreamersCards data={data.streamers} onStreamChanged={setStream} />
        </div>
      </div>

      <div className="hidden p-2 w-full h-full md:flex md:justify-between md:p-8">
        <div className="overflow-y-auto h-full md:overflow-x-hidden w-2/3">
          <StreamersCards data={data.streamers} onStreamChanged={setStream} />
        </div>
        <div className="pl-2 w-1/3 md:block">
          {stream.name && stream.key && (
            <WebRTCStream streamName={stream.name} streamKey={stream.key} />
          )}
        </div>
      </div>
    </>
  )
}

export default Streamers
