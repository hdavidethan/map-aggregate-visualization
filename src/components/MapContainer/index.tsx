import Map, { Layer, MapRef, Source } from "react-map-gl";
import maplibreGl, { MapLayerMouseEvent } from "maplibre-gl";
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
  const mapRef = React.useRef<MapRef>(null);

  const [queryConfiguration, _setQueryType, _setQueryParam, setQueryParams] =
    useQueryConfiguration();
  const [lng] = useState(-79.9338);
  const [lat] = useState(40.4511);
  const [zoom] = useState(14);
  const [radiusHover, setRadiusHover] = useState(false);

  const circleLat: number = (queryConfiguration.parameters.lat as number) ?? 0;
  const circleLng: number = (queryConfiguration.parameters.lng as number) ?? 0;
  const cirlceRadius: number =
    (queryConfiguration.parameters.radius as number) ?? 0;

  const circleData = turf.circle([circleLng, circleLat], cirlceRadius, {
    steps: 80,
    units: "meters",
  });

  const osmSource: mapboxgl.AnySourceData = {
    type: "raster",
    tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
    tileSize: 256,
    attribution: "&copy; OpenStreetMap Contributors",
    maxzoom: 19,
  };

  const radiusSource: mapboxgl.AnySourceData = {
    type: "geojson",
    data: circleData,
  };

  const osmLayer: mapboxgl.AnyLayer = {
    id: "osm",
    type: "raster",
    source: "osm",
  };

  const radiusLayer: mapboxgl.AnyLayer = {
    id: "circle-fill",
    type: "fill",
    source: "circleData",
    paint: {
      "fill-color": "yellow",
      "fill-opacity": radiusHover ? 0.5 : 0.3,
    },
  };
  const showRadius = queryConfiguration.parameters.radius !== undefined;

  const onMapLoad = React.useCallback(() => {
    const canvas = mapRef.current?.getCanvasContainer();

    function onMove(e: MapLayerMouseEvent) {
      const coords = e.lngLat;

      // Set a UI indicator for dragging.
      if (canvas) {
        canvas.style.cursor = "grabbing";
      }

      setQueryParams([
        ["lat", coords.lat],
        ["lng", coords.lng],
      ]);
    }

    function onUp() {
      if (canvas) {
        canvas.style.cursor = "move";
      }

      // Unbind mouse/touch events
      mapRef.current?.off("mousemove", onMove);
      mapRef.current?.off("touchmove", onMove);
    }

    mapRef.current?.on("mouseenter", "circle-fill", () => {
      setRadiusHover(true);
      if (canvas) {
        canvas.style.cursor = "move";
      }
    });

    mapRef.current?.on("mouseleave", "circle-fill", () => {
      setRadiusHover(false);
      if (canvas) {
        canvas.style.cursor = "";
      }
    });

    mapRef.current?.on("touchstart", "point", (e) => {
      if (e.points.length !== 1) return;

      // Prevent the default map drag behavior.
      e.preventDefault();

      mapRef.current?.on("touchmove", onMove);
      mapRef.current?.once("touchend", onUp);
    });

    mapRef.current?.on("mousedown", "circle-fill", (e) => {
      // Prevent the default map drag behavior.
      e.preventDefault();

      if (canvas) {
        canvas.style.cursor = "grab";
      }

      mapRef.current?.on("mousemove", onMove);
      mapRef.current?.once("mouseup", onUp);
    });
  }, [setQueryParams]);

  return (
    <div className="map-wrapper">
      <Map
        mapLib={maplibreGl}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom,
        }}
        ref={mapRef}
        onLoad={onMapLoad}
      >
        {markers?.map((marker) => (
          <MarkerWrapper
            key={`${marker.lat},${marker.lng}`}
            marker={marker}
            halfHourIndex={halfHourIndex}
            occupied={marker.parking[halfHourIndex] === 0}
          />
        ))}
        <Source id="osm" {...osmSource}>
          <Layer {...osmLayer} />
        </Source>
        {showRadius && (
          <Source id="circleData" {...radiusSource}>
            <Layer {...radiusLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}

export default MapContainer;
