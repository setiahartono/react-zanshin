import type { Dojo } from '../api/dojos'
import './css/Sidebar.css'

type Props = {
  dojos: Dojo[]
  onCenterDojo: (dojo: Dojo) => void
}

export default function Sidebar({ dojos, onCenterDojo }: Props) {
  if (dojos.length === 0) {
    return <p>Tidak ada dojo dalam jarak yang ditentukan.</p>
  }

  return (
    <ul className="dojo-list">
      {dojos.map((dojo, i) => (
        <li key={i} className="dojo-card">
          <h3>{dojo.title}</h3>

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
  )
}
