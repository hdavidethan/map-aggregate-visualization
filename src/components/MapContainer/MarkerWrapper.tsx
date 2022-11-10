import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { halfHourToTimeString } from "../../util/halfHourUtils";
import { ParkingData } from "./ParkingData";
import Pin from "./Pin";

interface Props {
  marker: ParkingData;
  halfHourIndex: number;
  occupied: boolean;
  muted: boolean;
}

function MarkerWrapper({ marker, halfHourIndex, occupied, muted }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <Popup
          longitude={marker.lng}
          latitude={marker.lat}
          anchor="top"
          onClose={() => setIsOpen(false)}
        >
          <p className="my-0">Latitude: {marker.lat}</p>
          <p className="my-0">Longitude: {marker.lng}</p>
          <p className="my-0">Time: {halfHourToTimeString(halfHourIndex)}</p>
          <p className="my-0">
            Parking Status: {occupied ? "Occupied" : "Vacant"}
          </p>
        </Popup>
      )}
      <Marker
        longitude={marker.lng}
        latitude={marker.lat}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setIsOpen(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <Pin occupied={occupied} muted={muted} />
      </Marker>
    </>
  );
}

export default MarkerWrapper;
