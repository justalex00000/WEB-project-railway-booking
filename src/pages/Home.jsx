import TrainList from "../components/TrainList";

export default function Home() {
  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>
        Система бронювання квитків
      </h1>
      <TrainList />
    </div>
  );
}