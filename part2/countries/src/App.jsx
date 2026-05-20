import { useState, useEffect } from 'react'
import countriesServices from './services/countriesServices'
import Filter from './components/Filter'



function App() {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState("")

  useEffect(() => {
    countriesServices
      .getAll()
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const countriesToShow = countries.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(filterName.toLowerCase())
  )

  const tooManyMatches = countriesToShow.length > 10

  return (
    <>
      <h1>Find countries</h1>

      <Filter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />

      {tooManyMatches ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca3}>
              {country.name.common} - {country.cca3}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App