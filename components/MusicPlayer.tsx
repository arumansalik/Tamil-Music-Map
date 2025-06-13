'use client'

import { useMusic } from '@/context/MusicPlayerContext'
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX
} from 'lucide-react'

const MusicPlayer = () => {
  const { currentSong, isPlaying, playSong, pauseSong } = useMusic()
  const [seek, setSeek] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const playerRef = useRef<ReactHowler>(null)

  const [playlist] = useState(() => {
    // Dummy playlist array (replace with context/global if needed)
    return [
      {
        title: 'Sample Song 1',
        artist: 'Local Artist',
        url: '/sample-music/song1.mp3',
        cover: '/covers/song1.jpg',
      },
      {
        title: 'Sample Song 2',
        artist: 'Another Artist',
        url: '/sample-music/song2.mp3',
        cover: '/covers/song2.jpg',
      }
    ]
  })

  const currentIndex = playlist.findIndex(song => song.url === currentSong?.url)

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      playSong(playlist[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSong(playlist[currentIndex - 1])
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        const pos = playerRef.current.seek()
        if (!isNaN(pos)) setSeek(pos)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  if (!currentSong) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-4 backdrop-blur-lg z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <ReactHowler
        src={currentSong.url}
        playing={isPlaying}
        ref={playerRef}
        volume={volume}
        mute={isMuted}
        onLoad={() => {
          const dur = playerRef.current?.duration()
          if (dur) setDuration(dur)
        }}
        onEnd={handleNext}
        html5={true}
      />

      {/* Song Info */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {currentSong.cover && (
          <img src={currentSong.cover} alt="cover" className="w-12 h-12 object-cover rounded" />
        )}
        <div>
          <h4 className="font-semibold text-sm">{currentSong.title}</h4>
          <p className="text-xs text-gray-300">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full sm:w-auto sm:flex-row gap-3">
        {/* Seek */}
        <div className="flex items-center gap-2 w-full sm:w-64">
          <span className="text-xs">{formatTime(seek)}</span>
          <input
            type="range"
            className="w-full"
            min={0}
            max={duration || 0}
            step="0.1"
            value={seek}
            onChange={(e) => {
              const time = parseFloat(e.target.value)
              playerRef.current?.seek(time)
              setSeek(time)
            }}
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={handlePrev}><SkipBack size={20} /></button>
          <button onClick={() => isPlaying ? pauseSong() : playSong(currentSong)}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={handleNext}><SkipForward size={20} /></button>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value))
            setIsMuted(false)
          }}
        />
      </div>
    </div>
  )
}

export default MusicPlayer
