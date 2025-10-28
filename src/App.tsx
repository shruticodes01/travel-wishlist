import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import AVAILABLE_PLACES from "./data.ts";
import Header from "./components/Header";
import Modal from "./components/Modal.tsx";
import PlacesCollection from "./components/Places";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import { sortPlacesByDistance } from "./loc.ts";

type Place = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat: number;
  lon: number;
};

const storedIds =
  JSON.parse(localStorage.getItem("selectedPlaces") as string) || [];
const storedPlaces = storedIds.map((id: string) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

console.log(storedPlaces);

function App() {
  const selectedPlaceRef = useRef("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleAddPlacesToWishList(id: string) {
    setSelectedPlaces((prevSelectedPlaces: unknown[]) => {
      if (
        prevSelectedPlaces.some((place) => (place as { id: string }).id === id)
      ) {
        return prevSelectedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevSelectedPlaces];
    });

    const storedIds =
      JSON.parse(localStorage.getItem("selectedPlaces") as string) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
    console.log(storedIds);
  }

  function handleSelectToRemoveFromWishList(id: string) {
    setModalIsOpen(true);
    selectedPlaceRef.current = id;
  }

  function handleCancelRemovingPlaces() {
    setModalIsOpen(false);
  }

  const handleConfirmRemovingPlaces = useCallback(
    function handleConfirmRemovingPlaces() {
      setSelectedPlaces((prevSelectedPlaces: unknown[]) =>
        prevSelectedPlaces.filter(
          (place) => (place as { id: string }).id !== selectedPlaceRef.current
        )
      );

      setModalIsOpen(false);

      const storedIds =
        JSON.parse(localStorage.getItem("selectedPlaces") as string) || [];
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(
          storedIds.filter((id: string) => id !== selectedPlaceRef.current)
        )
      );
    },
    []
  );

  console.log(selectedPlaces);

  return (
    <>
      <Header />

      <Modal open={modalIsOpen} onClose={handleCancelRemovingPlaces}>
        <DeleteConfirmation
          onCancel={handleCancelRemovingPlaces}
          onConfirm={handleConfirmRemovingPlaces}
        />
      </Modal>

      <main>
        <PlacesCollection
          places={selectedPlaces}
          title="I'd like to visit..."
          fallbackText={"Select the places you would like to visit below."}
          onSelect={handleSelectToRemoveFromWishList}
        />
        <PlacesCollection
          places={availablePlaces}
          title="Available Places"
          fallbackText={"Sorting places by distance..."}
          onSelect={handleAddPlacesToWishList}
        />
      </main>
    </>
  );
}

export default App;
