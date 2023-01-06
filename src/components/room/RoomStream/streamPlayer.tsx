import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

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
  const [remoteStream, setRemoteStream] = useState<MediaStream | MediaSource | null>(null)
  const pc = new RTCPeerConnection()

  useEffect(() => {
    const requestStream = async () => {
      try {
        const offerOptions = {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }
        const offer = await pc.createOffer(offerOptions)
        await pc.setLocalDescription(offer)

        const request = JSON.stringify({
          version: 'v1.0',
          sessionId: Date.now().toString(),
          localSdp: offer
        })

        const response = await axios.post(
          `https://rtc.vvip99.net/${streamName}/${streamKey}.sdp`,
          request
        )

        const answer = new RTCSessionDescription(response.data.remoteSdp)
        await pc.setRemoteDescription(answer)
      } catch (error) {
        console.log('error:', error)
      }
    }

    requestStream()
    /* const video = document.querySelector('video') */
    pc.ontrack = (e: RTCTrackEvent) => {
      setRemoteStream(e.streams[0])
      /* video?.srcObject = e.streams[0] */
      /* video?.play() */
    }
    console.log(remoteStream);
  }, [streamName, streamKey])



  return (
    <div className="flex absolute z-0 flex-col w-full h-full">
      <div className="overflow-hidden relative w-full h-full">
        <video
          /* src={URL.createObjectURL(remoteStream)} */
          id={`rtc-${streamName}-${streamKey}`}
          playsInline
          className="w-full h-auto aspect-film"
        />
      </div>
    </div>
  )
}
