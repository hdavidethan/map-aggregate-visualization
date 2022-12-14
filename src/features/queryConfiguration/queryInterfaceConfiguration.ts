import QueryType from "../../components/QuerySection/QueryType";
import { getMapCenter } from "../../util/mapConfig";
import { ParameterValue } from "./queryConfigurationSlice";

export interface QueryParameterConfiguration {
  name: string;
  label?: string;
  type: "string" | "int" | "float";
  default: ParameterValue;
}

interface QueryInterfaceConfigurationRow {
  rowLabel: string;
  parameters: QueryParameterConfiguration[];
}

const { lat: centerLat, lng: centerLng } = getMapCenter();

const queryInterfaceConfiguration: {
  [key in QueryType]: QueryInterfaceConfigurationRow[];
} = {
  [QueryType.REAL_TIME_PARKING]: [
    {
      rowLabel: "Center",
      parameters: [
        {
          name: "lat",
          label: "Latitude",
          type: "float",
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          default: centerLng,
        },
      ],
    },
    {
      rowLabel: "Radius (m)",
      parameters: [
        {
          name: "radius",
          type: "float",
          default: 300,
        },
      ],
    },
  ],
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: [
    {
      rowLabel: "Center",
      parameters: [
        {
          name: "lat",
          label: "Latitude",
          type: "float",
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          default: centerLng,
        },
      ],
    },
    {
      rowLabel: "Radius (m)",
      parameters: [
        {
          name: "radius",
          type: "float",
          default: 300,
        },
      ],
    },
  ],
  [QueryType.NOISE_MAP]: [],
  [QueryType.TRENDS]: [
    {
      rowLabel: "Center",
      parameters: [
        {
          name: "lat",
          label: "Latitude",
          type: "float",
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          default: centerLng,
        },
      ],
    },
    {
      rowLabel: "Radius (m)",
      parameters: [
        {
          name: "radius",
          type: "float",
          default: 300,
        },
      ],
    },
  ],
};

export default queryInterfaceConfiguration;
