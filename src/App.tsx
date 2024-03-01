import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import TodaysWeatherWidget from "./components/TodaysWeatherWidget";
import getWeather, { IWeatherData } from "./tools/getWeather";
import LoadingSkeleton from "./components/LoadingSkeleton";

export interface Trip {
  city: string;
  firstDay: string;
  lastDay: string;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cachedData = localStorage.getItem("trips");

        if (cachedData) {
          const parsedTrips: Trip[] = JSON.parse(cachedData);
          setTrips(parsedTrips);

          if (parsedTrips.length > 0) {
            const data = await getWeather({
              location: parsedTrips[0].city,
              date1: parsedTrips[0].firstDay,
              date2: parsedTrips[0].lastDay,
            });

            if (data) {
              setWeatherData(data);
            }
          }
        } else {
          const data = await getWeather({
            location: "Tokyo",
            date1: "2024-03-24",
            date2: "2024-03-31",
          });

          if (data) {
            setTrips([
              { city: "Tokyo", firstDay: "2024-03-24", lastDay: "2024-03-31" },
            ]);
            setWeatherData(data);
          }
        }

        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(
          "Failed to fetch weather data. Please try again later." +
            " " +
            error.response.status +
            " " +
            error.response.data
        );
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    }
  }, [weatherData]);

  const addTrip = (trip: Trip) => {
    setTrips((prevTrips) => [...prevTrips, trip]);
  };

  const saveTripsToLocalStorage = (trips: Trip[]) => {
    localStorage.setItem("trips", JSON.stringify(trips));
  };

  return (
    <div className="App">
      {loading && <LoadingSkeleton />}
      {error && <p style={{ maxWidth: "500px", margin: "0 auto" }}>{error}</p>}
      {weatherData && (
        <>
          <div className="main">
            <Main
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              trips={trips}
              addTrip={addTrip}
              saveTripsToLocalStorage={saveTripsToLocalStorage}
            />
          </div>
          <div className="sidebar">
            <TodaysWeatherWidget
              selectedCity={weatherData.address}
              firstDay={weatherData.days[0].datetime}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
