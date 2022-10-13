enum QueryType {
  REAL_TIME_PARKING,
  AGGREGATED_PARKING_HISTOGRAM,
  NOISE_MAP,
  TRENDS,
}

export function queryTypeName(queryType: QueryType) {
  switch (queryType) {
    case QueryType.REAL_TIME_PARKING:
      return "Real-time Parking";

    case QueryType.AGGREGATED_PARKING_HISTOGRAM:
      return "Aggregated Parking Histogram";

    case QueryType.NOISE_MAP:
      return "Noise Map";

    case QueryType.TRENDS:
      return "Trends";
  }
}

export default QueryType;
