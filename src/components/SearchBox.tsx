// import { useEffect, useState } from 'react'

type Props = {
  distance: number
  onDistanceChange: (value: number) => void
}

export default function SearchBox({
  distance, onDistanceChange 
}: Props) {

  return (
    <div className="search-container">
      <input type="text" placeholder="Masukan tempat atau alamat" />
      <input
        type="number"
        value={distance}
        min={1}
        max={20}
        onChange={e => onDistanceChange(+e.target.value)}
      />
      <span> KM</span>
    </div>
  )
}
