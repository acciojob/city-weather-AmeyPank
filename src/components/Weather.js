import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [name, setName] = useState('')
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [error, setError] = useState('');

  const API_KEY = '1f83a6aac95ca415fc0dba306cc1227e';

  const getWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          const temp = Math.round(data.main.temp - 273.15);
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;
          const name = data.name; // Extract the city name from the API response

          setTemperature(temp + '°C');
          setDescription(desc);
          setWeatherIcon(`https://openweathermap.org/img/w/${icon}.png`);
          setError('');
          setName(name)// Update the city name state
          setCity(''); // Clear the input field
        } else {
          setTemperature('');
          setDescription('');
          setWeatherIcon('');
          setError('City not found. Please try again.');
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setError('Something went wrong. Please try again later.');
      });
  };


  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  const handleInputChange = event => {
    setCity(event.target.value);
  };

  return (
    <form className='search'>
      <h2>Weather App</h2>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name"
        />
      </div>
      {error && <p>{error}</p>}
      {temperature && (
        <div >
          <h2>{name}</h2>
          <h3>Weather Details</h3>
          <p>Temperature: {temperature}</p>
          <p>Description: {description}</p>
          <img src={weatherIcon} alt="Weather Icon" />
        </div>
      )}
    </form>
  );
};

export default WeatherApp;
