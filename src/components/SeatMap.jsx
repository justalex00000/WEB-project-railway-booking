import { useBooking } from "../context/BookingContext";

export default function SeatMap() {
  const { selectedWagon, selectedSeats, bookedSeats, toggleSeat } = useBooking();

  if (!selectedWagon) return null;

  const totalSeats = selectedWagon.seats;

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return "booked";
    if (selectedSeats.includes(seatNumber)) return "selected";
    return "free";
  };

  const handleSeatClick = (seatNumber) => {
    // Перевіряємо чи місце не заброньоване перед викликом toggleSeat
    if (!bookedSeats.includes(seatNumber)) {
      toggleSeat(seatNumber);
    }
  };

  return (
    <div className="seat-map">
      <h3 className="seat-map__title">
        Схема вагону {selectedWagon.number} ({selectedWagon.type})
      </h3>
      
      <div className="seat-map__legend">
        <div className="legend-item">
          <div className="legend-color legend-color--free"></div>
          <span>Вільні</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color--selected"></div>
          <span>Обрані</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color--booked"></div>
          <span>Заброньовані</span>
        </div>
      </div>

      <div className="seat-map__grid">
        {[...Array(totalSeats)].map((_, i) => {
          const seatNumber = i + 1;
          const status = getSeatStatus(seatNumber);
          
          return (
            <button
              key={seatNumber}
              className={`seat seat--${status}`}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={status === "booked"}
              title={status === "booked" ? "Це місце вже заброньоване" : `Місце ${seatNumber}`}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>
      
      {selectedSeats.length > 0 && (
        <div className="seat-map__info">
          Обрано місць: {selectedSeats.length}
        </div>
      )}
      
      {bookedSeats.length > 0 && (
        <div className="seat-map__info seat-map__info--booked">
          Заброньовано місць: {bookedSeats.length}
        </div>
      )}
    </div>
  );
}