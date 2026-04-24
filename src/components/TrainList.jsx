import { useState } from "react";
import TrainCard from "./TrainCard";
import { trains } from "../data/trains";

export default function TrainList() {
  const [search, setSearch] = useState("");

  const filtered = trains.filter(
    (t) =>
      t.route.toLowerCase().includes(search.toLowerCase()) ||
      t.number.includes(search)
  );

  return (
    <>
      <input
        placeholder="Пошук..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </>
  );
}