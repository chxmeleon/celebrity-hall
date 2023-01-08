import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export interface RoomStreamProps {
  streamName?: string
  streamKey?: string
  resolution?: string
  soundOn?: boolean
  videoOn?: boolean
  autoSize?: boolean
  className?: string
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
  className,
  resolution,
  soundOn,
  videoOn,
  autoSize
}) => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const pc = new RTCPeerConnection()

  useEffect(() => {
    const requestStream = async () => {
      if (!videoRef) return

      try {
        pc.addTransceiver('audio', { direction: 'recvonly' })
        pc.addTransceiver('video', { direction: 'recvonly' })
        pc.addEventListener('addstream', (e: any) => {
          videoRef.srcObject = e.stream
          if (!videoRef.paused) {
            videoRef.play()
          }
        })

        const offerOptions = {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }
        const offer = await pc.createOffer(offerOptions)
        await Promise.all([
          pc.setLocalDescription(offer),
          axios
            .post(
              `https://rtc.vvip99.net/${streamName}/${streamKey}.sdp`,
              JSON.stringify({
                version: 'v1.0',
                sessionId: Date.now().toString(),
                localSdp: offer
              })
            )
            .then(({ data }) => {
              const answer = new RTCSessionDescription(data.remoteSdp)
              return pc.setRemoteDescription(answer)
            })
        ])
      } catch (error) {
        console.log('error:', error)
      }
    }

    requestStream()
  }, [videoRef, streamName, streamKey])

  return (
    <div className={`flex absolute z-0 flex-col w-full h-full ${className}`}>
      <div className="overflow-hidden relative w-full h-full">
        <video
          ref={setVideoRef}
          playsInline
          autoPlay
          className={`w-full h-auto aspect-film object-fill`}
        />
      </div>
    </div>
  )
}
