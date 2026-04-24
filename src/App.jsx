import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}