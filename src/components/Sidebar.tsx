import type { Dojo } from '../api/dojos'

type Props = {
  dojos: Dojo[]
}

export default function Sidebar({ dojos }: Props) {
  if (dojos.length === 0) {
    return <p>Tidak ada dojo dalam jarak yang ditentukan.</p>
  }

  return (
    <ul id="dojo-list">
      {dojos.map((dojo, i) => (
        <li key={i} className="dojo-card">
          <h3>{dojo.title}</h3>
          {dojo.description && <p>{dojo.description}</p>}
          <p>
            <a
              href={`https://google.com/maps?q=${dojo.lat},${dojo.lng}`}
              target="_blank"
            >
              Link to Google Map
            </a>
          </p>
        </li>
      ))}
    </ul>
  )
}
