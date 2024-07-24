import { useEffect, useRef, useState } from "react";
import { iconWeatherData } from "../data/WeatherData";

// icon
import search_icon from "../assets/img/icon/search.png";
import clear_icon from "../assets/img/icon/clear.png";
import humidity_icon from "../assets/img/icon/humidity.png";
import wind_icon from "../assets/img/icon/wind.png";

// style
import "../style/weather.css";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Masukkan nama kota");
      return;
    }
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = iconWeatherData[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      weatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Surabaya");
  }, []);

  return (
    <>
      <div className="weather">
        <div className="search-bar">
          <input ref={inputRef} type="search" placeholder="Search" />
          <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°c</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Weather;
