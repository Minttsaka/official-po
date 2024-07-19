import Axios from "axios";
import { key } from "./weatherKey";

interface ForecastResponse {
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

interface WeatherResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
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

export const FetchForecast = async (query: string): Promise<ForecastResponse | null> => {
  const Url = "https://api.openweathermap.org/data/2.5/forecast";
  try {
    const res = await Axios.get(Url, {
      params: {
        q: query,
        units: "metric",
        APPID: key
      }
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    
    return null;
  }
};

export const FetchWeatherApi = async (query: string): Promise<WeatherResponse | null> => {
  const Url = "https://api.openweathermap.org/data/2.5/weather";
  try {
    const res = await Axios.get(Url, {
      params: {
        q: query,
        units: 'metric',
        APPID: key
      }
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    
    return null;
  }
};
