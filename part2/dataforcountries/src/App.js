import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
  
  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }
  const handleClick = (data) => {
    setSearchQuery(data);
  } 

  useEffect(() => {
    axios.get(countriesUrl)
      .then(response => setCountries(response.data))
  }, [])


  return (
    <>
      find countries <input onChange={handleQueryChange} />
      <div>
        <Countries
          countries={countries}
          searchQuery={searchQuery}
          handleClick={handleClick}
        />
      </div>
    </>
  );
}

export default App;
