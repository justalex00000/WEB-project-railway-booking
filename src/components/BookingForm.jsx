import { useState } from "react";
import { useBooking } from "../context/BookingContext";

export default function BookingForm() {
  const { selectedSeats } = useBooking();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name || selectedSeats.length === 0) {
      alert("Заповни всі поля");
      return;
    }

    const booking = { name, seats: selectedSeats };

    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    saved.push(booking);
    localStorage.setItem("bookings", JSON.stringify(saved));

    alert("Заброньовано!");
  };

  return (
    <div>
      <input
        placeholder="Ім'я"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Забронювати</button>
    </div>
  );
}