import { useState } from 'react'

import { fetchNearbyDojos } from './api/dojos'
import type { Dojo } from './api/dojos'

import MapView from './components/MapView'
import SearchBox from './components/SearchBox'
import Sidebar from './components/Sidebar'

export default function App() {
  const [dojos, setDojos] = useState<Dojo[]>([])
  const [distance, setDistance] = useState(10)

  async function handleLocationSelect(lat: number, lng: number) {
    const results = await fetchNearbyDojos(lat, lng, distance)
    setDojos(results)
  }

  return (
    <div className="main-container">
      <SearchBox
        distance={distance}
        onDistanceChange={setDistance}
      />

      <div className="content">
        <div className="map-container">
          <MapView
            dojos={dojos}
            onLocationSelect={handleLocationSelect}
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
