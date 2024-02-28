import React, { useEffect, useState } from "react";
import AddTrip from "./AddTrip";
import DayCard from "./DayCard";
import Modal from "./Modal";
import { Trip } from "../App";
import getWeather, { IWeatherData } from "../tools/getWeather";
import Carousel from "./Carousel";
export interface WeatherData {
  address: string;
  days: Day[];
}

export interface Day {
  datetime: string;
  datetimeEpoch: number;
  conditions: string;
  tempmax: number;
  tempmin: number;
  icon: string;
}

interface MainProps {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  saveTripsToLocalStorage: (trips: Trip[]) => void;
  weatherData: WeatherData;
  setWeatherData: (data: IWeatherData) => void;
}

const Main: React.FC<MainProps> = ({
  trips,
  addTrip,
  saveTripsToLocalStorage,
  weatherData,
  setWeatherData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortedFilteredTrips, setSortedFilteredTrips] = useState<Trip[]>([]);

  const { days } = weatherData;

  useEffect(() => {
    const filteredTrips = trips.filter((trip) =>
      trip.city.toLowerCase().includes(query.toLowerCase())
    );

    const sortedTrips = filteredTrips.slice().sort((a, b) => {
      const dateA = new Date(a.firstDay).getTime();
      const dateB = new Date(b.firstDay).getTime();
      return dateA - dateB;
    });

    setSortedFilteredTrips(sortedTrips);
  }, [trips, query]);

  const handleTripSelect = (trip: Trip) => {
    getWeather({
      location: trip.city,
      date1: trip.firstDay,
      date2: trip.lastDay,
    }).then((data: IWeatherData) => {
      setWeatherData(data);
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="main">
      <h4>
        Weather <b>Forecast</b>
      </h4>
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          addTrip={addTrip}
          saveTripsToLocalStorage={saveTripsToLocalStorage}
          trips={trips}
        />
      )}
      <form className="search">
        <input
          type="search"
          name="search-trip"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your trip"
        />
      </form>
      <div className="trip-cards">
        <Carousel
          weatherData={weatherData}
          trips={sortedFilteredTrips}
          onTripSelect={handleTripSelect}
        />
        <AddTrip onClick={toggleModal} />
      </div>
      <div>
        <h5>Week</h5>
        <div className="flex gap day-cards-grid">
          {days?.map((day) => (
            <DayCard key={day.datetimeEpoch} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
