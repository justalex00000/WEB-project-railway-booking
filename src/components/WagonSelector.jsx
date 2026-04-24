import { useBooking } from "../context/BookingContext";

export default function WagonSelector() {
  const { selectedTrain, selectedWagon, selectWagon } = useBooking();

  if (!selectedTrain) return null;

  return (
    <div className="wagon-selector">
      <h3 className="wagon-selector__title">Оберіть вагон</h3>
      <div className="wagon-selector__list">
        {selectedTrain.wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`wagon-selector__button ${
              selectedWagon?.number === wagon.number ? "wagon-selector__button--active" : ""
            }`}
            onClick={() => selectWagon(wagon)}
          >
            <span className="wagon-selector__number">Вагон {wagon.number}</span>
            <span className="wagon-selector__type">{wagon.type}</span>
            <span className="wagon-selector__seats">({wagon.seats} місць)</span>
          </button>
        ))}
      </div>
    </div>
  );
}