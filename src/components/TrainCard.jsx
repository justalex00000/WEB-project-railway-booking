import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function TrainCard({ train }) {
  const { selectTrain } = useBooking();

  const handleSelect = () => {
    selectTrain(train);
  };

  return (
    <div className="train-card">
      <div className="train-card__header">
        <h3 className="train-card__number">Потяг {train.number}</h3>
        <span className="train-card__type">Інтерсіті</span>
      </div>
      
      <div className="train-card__route">
        <span className="train-card__route-text">{train.route}</span>
      </div>
      
      <div className="train-card__info">
        <div className="train-card__time">
          <span>🕐 {train.time}</span>
        </div>
        <div className="train-card__duration">
          <span>⏱️ {train.duration}</span>
        </div>
      </div>

      <Link to={`/booking/${train.id}`} className="train-card__link">
        <button onClick={handleSelect} className="train-card__button">
          Обрати потяг
        </button>
      </Link>
    </div>
  );
}