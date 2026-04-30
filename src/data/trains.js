export const trainsData = [
  {
    id: "1",
    number: "IC101",
    route: "Львів - Київ",
    time: "08:00",
    duration: "5 год",
    wagons: [
      { id: "1-1", number: 1, type: "Плацкарт", seats: 40 },
      { id: "1-2", number: 2, type: "Купе", seats: 36 },
      { id: "1-3", number: 3, type: "Люкс", seats: 18 }
    ]
  },
  {
    id: "2",
    number: "IC202",
    route: "Київ - Харків",
    time: "12:00",
    duration: "4 год",
    wagons: [
      { id: "2-1", number: 1, type: "Плацкарт", seats: 40 },
      { id: "2-2", number: 2, type: "Купе", seats: 36 }
    ]
  },
  {
    id: "3",
    number: "IC303",
    route: "Одеса - Львів",
    time: "15:30",
    duration: "6 год",
    wagons: [
      { id: "3-1", number: 1, type: "Плацкарт", seats: 40 },
      { id: "3-2", number: 2, type: "Купе", seats: 36 },
      { id: "3-3", number: 3, type: "Плацкарт", seats: 40 }
    ]
  },
  {
    id: "4",
    number: "IC404",
    route: "Харків - Дніпро",
    time: "09:45",
    duration: "3 год",
    wagons: [
      { id: "4-1", number: 1, type: "Купе", seats: 36 },
      { id: "4-2", number: 2, type: "Плацкарт", seats: 40 }
    ]
  }
];

export const getTrainById = (id) => trainsData.find(train => train.id === id);
export const getWagonsByTrainId = (trainId) => {
  const train = getTrainById(trainId);
  return train ? train.wagons : [];
};