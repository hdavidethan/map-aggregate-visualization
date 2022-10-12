enum QueryType {
  REAL_TIME_PARKING,
  AGGREGATED_PARKING_HISTOGRAM,
  TRENDS,
}

export function queryTypeName(queryType: QueryType) {
  switch (queryType) {
    case QueryType.REAL_TIME_PARKING:
      return "Real-time Parking";

    case QueryType.AGGREGATED_PARKING_HISTOGRAM:
      return "Aggregated Parking Histogram";

    case QueryType.TRENDS:
      return "Trends";
  }
}

export default QueryType;
