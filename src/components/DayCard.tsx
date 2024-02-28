import { getWeatherIcon } from "../tools/getWeatherIcon";
import { Day } from "./Main";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DayCard = ({ day }: { day: Day }) => {
  const convertTemp = (temp: number) => {
    return ((parseFloat(temp.toString()) - 32) / 1.8).toFixed(0);
  };

  const maxTemp = convertTemp(day.tempmax);
  const minTemp = convertTemp(day.tempmin);
  const currentDay = new Date(day.datetime);

  return (
    <div className="day-card">
      <h6>{days[currentDay.getDay()]}</h6>
      <img src={getWeatherIcon(day.icon)} alt={day.conditions} />
      <p>
        {maxTemp}°/{minTemp}°
      </p>
    </div>
  );
};

export default DayCard;
