import { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import MarkerPopupContent from "./MarkerPopupContent";
import { MarkerData } from "./MarkerData";
import Pin from "./Pin";

interface Props {
  marker: MarkerData;
  halfHourIndex: number;
  muted: boolean;
}

function MarkerWrapper({ marker, halfHourIndex, muted }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const occupied = marker.parking[halfHourIndex] === 0;
  return (
    <>
      {isOpen && (
        <Popup
          longitude={marker.lng}
          latitude={marker.lat}
          anchor="top"
          onClose={() => setIsOpen(false)}
          maxWidth="500px"
        >
          <div style={{ maxHeight: "250px", overflowY: "scroll" }}>
            <MarkerPopupContent marker={marker} halfHourIndex={halfHourIndex} />
          </div>
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
