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

  useEffect(() => {
    loadTrains();
    loadInitialBookings();
  }, []);

  const loadTrains = async () => {
    setLoading(true);
    try {
      const response = await trainsApi.getAll();
      setTrains(response.data);
      console.log('Trains loaded:', response.data);
    } catch (error) {
      console.error('Error loading trains:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialBookings = () => {
    try {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      console.log('Loaded bookings from localStorage:', savedBookings);
    } catch (error) {
      console.error('Error loading bookings from localStorage:', error);
    }
  };

  const loadBookedSeats = async (trainId, wagonNumber) => {
    try {
      console.log(`Loading booked seats for train ${trainId}, wagon ${wagonNumber}`);
      
      const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      const trainBookings = localBookings.filter(
        booking => booking.trainId === trainId && booking.wagonNumber === wagonNumber
      );
      
      console.log('Found bookings:', trainBookings);
      
      const booked = trainBookings.flatMap(booking => booking.seats);
      
      try {
        const response = await bookingsApi.getByTrain(trainId);
        const serverBookings = response.data.filter(
          booking => booking.wagonNumber === wagonNumber
        );
        const serverBookedSeats = serverBookings.flatMap(booking => booking.seats);
        
        const allBookedSeats = [...new Set([...booked, ...serverBookedSeats])];
        console.log('Booked seats (combined):', allBookedSeats);
        setBookedSeats(allBookedSeats);
      } catch (error) {
        console.log('Using only localStorage for bookings');
        setBookedSeats(booked);
      }
    } catch (error) {
      console.error('Error loading booked seats:', error);
      setBookedSeats([]);
    }
  };

  const selectTrain = (train) => {
    console.log('Selected train:', train);
    setSelectedTrain(train);
    setSelectedWagon(null);
    setSelectedSeats([]);
    setBookedSeats([]);
  };

  const selectWagon = async (wagon) => {
    console.log('Selected wagon:', wagon);
    setSelectedWagon(wagon);
    setSelectedSeats([]);
    if (selectedTrain) {
      await loadBookedSeats(selectedTrain.id, wagon.number);
    }
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      console.log(`Seat ${seatNumber} is booked, cannot select`);
      return;
    }
    
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        console.log(`Removing seat ${seatNumber}`);
        return prev.filter(s => s !== seatNumber);
      } else {
        console.log(`Adding seat ${seatNumber}`);
        return [...prev, seatNumber];
      }
    });
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
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      savedBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(savedBookings));
      console.log('Booking saved to localStorage:', booking);
      
      try {
        await bookingsApi.create(booking);
        console.log('Booking also saved to json-server');
      } catch (error) {
        console.log('json-server not available, saved only to localStorage');
      }
      
      await loadBookedSeats(selectedTrain.id, selectedWagon.number);
      
      setSelectedSeats([]);
      
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