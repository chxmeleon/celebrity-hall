import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export interface RoomStreamProps {
  streamName?: string
  streamKey?: string
  resolution?: string
  soundOn?: boolean
  videoOn?: boolean
  autoSize?: boolean
  isWebRTC?: boolean
  isLoading?: boolean
  width?: string
  height?: string
}

export const WebRTCStream: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize,
  isLoading,
  height,
  width
}) => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!videoRef || !streamName || !streamKey) return

    const pc = new RTCPeerConnection()
    pc.addTransceiver('audio', { direction: 'recvonly' })
    pc.addTransceiver('video', { direction: 'recvonly' })
    pc.ontrack = (e) => {
      videoRef.srcObject = e.streams[0]
      if (!videoRef.paused) {
        videoRef.play()
      }
    }

    pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    })
      .then(async (offer) => {
        const [, { data }] = await Promise.all([
          pc.setLocalDescription(offer),
          axios.post(
            `https://rtc-tw.vvip99.net/${streamName}/${streamKey}.sdp`,
            JSON.stringify({
              version: 'v1.0',
              sessionId: Date.now().toString(),
              localSdp: offer
            })
          )
        ])

        const { sdp, type } = data.remoteSdp
        const answer = new RTCSessionDescription({
          type,
          sdp
        })
        return pc.setRemoteDescription(answer)
      })
      .catch((error) => {
        console.log('error:', error)
      })

    return () => {
      pc.close()
    }
  }, [videoRef, streamName, streamKey])

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className="w-full h-full border border-gray-100">
          <div className="overflow-hidden relative w-full h-full">
            <video
              ref={setVideoRef}
              playsInline
              autoPlay
              className="object-fill w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  )
}
