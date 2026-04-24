import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <BookingContext.Provider
      value={{
        selectedTrain,
        setSelectedTrain,
        selectedSeats,
        setSelectedSeats,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);