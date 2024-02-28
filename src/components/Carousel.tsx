import React, { useState, useRef } from "react";
import { Trip } from "../App";
import CityCard from "./CityCard";
import { WeatherData } from "./Main";

interface CarouselProps {
  trips: Trip[];
  onTripSelect: (trip: Trip) => void;
  weatherData: WeatherData;
}

const ITEM_WIDTH = 200;

const Carousel: React.FC<CarouselProps> = ({
  trips,
  onTripSelect,
  weatherData,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollAmount: number) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    const containerWidth = containerRef.current!.scrollWidth;
    const maxScrollPosition =
      containerWidth - containerRef.current!.clientWidth;

    if (newScrollPosition > maxScrollPosition) {
      setScrollPosition(maxScrollPosition);
      containerRef.current!.scrollLeft = maxScrollPosition;
    } else if (newScrollPosition < 0) {
      setScrollPosition(0);
      containerRef.current!.scrollLeft = 0;
    } else {
      setScrollPosition(newScrollPosition);
      containerRef.current!.scrollLeft = newScrollPosition;
    }
  };

  return (
    <div className="flex-col city-cards-grid">
      <div ref={containerRef} className="container">
        <div className="content-box">
          {trips.length > 0 &&
            trips.map((trip) => {
              return (
                <CityCard
                  key={trip.city}
                  city={trip.city}
                  firstDay={trip.firstDay}
                  lastDay={trip.lastDay}
                  onClick={() => onTripSelect(trip)}
                  style={{
                    border:
                      weatherData.address === trip.city
                        ? "2px solid #99CEFF"
                        : "2px solid transparent",
                  }}
                />
              );
            })}
        </div>
      </div>
      <div className="action-btns">
        <button onClick={() => handleScroll(-ITEM_WIDTH)}>Previous</button>
        <button onClick={() => handleScroll(ITEM_WIDTH)}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;
