import Map from "react-map-gl";
import maplibreGl from "maplibre-gl";
import React, { useState } from "react";
import "./styles.css";
import "maplibre-gl/dist/maplibre-gl.css";
import MarkerWrapper from "./MarkerWrapper";
import { ParkingData } from "./ParkingData";
import * as turf from "@turf/turf";

interface Props {
  markers?: Array<ParkingData>;
  halfHourIndex: number;
  queryRadius: number;
}

function MapContainer({ markers, halfHourIndex, queryRadius }: Props) {
  const [lng] = useState(-79.9338);
  const [lat] = useState(40.4511);
  const [zoom] = useState(14);

  const circleData = turf.circle([lng, lat], queryRadius, {
    steps: 80,
    units: "meters",
  });

  return (
    <div className="map-wrapper">
      <Map
        mapLib={maplibreGl}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom,
        }}
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap Contributors",
              maxzoom: 19,
            },
            circleData: {
              type: "geojson",
              data: circleData,
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm", // This must match the source key above
            },
            {
              id: "circle-fill",
              type: "fill",
              source: "circleData",
              paint: {
                "fill-color": "yellow",
                "fill-opacity": 0.3,
              },
            },
          ],
        }}
      >
        {markers?.map((marker) => (
          <MarkerWrapper
            marker={marker}
            halfHourIndex={halfHourIndex}
            occupied={marker.parking[halfHourIndex] === 0}
          />
        ))}
      </Map>
    </div>
  );
}

export default MapContainer;
