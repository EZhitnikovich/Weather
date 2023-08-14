import axios from "axios";
import { apiKey } from "../constants";

type forecastEndpointProps = {
  cityName: string;
  days: number;
};

type locationsEndpointProps = {
  cityName: string;
};

const forecastEndpoint = (params: forecastEndpointProps) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = (params: locationsEndpointProps) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

export type location = {
  name: string;
  country: string;
};

export type Forecast = {
  location: location;
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          icon: string;
        };
      };
      astro: {
        sunrise: string;
      };
    }[];
  };
};

const apiCall = async <T>(endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request<T>(options);
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

export const fetchWeatherForecast = (params: forecastEndpointProps) => {
  return apiCall<Forecast>(forecastEndpoint(params));
};

export const fetchLocations = (params: locationsEndpointProps) => {
  return apiCall<location[]>(locationsEndpoint(params));
};
