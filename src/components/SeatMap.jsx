import { useBooking } from "../context/BookingContext";

export default function SeatMap() {
  const { selectedSeats, setSelectedSeats } = useBooking();

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="seats">
      {[...Array(20)].map((_, i) => {
        const seat = i + 1;
        return (
          <button
            key={seat}
            className={
              selectedSeats.includes(seat) ? "selected" : "free"
            }
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
}