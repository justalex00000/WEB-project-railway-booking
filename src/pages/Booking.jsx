import { useParams, Navigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  const { id } = useParams();
  const { selectedTrain, trains } = useBooking();
  
  // Перевірка, чи обраний потяг відповідає ID з URL
  if (!selectedTrain && trains.length > 0) {
    const trainFromUrl = trains.find(t => t.id === id);
    if (!trainFromUrl) {
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>
        Бронювання квитків
      </h1>
      <WagonSelector />
      <SeatMap />
      <BookingForm />
    </div>
  );
}