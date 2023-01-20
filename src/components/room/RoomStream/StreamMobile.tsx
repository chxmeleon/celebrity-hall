import {
  NodePlayerStreamMobile,
  RoomStreamProps,
  WebRTCStreamMobile,
  WebRTCStream
} from './streamPlayer'

const RoomStreamMobile: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize,
  isWebRTC
}) => {
  return (
    <>
      {isWebRTC ? (
        <WebRTCStreamMobile streamName={streamName} streamKey={streamKey} />
      ) : (
        <NodePlayerStreamMobile streamName={streamName} streamKey={streamKey} />
      )}
    </>
  )
}

export default RoomStreamMobile
