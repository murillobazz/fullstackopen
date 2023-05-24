// import { useState, useEffect } from 'react';
// import axios from 'axios';

const Countries = ({countries, searchQuery, handleClick}) => {
  // const [weather, setWeather] = useState({});

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // useEffect(() => {
  //   console.log('useEffect');
  //   const API_KEY = process.env.REACT_APP_API_KEY;
  //   const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
  //   if (filteredCountries.length === 1) {
  //     const expandedCountry = filteredCountries[0];

  //     setTimeout(() => {
  //       axios.get(
  //       `${weatherUrl}
  //       ?lat=${expandedCountry.capitalInfo.latlng[0]}
  //       &lon=${expandedCountry.capitalInfo.latlng[1]}
  //       &units=metric&appid=${API_KEY}`)
  //       .then(response => setWeather(response.data))
  //       .then(console.log(weather))
  //     },3000)
      
  //   }
  // }, [weather, filteredCountries])


  // Shows message when there's more than 10 countries in filter
  if (filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>

  // Shows info about the country when there's only one in filter
  if (filteredCountries.length === 1) return (
    filteredCountries.map(country =>
      <div key={country.name.common}>
        <h1>
          {country.name.common}
        </h1>
        <p>
          capital: {country.capital}
        </p>
        <p>
          area: {country.area}
        </p>
        <p>
          languages:
        </p>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
        {/* <h2>Weather in {country.capital}</h2>
        <p>temperature {weather?.current.temp}</p> */}
      </div>
    )
  )
  // Shows 10 countries based on filter input
  return (
    filteredCountries.map(country => 
      <div key={country.name.common}>
        {country.name.common}
        {/* <button onClick={() => handleClick(country.name.common)}>show</button> */}
      </div>
    )
  )
  }

export default Countries;