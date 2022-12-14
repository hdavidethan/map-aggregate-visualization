import Map, { Layer, MapRef, Source } from "react-map-gl";
import maplibreGl, { MapLayerMouseEvent } from "maplibre-gl";
import React, { useState } from "react";
import "./styles.css";
import "maplibre-gl/dist/maplibre-gl.css";
import MarkerWrapper from "./MarkerWrapper";
import { MarkerData } from "./MarkerData";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setParameterValue } from "../../features/queryConfiguration/queryConfigurationSlice";
import { getMapCenter } from "../../util/mapConfig";

interface Props {
  markers?: Array<MarkerData>;
  halfHourIndex: number;
}

function MapContainer({ markers, halfHourIndex }: Props) {
  const mapRef = React.useRef<MapRef>(null);

  const { queryConfiguration, lambdaData } = useAppSelector((state) => ({
    queryConfiguration: state.queryConfiguration,
    lambdaData: state.lambdaData,
  }));
  const dispatch = useAppDispatch();

  const lambdaSet = new Set<string>(
    lambdaData.map((value) => `${value.lat},${value.lng}`)
  );

  const { lat: centerLat, lng: centerLng } = getMapCenter();
  const [lng] = useState(centerLng);
  const [lat] = useState(centerLat);
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

      dispatch(setParameterValue(["lat", coords.lat]));
      dispatch(setParameterValue(["lng", coords.lng]));
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
  }, [dispatch]);

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
        {markers?.map((marker) => {
          const lambdaIncluded = lambdaSet.has(`${marker.lat},${marker.lng}`);
          return (
            <MarkerWrapper
              key={`${marker.lat},${marker.lng}`}
              marker={marker}
              halfHourIndex={halfHourIndex}
              muted={!lambdaIncluded}
            />
          );
        })}
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
