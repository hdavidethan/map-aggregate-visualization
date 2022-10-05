import QueryType from "../QuerySection/QueryType";

export enum OutputType {
  TEXT,
  BAR_CHART,
}

const queryOutputs: { [key in QueryType]: OutputType[] } = {
  [QueryType.REAL_TIME_PARKING]: [OutputType.TEXT],
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: [
    OutputType.TEXT,
    OutputType.BAR_CHART,
  ],
};

export function outputTypeName(outputType: OutputType): string {
  switch (outputType) {
    case OutputType.TEXT:
      return "Raw JSON";
    case OutputType.BAR_CHART:
      return "Histogram";
  }
}

export default queryOutputs;