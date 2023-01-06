import { useEffect, useRef, useState } from 'react'
import {NodePlayerStream, RoomStreamProps } from './streamPlayer'

const RoomStream: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize
}) => {
  return <NodePlayerStream streamName={streamName} streamKey={streamKey}/>
}

export default RoomStream
