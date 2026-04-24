import { useState } from "react";
import TrainCard from "./TrainCard";
import { useBooking } from "../context/BookingContext";

export default function TrainList() {
  const { trains, loading } = useBooking();
  const [search, setSearch] = useState("");

  const filteredTrains = trains.filter(
    (train) =>
      train.route.toLowerCase().includes(search.toLowerCase()) ||
      train.number.includes(search)
  );

  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }

  return (
    <div className="train-list">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Пошук потягів за номером або маршрутом..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredTrains.length === 0 ? (
        <div className="no-results">Потягів не знайдено</div>
      ) : (
        <div className="train-list__grid">
          {filteredTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      )}
    </div>
  );
}