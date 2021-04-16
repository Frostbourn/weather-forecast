import React, { useState, useEffect } from "react";
import {
  WiWindDeg,
  WiRaindrop,
  WiBarometer,
  WiSnowflakeCold,
} from "weather-icons-react";
import WeatherIcon from "../WeatherIcon/WeatherIcon.js";
import HourlyForecast from "../HourlyForecast";

const CurrentWeather = ({ lat, lng, query }) => {
  //console.log(state)
  const [data, setData] = useState([]);
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [snow, setSnow] = useState();
  const [rain, setRain] = useState();
  const [wind, setWind] = useState();
  const [windDirection, setWindDirection] = useState();
  const [pressure, setPressure] = useState();
  const [time, setTime] = useState();
  const [isDay, setIsDay] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      await fetch(
        `https://abdevel.meteo.pl/aW59mjFN8M/fcst?lat=${lat}&lon=${lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.forecasts);

          data.forecasts.hourly.slice(0, 23).map((day, index) => {
            let date = new Date().getHours();
            let date2 = new Date(day.dateTime).getHours();
            if (date === date2) {
              const maxTemp = Math.round(day.temperature);
              //const minTemp =  Math.round(day.temperature);
              const rain = Math.round(day.rain * 10) / 10;
              const wind = Math.round(day.windSpeed);
              const windDirection = day.windDirection;
              const pressure = Math.round(day.groundPressure);
              const snow = Math.round(day.snow * 10) / 10;
              setMaxTemp(maxTemp);
              //setMinTemp(minTemp);
              setRain(rain);
              setSnow(snow);
              setWind(wind);
              setWindDirection(windDirection);
              setPressure(pressure);
            }
          });
          setTime(
            new Date().toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setSunrise(
            new Date(data.forecasts.sun[0].sunrise).toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setSunset(
            new Date(data.forecasts.sun[0].sunset).toLocaleString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          time > sunrise && time < sunset ? setIsDay(true) : setIsDay(false);
        });
    };
    fetchAPI();
  }, [lat, lng]);

  return (
    <>
      <div className=" cursor-pointer border b-gray-400 rounded flex flex-col justify-center mt-6 mx-auto items-center text-center p-6 bg-white">
        <div className="text-md font-bold flex flex-col text-gray-900">
          <span className="uppercase">{query}</span>
          <span className="text-xs font-light">
            {sunrise} - {sunset}
          </span>
          {/* <span>
            {date.getHours()}:{date.getMinutes()}
          </span> */}
        </div>
        <div className="w-32 h-32 flex items-center justify-center">
          <WeatherIcon isDay={isDay} />
        </div>
        <p className="text-gray-700 mb-2">Aktualna prognoza</p>
        <div className="text-3xl font-bold text-gray-900 mb-6">
          {maxTemp ? maxTemp + "º" : "..."}
          {/* <span className="font-normal text-gray-700 mx-1">/</span>
          {minTemp ? minTemp + "º" : "..."} */}
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center text-gray-700 px-2">
            {snow ? (
              <WiSnowflakeCold size={24} color="#000" />
            ) : (
              <WiRaindrop size={24} color="#000" />
            )}
            {snow
              ? (snow + rain).toFixed(1)
              : snow > 0
              ? "..."
              : rain
              ? (rain + snow).toFixed(1)
              : rain > 0
              ? "..."
              : 0}{" "}
            mm/h
          </div>
          <div className="flex items-center text-gray-700 px-2">
            <WiBarometer size={24} color="#000" />
            {pressure ? pressure + " hPa" : "..."}
          </div>
          <div className="flex items-center text-gray-700 px-2">
            <WiWindDeg
              size={24}
              color="#000"
              style={{ transform: `rotate(${windDirection}deg)` }}
            />
            {wind ? wind + " km/h" : "..."}
          </div>
        </div>
      </div>
      <HourlyForecast data={data} />
    </>
  );
};

export default CurrentWeather;
