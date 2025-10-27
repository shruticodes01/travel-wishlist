import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import AVAILABLE_PLACES from "./data.ts";
import Header from "./components/Header";
import Modal from "./components/Modal.tsx";
import PlacesCollection from "./components/Places";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import { sortPlacesByDistance } from "./loc.ts";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedPlaceRef = useRef("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
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
    setSelectedPlaces((prevSelectedPlaces: []) => {
      if (prevSelectedPlaces.some((place) => place.id === id)) {
        return prevSelectedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevSelectedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
    console.log(storedIds);
  }

  function handleSelectToRemoveFromWishList(id) {
    setModalIsOpen(true);
    selectedPlaceRef.current = id;
  }

  function handleCancelRemovingPlaces() {
    setModalIsOpen(false);
  }

  const handleConfirmRemovingPlaces = useCallback(
    function handleConfirmRemovingPlaces() {
      setSelectedPlaces((prevSelectedPlaces: []) =>
        prevSelectedPlaces.filter(
          (place) => place.id !== selectedPlaceRef.current
        )
      );

      setModalIsOpen(false);

      const storedIds =
        JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(
          storedIds.filter((id) => id !== selectedPlaceRef.current)
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
