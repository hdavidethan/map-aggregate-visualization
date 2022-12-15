import QueryType from "../../components/QuerySection/QueryType";
import { getMapCenter } from "../../util/mapConfig";
import { ParameterValue } from "./queryConfigurationSlice";

export interface QueryParameterConfiguration {
  name: string;
  label?: string;
  type: "string" | "int" | "float";
  nodes: string[];
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
          nodes: ["PullData"],
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          nodes: ["PullData"],
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
          nodes: ["PullData"],
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
          nodes: ["PullData"],
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          nodes: ["PullData"],
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
          nodes: ["PullData"],
          default: 300,
        },
      ],
    },
  ],
  [QueryType.NOISE_MAP]: [
    {
      rowLabel: "Center",
      parameters: [
        {
          name: "lat",
          label: "Latitude",
          type: "float",
          nodes: ["PullData", "BuildNoiseMap"],
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          nodes: ["PullData", "BuildNoiseMap"],
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
          nodes: ["PullData", "BuildNoiseMap"],
          default: 300,
        },
      ],
    },
    {
      rowLabel: "Noise Map Granularity",
      parameters: [
        {
          name: "krigingGranularity",
          type: "int",
          nodes: ["BuildNoiseMap"],
          default: 10,
        },
      ],
    },
  ],
  [QueryType.TRENDS]: [
    {
      rowLabel: "Center",
      parameters: [
        {
          name: "lat",
          label: "Latitude",
          type: "float",
          nodes: ["PullData"],
          default: centerLat,
        },
        {
          name: "lng",
          label: "Latitude",
          type: "float",
          nodes: ["PullData"],
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
          nodes: ["PullData"],
          default: 300,
        },
      ],
    },
  ],
};

export function getNodesFromParameter(queryType: QueryType, parameter: string) {
  const queryInterface = queryInterfaceConfiguration[queryType];
  for (const section of queryInterface) {
    for (const sectionParameter of section.parameters) {
      if (sectionParameter.name === parameter) {
        return sectionParameter.nodes;
      }
    }
  }
  return [];
}

export default queryInterfaceConfiguration;
