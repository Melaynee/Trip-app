import cloudy from "/public/icons/cloudy.png";
import partiallyCloudy from "/public/icons/partially-cloudy.png";
import sunny from "/public/icons/sunny.png";
import rainy from "/public/icons/rainy.png";
import partiallyRainy from "/public/icons/partially-rainy.png";

interface WeatherIcons {
  [key: string]: string;
}

type GetWeatherIcon = (weather: string) => string;

export const weatherIcons: WeatherIcons = {
  "partly-cloudy-day": partiallyCloudy,
  "cloudy-day": cloudy,
  "sunny-day": sunny,
  rain: rainy,
  "partly-rainy-day": partiallyRainy,
};

export const getWeatherIcon: GetWeatherIcon = (weather) => {
  return weatherIcons[weather] || sunny;
};
