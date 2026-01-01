import { useSearchAutocomplete } from './functions/useSearchAutocomplete'
import './css/SearchBox.css'

type Props = {
  distance: number
  onDistanceChange: (value: number) => 0
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function SearchBox({
  distance, onDistanceChange, onSearch, isLoading
}: Props) {
  const {
    inputValue,
    suggestions,
    showSuggestions,
    handleInputChange,
    handleSuggestionClick,
    handleKeyPress
  } = useSearchAutocomplete(onSearch)

  return (
    <div className="searchContainer">
      <div className="searchInputContainer">
        <input
          type="text"
          placeholder="Masukan tempat atau alamat"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="searchInput"
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestionsList">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestionItem"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}

        <input
          type="number"
          value={distance}
          min={1}
          max={20}
          onChange={e => onDistanceChange(+e.target.value)}
          disabled={isLoading}
          className="distanceInput"
        />
        <span> KM</span>
      </div>
    </div>
  )
}
