import type { Dojo } from '../api/dojos'
import './css/Sidebar.css'

type Props = {
  dojos: Dojo[]
  onCenterDojo: (dojo: Dojo) => void
  searchLocation: { lat: number; lng: number } | null
  distance: number
}

export default function Sidebar({ dojos, onCenterDojo, searchLocation, distance }: Props) {
  if (dojos.length === 0) {
    if (searchLocation) {
      return (
        <div className="sidebar-inner">
          <h2>Hasil Pencarian  dalam jarak {distance} Km</h2>
          <p>Tidak ditemukan dojo di lokasi pencarian anda.</p>
        </div>
      )
    }
    return <div className="sidebar-inner">
      <h2>Klik di peta atau masukkan alamat untuk mencari dojo.</h2>
    </div>
  }

  return (
    <div className='sidebar-inner'>
      <h2>Hasil Pencarian  dalam jarak {distance} Km</h2>
      <h3>Menampilkan {dojos.length} hasil</h3>
      <ul className="dojo-list">
        {dojos.map((dojo, i) => (
          <li key={i} className="dojo-card">
            <h3>{dojo.title} ({dojo.distance_from_search} Km)</h3>

            {dojo.description && <p>{dojo.description}</p>}

            <div className="dojo-actions">
              <p>
                <button type="button" onClick={() => onCenterDojo(dojo)}>
                  Tampilkan di Peta
                </button>
              </p>

              <p>
                <a
                  href={`https://google.com/maps?q=${dojo.lat},${dojo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
