import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { DestinationContext } from "./Context/DestinationContext";
import { SourceContext } from "./Context/SourceContext";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext); // Fixed typo

  useEffect(() => {
    setPlaceholder(type === "source" ? "Pickup Location" : "Dropoff Location");
  }, [type]);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place.geometry &&
        place.geometry.location
      ) {
        const latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(), // Corrected `Ing` to `lng`
          name: place.formatted_address,
          label: place.name,
        };

        if (type === "source") {
          console.log("Setting source:", latLng);
          setSource(latLng);
        } else {
          console.log("Setting destination:", latLng);
          setDestination(latLng);
        }
      } else {
        console.error("Failed to get place details:", status);
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <img
        src={type === "source" ? "/dot-small.svg" : "/dest.png"}
        width={25}
        height={25}
        alt={type === "source" ? "Source Icon" : "Destination Icon"}
      />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder,
          isClearable: true,
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }),
            input: (provided) => ({
              ...provided,
              color: "#000",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#9CA3AF",
            }),
          },
        }}
        className="w-full"
        components={{ DropdownIndicator: null }}
      />
    </div>
  );
}

export default InputItem;
