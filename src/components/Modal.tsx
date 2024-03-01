import React, { useState } from "react";
import { Trip } from "../App";
import { cities } from "../tools/getCity";

const Modal = ({
  onClose,
  addTrip,
  saveTripsToLocalStorage,
  trips,
}: {
  onClose: () => void;
  addTrip: (trip: Trip) => void;
  saveTripsToLocalStorage: (trips: Trip[]) => void;
  trips: Trip[];
}) => {
  const [city, setCity] = useState("");
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [error, setError] = useState("");

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setError("");
  };

  const isFormValid = () => {
    if (!city || !firstDay || !lastDay) {
      setError("All fields are required");
      return false;
    }

    if (new Date(firstDay) >= new Date(lastDay)) {
      setError("End date must be after the start date");
      return false;
    }

    return true;
  };

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid()) {
      const newTrip: Trip = {
        city,
        firstDay,
        lastDay,
      };

      addTrip(newTrip);
      saveTripsToLocalStorage([...trips, newTrip]);

      setCity("");
      setFirstDay("");
      setLastDay("");
      setError("");

      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Create a Trip</h2>
        </div>
        <form>
          <label htmlFor="city">
            <span className="required">*</span> City
          </label>
          <select id="city" value={city} onChange={handleCityChange} required>
            <option value="" disabled>
              Please select a city
            </option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <label htmlFor="startDate">
            <span className="required">*</span> Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={firstDay}
            required
            min={currentDate.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            onChange={(e) => setFirstDay(e.target.value)}
          />
          <label htmlFor="endDate">
            <span className="required">*</span> End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={lastDay}
            required
            min={currentDate.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            onChange={(e) => setLastDay(e.target.value)}
            disabled={!firstDay}
          />
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="btn-group">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-add" onClick={handleAddTrip}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
