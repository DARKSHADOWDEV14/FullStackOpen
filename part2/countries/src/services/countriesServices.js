import axios from 'axios';
const apiKey = import.meta.env.VITE_WEATHER_KEY;


const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = () => {
  return axios.get(baseUrl)
}

const getWeather = (capital) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
  )
}

export default { getAll, getWeather  };