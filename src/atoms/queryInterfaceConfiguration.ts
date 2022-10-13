import QueryType from "../components/QuerySection/QueryType";
import { ParameterValue } from "./queryConfigurationAtom";

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
          default: 40.451,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          default: -79.935,
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
          default: 40.451,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          default: -79.935,
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
  [QueryType.TRENDS]: [],
};

export default queryInterfaceConfiguration;
