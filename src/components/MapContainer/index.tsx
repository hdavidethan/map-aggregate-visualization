import Map from "react-map-gl";
import maplibreGl from "maplibre-gl";
import React, { useState } from "react";
import "./styles.css";
import "maplibre-gl/dist/maplibre-gl.css";
import MarkerWrapper from "./MarkerWrapper";
import { ParkingData } from "./ParkingData";
import * as turf from "@turf/turf";
import { useQueryConfiguration } from "../../atoms/queryConfigurationAtom";
import mapboxgl from "mapbox-gl";

interface Props {
  markers?: Array<ParkingData>;
  halfHourIndex: number;
}

function MapContainer({ markers, halfHourIndex }: Props) {
  const [queryConfiguration] = useQueryConfiguration();
  const [lng] = useState(-79.9338);
  const [lat] = useState(40.4511);
  const [zoom] = useState(14);

  const circleLat: number = (queryConfiguration.parameters.lat as number) ?? 0;
  const circleLng: number = (queryConfiguration.parameters.lng as number) ?? 0;
  const cirlceRadius: number =
    (queryConfiguration.parameters.radius as number) ?? 0;

  const circleData = turf.circle([circleLng, circleLat], cirlceRadius, {
    steps: 80,
    units: "meters",
  });

  const mapSources: mapboxgl.Sources = {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  };

  const mapLayers: mapboxgl.AnyLayer[] = [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ];

  if (queryConfiguration.parameters.radius !== undefined) {
    mapSources.circleData = {
      type: "geojson",
      data: circleData,
    };
    mapLayers.push({
      id: "circle-fill",
      type: "fill",
      source: "circleData",
      paint: {
        "fill-color": "yellow",
        "fill-opacity": 0.3,
      },
    });
  }

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
          sources: mapSources,
          layers: mapLayers,
        }}
      >
        {markers?.map((marker) => (
          <MarkerWrapper
            key={`${marker.lat},${marker.lng}`}
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
