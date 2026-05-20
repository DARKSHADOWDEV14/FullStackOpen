import { useState, useEffect } from "react";
import countriesServices from "./services/countriesServices";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesServices.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterName.toLowerCase()),
  );

  const tooManyMatches = countriesToShow.length > 10;

  return (
    <>
      <h1>Find countries</h1>

      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      {tooManyMatches ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca3}>
              {country.name.common}

              <button
                onClick={() => {
                  const isSelected = selectedCountry === country.cca3;

                  setSelectedCountry(isSelected ? null : country.cca3);

                  if (!isSelected) {
                    countriesServices
                      .getWeather(country.capital[0])
                      .then((response) => {
                        setWeather(response.data);
                      });
                  }
                }}
              >
                {selectedCountry === country.cca3 ? "hide" : "show"}
              </button>

              {selectedCountry === country.cca3 && (
                <div>
                  <p>
                    <strong>Area:</strong> {country.area} km²
                  </p>

                  <h3>Languages</h3>

                  <ul>
                    {country.languages &&
                      Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                      ))}
                  </ul>

                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    width="150"
                  />

                  {weather && (
                    <div>
                      <h3>Weather in {country.capital[0]}</h3>

                      <p>Temperature {weather.main.temp} °C</p>

                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                      />

                      <p>Wind {weather.wind.speed} m/s</p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
