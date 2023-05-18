
import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
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

          setTemperature(temp + '°C');
          setDescription(desc);
          setWeatherIcon(`https://openweathermap.org/img/w/${icon}.png`);
          setError('');
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

  return (
    <div>
      <h2>Weather App</h2>
      <div>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name"
        />
      </div>
      {error && <p>{error}</p>}
      {temperature && (
        <div className='search'>
          <h2>{city}</h2>
          <h3>Weather Details</h3>
          <p>Temperature: {temperature}</p>
          <p>Description: {description}</p>
          <img src={weatherIcon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
