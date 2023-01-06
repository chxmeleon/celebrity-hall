import axios from 'axios'
import React, { useEffect, useRef } from 'react'

export interface RoomStreamProps {
  streamName?: string
  streamKey?: string
  resolution?: string
  soundOn?: boolean
  videoOn?: boolean
  autoSize?: boolean
}

export const NodePlayerStream: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize
}) => {
  useEffect(() => {
    const player = new NodePlayer()
    NodePlayer.debug(false)
    player.setView(`video-${streamName}-${streamKey}`)
    player.setBufferTime(0)
    player.setScaleMode(0)
    player.setVolume(1.0)
    player.setKeepScreenOn()
    player.start(`https://live.vvip99.net/${streamName}/${streamKey}.flv`)
    player.on('error', (err) => {
      console.error('playerError', err)
    })
  }, [streamName, streamKey])

  return (
    <div className="flex absolute z-0 flex-col w-full h-full">
      <div className="overflow-hidden relative w-full h-full">
        <canvas
          id={`video-${streamName}-${streamKey}`}
          className="w-full h-auto aspect-film"
        />
      </div>
    </div>
  )
}

export const WebRTCStream: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize
}) => {
  const videoRef = useRef(null)
  useEffect(() => {
    const peer = new RTCPeerConnection()

    /* ;(async function () { */
    /*   peer.addTransceiver('audio', { direction: 'recvonly' }) */
    /*   peer.addTransceiver('video', { direction: 'recvonly' }) */
    /*   peer.addEventListener('addstream', (e) => { */
    /*     videoRef.current?.srcObject = e.stream */
    /*     videoRef.current?.play() */
    /*   }) */
    /*   const offerOptions = { */
    /*     offerToReceiveAudio: true, */
    /*     offerToReceiveVideo: true */
    /*   } */
    /*   const offer = await peer.createOffer(offerOptions) */
    /*   peer.setLocalDescription(offer) */
    /*   const request = JSON.stringify({ */
    /*     version: 'v1.0', */
    /*     sessionId: Date.now().toString(), */
    /*     localSdp: offer */
    /*   }) */
    /*   const response = await axios.post(`https://rtc.vvip99.net/${streamName}/${streamKey}.sdp`, request) */
    /*   const { */
    /*     data: { remoteSdp } */
    /*   } = response */
    /*   peer.setRemoteDescription(new RTCSessionDescription(remoteSdp)) */
    /* })() */
  }, [videoRef])

  return (
    <div className="flex absolute z-0 flex-col w-full h-full">
      <div className="overflow-hidden relative w-full h-full">
        <video
          id={`video-${streamName}-${streamKey}`}
          ref={videoRef}
          className="w-full h-auto aspect-film"
        />
      </div>
    </div>
  )
}
