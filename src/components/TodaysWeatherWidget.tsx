import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWeatherIcon } from "../tools/getWeatherIcon";
import AuthButton from "./AuthButton";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TodaysWeatherWidget = ({
  selectedCity,
  firstDay,
}: {
  selectedCity: string;
  firstDay: string;
}) => {
  const [data, setData] = useState(Object);
  const [date, setDate] = useState(new Date());
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedCity}/today?unitGroup=metric&key=TV4BXKE65Y662AWZMBVKEF7QS`
      );
      setData(data);
      setDate(new Date(data.days[0].datetime));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [selectedCity]);

  const calculateCountdown = useCallback(() => {
    const today = new Date();
    const targetDate = new Date(firstDay);
    const timeDiff = targetDate.getTime() - today.getTime();

    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesRemaining = Math.floor(
      (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

    setCountdown({
      days: daysRemaining,
      hours: hoursRemaining,
      minutes: minutesRemaining,
      seconds: secondsRemaining,
    });
  }, [firstDay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timerInterval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timerInterval);
  }, [calculateCountdown]);

  const weatherIcon = useMemo(
    () => getWeatherIcon(data.currentConditions?.icon),
    [data.currentConditions?.icon]
  );

  return (
    data.currentConditions && (
      <div className="todays-weather">
        <div className="todays-weather-header">
          <h3>{days[date.getDay()]}</h3>
          <div className="todays-weather-temp">
            <img src={weatherIcon} alt="" />
            {data.currentConditions.temp.toFixed(0)}
            <span>°C</span>
          </div>
          <h5>{selectedCity}</h5>
        </div>
        <div className="todays-weather-count">
          <div>
            <h4>{countdown.days}</h4>
            <p>DAYS</p>
          </div>
          <div>
            <h4>{countdown.hours}</h4>
            <p>HOURS</p>
          </div>
          <div>
            <h4>{countdown.minutes}</h4>
            <p>MINUTES</p>
          </div>
          <div>
            <h4>{countdown.seconds}</h4>
            <p>SECONDS</p>
          </div>
        </div>
        <div className="todays-weather-background">
          <img
            src={weatherIcon}
            alt={data.currentConditions}
            className="first"
          />
          <img
            src={weatherIcon}
            alt={data.currentConditions}
            className="second"
          />
          <img
            src={weatherIcon}
            alt={data.currentConditions}
            className="third"
          />
          <img
            src={weatherIcon}
            alt={data.currentConditions}
            className="fourth"
          />
        </div>
        <AuthButton />
      </div>
    )
  );
};

export default TodaysWeatherWidget;
