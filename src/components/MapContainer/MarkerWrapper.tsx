import { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import MarkerPopupContent from "./MarkerPopupContent";
import { MarkerData } from "./MarkerData";
import Pin from "./Pin";

interface Props {
  marker: MarkerData;
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
          <MarkerPopupContent
            marker={marker}
            halfHourIndex={halfHourIndex}
            occupied={occupied}
          />
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
