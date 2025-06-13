import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MusicPlayer from '@/components/MusicPlayer'
import { MusicProvider } from '@/context/MusicPlayerContext'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tamil Music Map',
  description: 'Stream Tamil songs city-wise with a beautiful map interface',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-black text-white">
        <MusicProvider>
          <Navbar />
          <main className="flex-grow pb-24">{children}</main>
          <Footer />
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  )
}
