'use client'

import { createContext, useContext, useState } from 'react'

type Song = {
  title: string
  artist: string
  url: string
  cover?: string
}

type MusicContextType = {
  currentSong: Song | null
  isPlaying: boolean
  playSong: (song: Song) => void
  pauseSong: () => void
}

const MusicContext = createContext<MusicContextType | null>(null)

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const pauseSong = () => setIsPlaying(false)

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, playSong, pauseSong }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) throw new Error('useMusic must be used within a MusicProvider')
  return context
}
