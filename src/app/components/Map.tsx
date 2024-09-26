"use client";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

// TypeScript types
interface LatLng {
  lat: number;
  lng: number;
}

const Map = () => {
  // Load Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div>Loading....</div>;

  // Example: Fixed coordinates for a specific location
  const fixedLocation: LatLng = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco

  // Map options to remove unnecessary UI elements
  const mapOptions = {
    disableDefaultUI: true, // Disable all default UI controls
    zoomControl: true, // Enable zoom control if needed
  };

  return (
    <div
      className="flex justify-center items-center w-[380px] h-[200px] 3xl:w-[285px] 3xl:h-[130px] 4xl:w-[320px] 4xl:h-[140px] relative left-[3rem] 3xl:left-[2rem] 4xl:left-[2rem] "
    >
      {/* Map component */}
      <GoogleMap
        zoom={12} // Adjust zoom level as needed
        center={fixedLocation}
        options={mapOptions} // Disable unwanted UI elements
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {/* Marker for the fixed location */}
        <Marker position={fixedLocation} />
      </GoogleMap>
    </div>
  );
};

export default Map;
