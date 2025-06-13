import CityMap from '@/components/CityMap'

export default function Home() {
  return (
    <main className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🎶 Tamil Music by City</h1>
      <CityMap />
    </main>
  )
}
