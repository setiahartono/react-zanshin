import { useState } from 'react'

import { fetchNearbyDojos } from './api/dojos'
import type { Dojo } from './api/dojos'

import MapView from './components/MapView'
import SearchBox from './components/SearchBox'
import Sidebar from './components/Sidebar'

export default function App() {
  const [dojos, setDojos] = useState<Dojo[]>([])
  const [distance, setDistance] = useState(10)
  const [searchLocation, setSearchLocation] =
    useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedDojo, setFocusedDojo] = useState<Dojo | null>(null)

  // Always pass the distance explicitly
  async function handleLocationSelect(
    lat: number,
    lng: number,
    selectedDistance: number
  ) {
    setFocusedDojo(null)
    setIsLoading(true)
    try {
      const results = await fetchNearbyDojos(lat, lng, selectedDistance)
      setDojos(results)
      setSearchLocation({ lat, lng })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch(query: string, selectedDistance: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`
      )
      const data = await response.json()

      if (data.length > 0) {
        const { lat, lon } = data[0]
        handleLocationSelect(+lat, +lon, selectedDistance)
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
            searchLocation={searchLocation}
            focusedDojo={focusedDojo}
            isLoading={isLoading}
            onLocationSelect={(lat, lng) =>
              handleLocationSelect(lat, lng, distance)
            }
          />
        </div>

        <div className="sidebar">
          <h2>Hasil Pencarian</h2>
          <Sidebar
            dojos={dojos}
            onCenterDojo={
              (dojo) => setFocusedDojo(dojo)
            }
          />
        </div>
      </div>
    </div>
  )
}
