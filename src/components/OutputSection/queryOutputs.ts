import QueryType from "../QuerySection/QueryType";

export enum OutputType {
  TEXT,
  BAR_CHART,
  HEAT_MAP,
  WORD_CLOUD,
}

const queryOutputs: { [key in QueryType]: OutputType[] } = {
  [QueryType.REAL_TIME_PARKING]: [OutputType.TEXT],
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: [
    OutputType.TEXT,
    OutputType.BAR_CHART,
  ],
  [QueryType.NOISE_MAP]: [OutputType.TEXT, OutputType.HEAT_MAP],
  [QueryType.TRENDS]: [OutputType.TEXT, OutputType.WORD_CLOUD],
};

export function outputTypeName(outputType: OutputType): string {
  switch (outputType) {
    case OutputType.TEXT:
      return "Raw JSON";
    case OutputType.BAR_CHART:
      return "Histogram";
    case OutputType.HEAT_MAP:
      return "Heat Map";
    case OutputType.WORD_CLOUD:
      return "Word Cloud";
  }
}

export default queryOutputs;
