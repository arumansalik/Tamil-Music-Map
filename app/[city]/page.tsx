'use client'

import songsData from '@/data/songs.json'
import { useMusic } from '@/context/MusicPlayerContext'

export default function CityPage({ params }: { params: { city: string } }) {
  const city = params.city.toLowerCase()
  const data = songsData[city]
  const { playSong, currentSong } = useMusic()

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-2xl">No music found for {city}</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white bg-black">
      <div
        className="relative w-full h-64 md:h-96 bg-cover bg-center flex items-end p-6"
        style={{
          backgroundImage: `url(/city-images/${city}.jpg)`,
        }}
      >
        <div className="bg-black/60 p-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl font-bold capitalize">{city}</h1>
          <p className="text-gray-300 mt-1">Experience the soul of {city} through its sound</p>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">🎧 Songs</h2>
        <div className="grid gap-4">
          {data.songs.map((song, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-4 rounded-lg shadow-md backdrop-blur-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-300">{song.artist}</p>
              </div>
              <button
                onClick={() => playSong(song)}
                className="bg-white text-black px-4 py-1 rounded-lg hover:bg-gray-200"
              >
                {currentSong?.url === song.url ? 'Playing' : 'Play'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
