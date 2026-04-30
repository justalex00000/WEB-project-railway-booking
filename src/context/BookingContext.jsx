import { createContext, useContext, useState, useEffect } from 'react';
import { trainsApi, bookingsApi } from '../services/BookingService';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seatsLoading, setSeatsLoading] = useState(false);

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    setLoading(true);
    try {
      const response = await trainsApi.getAll();
      setTrains(response.data);
    } catch (error) {
      console.error('Error loading trains:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBookedSeatsSync = (trainId, wagonNumber) => {
    try {
      const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const trainBookings = localBookings.filter(
        booking => booking.trainId === trainId && booking.wagonNumber === wagonNumber
      );
      const booked = trainBookings.flatMap(booking => booking.seats);
      return booked;
    } catch (error) {
      console.error('Error loading booked seats:', error);
      return [];
    }
  };

  const selectTrain = (train) => {
    setSelectedTrain(train);
    setSelectedWagon(null);
    setSelectedSeats([]);
    setBookedSeats([]);
  };

  const selectWagon = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
    
    if (selectedTrain) {
      const booked = loadBookedSeatsSync(selectedTrain.id, wagon.number);
      setBookedSeats(booked);
    }
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }
    
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const saveBooking = (userData) => {
    if (!userData.name || selectedSeats.length === 0) {
      throw new Error('Будь ласка, заповніть всі поля');
    }

    const booking = {
      id: Date.now().toString(),
      trainId: selectedTrain.id,
      trainNumber: selectedTrain.number,
      wagonNumber: selectedWagon.number,
      seats: selectedSeats,
      passengerName: userData.name,
      passengerEmail: userData.email,
      passengerPhone: userData.phone,
      bookingDate: new Date().toISOString(),
    };

    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    savedBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(savedBookings));
    
    const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    setBookedSeats(updatedBookedSeats);
    
    setSelectedSeats([]);
    
    return booking;
  };

  const value = {
    trains,
    selectedTrain,
    selectedWagon,
    selectedSeats,
    bookedSeats,
    loading,
    seatsLoading,
    selectTrain,
    selectWagon,
    toggleSeat,
    saveBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};