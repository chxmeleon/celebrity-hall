import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { clsx as cx } from 'clsx'
import { useSetup } from '@/contexts/SetupContext'

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
  isTablesPath?: boolean
}

export const NodePlayerStreamMobile: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize,
  isLoading,
  isTablesPath
}) => {
  const [player, setPlayer] = useState<NodePlayer | null>(null)
  const { gameVolume } = useSetup()
  const volume = useMemo(() => gameVolume / 100, [gameVolume])

  useEffect(() => {
    const player = new NodePlayer()
    NodePlayer.debug(false)
    player.setView(`video-${streamName}-${streamKey}`)
    player.setBufferTime(0)
    player.setScaleMode(isTablesPath ? 2 : 1)
    player.setVolume(volume)
    player.setKeepScreenOn()
    player.start(`https://live.vvip99.net/${streamName}/${streamKey}.flv`)
    player.on('error', (err) => {
      console.error('playerError', err)
    })

    setPlayer(player)
    return () => {
      player.release(false)
    }
  }, [streamName, streamKey, isTablesPath, volume])

  return (
    <div className="overflow-hidden relative w-full h-full">
      <canvas
        id={`video-${streamName}-${streamKey}`}
        className="object-cover w-full h-full"
      />
    </div>
  )
}

export const WebRTCStreamMobile: React.FC<RoomStreamProps> = ({
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
  const { gameVolume } = useSetup()
  const volume = useMemo(() => gameVolume / 100, [gameVolume])

  useEffect(() => {
    
    let pc: RTCPeerConnection | null = null
    const requestStream = async () => {
      if (!videoRef) return
      videoRef.volume = volume
      try {
        pc = new RTCPeerConnection()
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
              return pc?.setRemoteDescription(answer)
            })
        ])
      } catch (error) {
        console.log('error:', error)
      }
    }

    requestStream()
    return () => {
      if (pc) {
        pc.close()
      }
    }
  }, [videoRef, streamName, streamKey, volume])

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className="overflow-hidden relative w-full h-full">
          <video
            
            ref={setVideoRef}
            playsInline
            autoPlay
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </>
  )
}

export const NodePlayerStream: React.FC<RoomStreamProps> = ({
  streamName,
  streamKey,
  resolution,
  soundOn,
  videoOn,
  autoSize,
  isLoading
}) => {
  const { gameVolume } = useSetup()
  const volume = useMemo(() => gameVolume / 100, [gameVolume])

  useEffect(() => {
    if (!streamName || !streamKey) return

    const player = new NodePlayer()
    NodePlayer.debug(false)
    player.setView(`video-${streamName}-${streamKey}`)
    player.setBufferTime(0)
    player.setScaleMode(0)
    player.setVolume(volume)
    player.setKeepScreenOn()
    player.start(`https://live.vvip99.net/${streamName}/${streamKey}.flv`)
    player.on('error', (err) => {
      console.error('playerError', err)
    })

    return () => {
      player.release(false)
    }
  }, [streamName, streamKey, volume])

  return (
    <div className="flex absolute z-0 flex-col w-full h-full">
      <div className="overflow-hidden relative w-full h-auto aspect-film">
        <canvas
          id={`video-${streamName}-${streamKey}`}
          className="object-cover w-full h-full"
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
  autoSize,
  isLoading,
  height,
  width
}) => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const { gameVolume } = useSetup()
  const volume = useMemo(() => gameVolume / 100, [gameVolume])

  if (videoRef) {
    videoRef.volume = volume
  }   

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
            `https://rtc.vvip99.net/${streamName}/${streamKey}.sdp`,
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
  }, [videoRef, streamName, streamKey, volume])

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className="flex absolute z-0 flex-col w-full h-full">
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
