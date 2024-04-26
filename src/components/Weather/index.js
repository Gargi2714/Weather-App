import cloud_icon from "/React/weather/weatherapi/src/images/cloudy.png";
import search from "/React/weather/weatherapi/src/images/search.png";
import humidity from "/React/weather/weatherapi/src/images/humidity.png";
import wind from "/React/weather/weatherapi/src/images/wind.png";
import "./index.css";
import { useState, useEffect } from "react";

const Weather = () => {
    const [city, setCity] = useState("");
    const [newCity, setNewCity] = useState("Pune");
    const [weatherData, setWeatherData] = useState(null);

    const Cityname = (event) => {
        setCity(event.target.value);
    };

    const newCityfunction = () => {
        setNewCity(city);
        setCity("");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=59fdab6856cbe365973404815b0d7d12";
                const options = {
                    method: "GET"
                };
    
                const response = await fetch(api, options);
                const apiData = await response.json();
                setWeatherData(apiData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        if (newCity) {
            fetchData();
        }
    }, [newCity]);
    
    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed(1);
    };

    return (
        <div className="background">
            <div className="container">
                <div className="searchInput">
                    <input className="searchCity" value={city} placeholder="Search City" onChange={Cityname}></input>
                    <button className="searchicon" onClick={newCityfunction}>
                        <img src={search} alt="Search" style={{ width: '15px', height: '15px' }} />
                    </button>
                </div>
                {weatherData && weatherData.main && (
                    <>
                        <div className="weatherIcon">
                            <img src={cloud_icon} alt="Weather Icon" style={{ width: '120px', height: '120px' }} />
                        </div>
                        <div className="temperature">{kelvinToCelsius(weatherData.main.temp)}°C</div>
                        <div className="cityName">{weatherData.name}</div>
                        <div className="bottomContainer">
                            <div className="humidity-speed">
                                <img src={humidity} alt="Humidity" style={{ width: '35px', height: '35px' }} />
                                <div className="data">
                                    <div className="percent-speed">{weatherData.main.humidity}%</div>
                                    <div className="text">Humidity</div>
                                </div>
                            </div>
                            <div className="humidity-speed">
                                <img src={wind} alt="Wind Speed" style={{ width: '35px', height: '35px' }} />
                                <div className="speeddata">
                                    <div className="percent-speed">{weatherData.wind.speed} km/hr</div>
                                    <div className="text">Wind Speed</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;
