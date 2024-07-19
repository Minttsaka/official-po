"use client";

import React, { useEffect, useState } from "react";
import { FetchWeatherApi, FetchForecast } from "@/lib/weather";
import moment from "moment";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface Weather {
  name: string;
  sys: {
    country: string | undefined;
    sunrise: number ;
    sunset: number ;
  };
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

interface Forecast {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
  }[];
}

export const Weather = () => {
  const [query, setQuery] = useState<string>("blantyre");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weather2, setWeather2] = useState<string[][]>([]);

  const search = async () => {
    const data = await FetchWeatherApi(query);
    setWeather(data);
    checkTime(data!);
    forecast();
    setQuery("");
  };

  useEffect(() => {
    search();
  }, []);

  function checkTime(weather: Weather) {
    let sunrise = weather.sys.sunrise;
    let sunset = weather.sys.sunset;
    if (
      moment.unix(sunrise).format("HHMM") < moment(new Date()).format("HHMM") &&
      moment(new Date()).format("HHMM") < moment.unix(sunset).format("HHMM")
    ) {
      document.querySelector(".main-container")?.classList.remove("sunset");
      document.querySelector(".main-container")?.classList.add("sunrise");
    } else {
      document.querySelector(".main-container")?.classList.remove("sunrise");
      document.querySelector(".main-container")?.classList.add("sunset");
    }
  }

  const forecast = async () => {
    const data = await FetchForecast(query);
    const forecastData: string[][] = [];
  
    for (let i = 0; i < (data?.list?.length ?? 0); i += 8) {
      let temp: string[] = [];
      const dt_txt = data?.list[i + 5]?.dt_txt;
      if (dt_txt) {
        let dt = new Date(dt_txt);
        temp.push(`${dt.getDate()}/${dt.getFullYear()}`);
      } else {
        temp.push(""); // Handle the case where dt_txt is undefined
      }
      temp.push(data?.list[i].weather[0].main ?? "");
      temp.push(data?.list[i + 3].weather[0].description ?? "");
      temp.push(
        `https://openweathermap.org/img/wn/${data?.list[i].weather[0].icon ?? ""}@2x.png`
      );
      temp.push(data?.list[i].main.temp.toString() ?? "");
      forecastData.push(temp);
    }
    setWeather2(forecastData);
  };
  

  const Foredata = weather2.map((item, i) => (
    <div key={i} className="text-center font-bold my-10">
      <div>{item[0]}</div>
      <div className="text-white">{item[1]}</div>
      <div className="text-white">
        {item[4]} <sup>&deg;C</sup>
      </div>
      <div>
        <img className="w-[50px] h-[50px]" src={item[3]} alt={item[1]} />
      </div>
    </div>
  ));

  return (
    <div className="relative text-white h-screen flex justify-center rounded-3xl my-10 items-center flex-col gap-5">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/d5scjfbjc/index_0nNrywa8ul.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="flex gap-1 items-center">
        <Input
          placeholder="Enter City..."
          type="text"
          className="text-center outline-none rounded-3xl w-fit text-black bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={search} className="rounded-full">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {weather && (
        <div className="flex items-center mb-[10px] justify-center flex-col p-[10px_8%] rounded-[20px] shadow-2xl">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup className="px-[0.6em] py-[0.2em] ml-[0.2em] rounded-[30px] text-white bg-[#ff8c00]">
              {weather.sys.country}
            </sup>
            <p>{moment().format("LT")}</p>
          </h2>
          <div className="text-[#1e2432]">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {weather2.length > 0 ? (
        <div className="flex w-4/5 h-[150px] justify-around text-center mx-auto">
          {Foredata}
        </div>
      ) : null}
    </div>
  );
};
