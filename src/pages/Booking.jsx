import { useState } from "react";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  const [wagon, setWagon] = useState(null);

  return (
    <div>
      <WagonSelector setWagon={setWagon} />
      {wagon && <SeatMap />}
      {wagon && <BookingForm />}
    </div>
  );
}