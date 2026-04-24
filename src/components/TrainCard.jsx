import { Link } from "react-router-dom";

export default function TrainCard({ train }) {
  return (
    <div className="card">
      <h3>{train.number}</h3>
      <p>{train.route}</p>
      <p>{train.time}</p>
      <p>{train.duration}</p>

      <Link to={`/booking/${train.id}`}>
        <button>Обрати</button>
      </Link>
    </div>
  );
}