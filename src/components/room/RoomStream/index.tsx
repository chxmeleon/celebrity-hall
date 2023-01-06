import { useEffect, useRef, useState } from 'react'
import { NodePlayerStream, RoomStreamProps, WebRTCStream } from './streamPlayer'

const RoomStream: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize
}) => {
  return <WebRTCStream streamName={streamName} streamKey={streamKey}/>
}

export default RoomStream