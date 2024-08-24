import React, { useState } from "react";
import GoogleMapSection from "./GoogleMapSection";
import SearchSection from "./SearchSection";
import { SourceContext } from "./Context/SourceContext";
import { DestinationContext } from "./Context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";
function Page() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript libraries={["places"]} googleMapsApiKey="AIzaSyA_V4J1t09TrGyClkuYzvENZvJoba15i2c">
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <SearchSection />
          </div>
          <div className="Col-span-2">
            <GoogleMapSection />
          </div>
        </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}

export default Page;
