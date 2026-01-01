import { useState } from 'react'

import { fetchNearbyDojos } from './api/dojos'
import type { Dojo } from './api/dojos'

import MapView from './components/MapView'
import SearchBox from './components/SearchBox'
import Sidebar from './components/Sidebar'

export default function App() {
  const [dojos, setDojos] = useState<Dojo[]>([])
  const [distance, setDistance] = useState(10)
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleLocationSelect(lat: number, lng: number) {
    setIsLoading(true)
    const results = await fetchNearbyDojos(lat, lng, distance)
    setDojos(results)
    setSearchLocation({ lat, lng })
    setIsLoading(false)
  }

  async function handleSearch(query: string) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
      const data = await response.json()
      if (data.length > 0) {
        const { lat, lon } = data[0]
        handleLocationSelect(+lat, +lon)
      }
    } catch (error) {
      console.error('Error geocoding:', error)
    }
  }

  return (
    <div className="main-container">
      <SearchBox
        distance={distance}
        onDistanceChange={setDistance}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <div className="content">
        <div className="map-container">
          <MapView
            dojos={dojos}
            onLocationSelect={handleLocationSelect}
            searchLocation={searchLocation}
            isLoading={isLoading}
          />
        </div>

        <div className="sidebar">
          <h2>Hasil Pencarian</h2>
          <Sidebar dojos={dojos} />
        </div>
      </div>
    </div>
  )
}
