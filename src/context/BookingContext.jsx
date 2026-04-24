import { createContext, useContext, useState, useEffect } from 'react';
import { trainsApi, bookingsApi } from '../services/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const loadBookedSeats = async (trainId, wagonNumber) => {
    try {
      const response = await bookingsApi.getByTrain(trainId);
      const trainBookings = response.data.filter(
        booking => booking.trainId === trainId && booking.wagonNumber === wagonNumber
      );
      const booked = trainBookings.flatMap(booking => booking.seats);
      setBookedSeats(booked);
    } catch (error) {
      console.error('Error loading booked seats:', error);
    }
  };

  const selectTrain = (train) => {
    setSelectedTrain(train);
    setSelectedWagon(null);
    setSelectedSeats([]);
    setBookedSeats([]);
  };

  const selectWagon = async (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
    if (selectedTrain) {
      await loadBookedSeats(selectedTrain.id, wagon.number);
    }
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const saveBooking = async (userData) => {
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

    try {
      await bookingsApi.create(booking);
      
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      savedBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(savedBookings));
      
      return booking;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  };

  const value = {
    trains,
    selectedTrain,
    selectedWagon,
    selectedSeats,
    bookedSeats,
    loading,
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