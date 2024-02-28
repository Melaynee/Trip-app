import axios, { AxiosError } from "axios";

export interface IWeatherData {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: IWeatherDay[];
}

export interface IWeatherDay {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: string | null;
  snow: number | null;
  snowdepth: number | null;
  windgust: number | null;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number | null;
  solarenergy: number | null;
  uvindex: number | null;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  source: string;
  normal: {
    tempmax: number[];
    tempmin: number[];
    feelslike: number[];
    precip: number[];
    humidity: number[];
    snowdepth: (number | null)[];
    windspeed: number[];
    windgust: (number | null)[];
    winddir: number[];
    cloudcover: number[];
  };
}

interface IWeatherProps {
  location: string;
  date1: string;
  date2: string;
}

const API_KEY = import.meta.env.VITE_REACT_APP_VISUAL_CROSSING_API_KEY;

const getWeather = async ({
  location,
  date1,
  date2,
}: IWeatherProps): Promise<IWeatherData> => {
  try {
    const { data } = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${API_KEY}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching weather data:", error.message);
    } else {
      console.error("Error fetching weather data:", error);
    }
    return Promise.reject(error);
  }
};

export default getWeather;
