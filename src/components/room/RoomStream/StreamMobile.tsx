import {
  NodePlayerStreamMobile,
  RoomStreamProps,
  WebRTCStreamMobile,
} from './streamPlayer'

const RoomStreamMobile: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize,
  isWebRTC,
  isTablesPath
}) => {
  return (
    <>
      {isWebRTC ? (
        <WebRTCStreamMobile streamName={streamName} streamKey={streamKey} />
      ) : (
        <NodePlayerStreamMobile streamName={streamName} streamKey={streamKey} isTablesPath={isTablesPath} />
      )}
    </>
  )
}

export default RoomStreamMobile
