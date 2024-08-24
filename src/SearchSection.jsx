import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { DestinationContext } from "./Context/DestinationContext";
import { SourceContext } from "./Context/SourceContext";

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext); // Fixed typo
const [distance, setDistance] = useState()
  useEffect(() => {
    console.log("Source:", source);
    console.log("Destination:", destination);
  }, [source, destination]);

  const calculateDistance = () => {
    const dist = window.google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );
    console.log("Distance:", );
    setDistance(dist*0.000621374)
  };

  return (
    <div className="p-2 md:p-5 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">Get a Ride</p>
      <InputItem type="source" />
      <InputItem type="destination" />
      <button
        className="p-3 bg-black w-full mt-5 text-white rounded-lg"
        onClick={calculateDistance}
      >
        Search
      </button>
    </div>
  );
}

export default SearchSection;
