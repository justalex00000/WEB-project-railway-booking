import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function BookingForm() {
  const navigate = useNavigate();
  const { selectedTrain, selectedWagon, selectedSeats, saveBooking } = useBooking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedWagon || selectedSeats.length === 0) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await saveBooking(formData);
      alert(`Бронювання успішне!\nПотяг: ${selectedTrain.number}\nВагон: ${selectedWagon.number}\nМісця: ${selectedSeats.join(", ")}`);
      navigate("/");
    } catch (error) {
      alert("Помилка при бронюванні. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 className="booking-form__title">Оформлення бронювання</h3>
      
      <div className="booking-form__info">
        <p>Потяг: {selectedTrain?.number} - {selectedTrain?.route}</p>
        <p>Вагон: {selectedWagon?.number} ({selectedWagon?.type})</p>
        <p>Обрані місця: {selectedSeats.join(", ")}</p>
        <p>До сплати: {selectedSeats.length * 250} грн</p>
      </div>

      <div className="form-group">
        <label className="form-label">Ім'я та прізвище</label>
        <input
          type="text"
          name="name"
          className={`form-input ${errors.name ? "form-input--error" : ""}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Іван Петренко"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className={`form-input ${errors.email ? "form-input--error" : ""}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="ivan@example.com"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Телефон</label>
        <input
          type="tel"
          name="phone"
          className={`form-input ${errors.phone ? "form-input--error" : ""}`}
          value={formData.phone}
          onChange={handleChange}
          placeholder="+380 99 123 4567"
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </div>

      <button 
        type="submit" 
        className="booking-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Бронювання..." : "Підтвердити бронювання"}
      </button>
    </form>
  );
}