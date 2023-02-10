import {
  NodePlayerStreamMobile,
  RoomStreamProps,
  WebRTCStreamMobile
} from './streamPlayer'

const RoomStreamMobile: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize,
  isWebRTC,
  isTablesPath,
  isActived
}) => {
  return (
    <>
      {isWebRTC ? (
        <WebRTCStreamMobile
          streamName={streamName}
          streamKey={streamKey}
          isTablesPath={isTablesPath}
          isActived={isActived}
        />
      ) : (
        <NodePlayerStreamMobile
          streamName={streamName}
          streamKey={streamKey}
          isTablesPath={isTablesPath}
          isActived={isActived}
        />
      )}
    </>
  )
}

export default RoomStreamMobile
