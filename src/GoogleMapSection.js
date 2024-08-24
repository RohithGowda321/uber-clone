import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayViewF,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SourceContext } from "./Context/SourceContext";
import { DestinationContext } from "./Context/DestinationContext";

function GoogleMapSection() {
  const containerStyle = {
    width: "100vw",
    height: "100vh", // Adjusted for responsiveness
  };

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [map, setMap] = useState(null);
  const [directionRoutePoint, setDirectionRoutePoint] = useState(null);

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA_V4J1t09TrGyClkuYzvENZvJoba15i2c",
  });

  const isValidLatLng = (coords) => {
    return (
      coords && typeof coords.lat === "number" && typeof coords.lng === "number"
    );
  };

  useEffect(() => {
    if (source && isValidLatLng(source) && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if (isValidLatLng(source) && isValidLatLng(destination)) {
      directionRoute();
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && isValidLatLng(destination) && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if (isValidLatLng(source) && isValidLatLng(destination)) {
      directionRoute();
    }
  }, [destination, map]);

  const directionRoute = () => {
    if (
      !source ||
      !destination ||
      !window.google ||
      !isValidLatLng(source) ||
      !isValidLatLng(destination)
    )
      return;

    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoint(result);
        } else {
          console.error("Error loading route:", status);
        }
      }
    );
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {source && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/dot-small.svg",
            scaledSize: {
              width: 20,
              height: 20,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}
      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/dest.png",
            scaledSize: {
              width: 20,
              height: 20,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}
      {directionRoutePoint && (
        <DirectionsRenderer directions={directionRoutePoint} />
      )}
      <DirectionsRenderer
        directions={directionRoutePoint}
        options={{
          polylineOptions: {
            strokeColor: "#000",
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default GoogleMapSection;
