import QueryType from "../../components/QuerySection/QueryType";
import { ServiceConfiguration } from "./serviceConfigurationSlice";

export const serviceConfiguration: ServiceConfiguration = {
  [QueryType.REAL_TIME_PARKING]: {
    usingExternalService: true,
    serviceUrl:
      "https://y0gepxmrae.execute-api.us-east-2.amazonaws.com/Prod/benchmark",
  },
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
    usingExternalService: true,
    serviceUrl:
      "https://19mg8qtqsk.execute-api.us-east-2.amazonaws.com/Prod/benchmark",
  },
  [QueryType.NOISE_MAP]: {
    usingExternalService: true,
    serviceUrl:
      "https://1wgs2x5irb.execute-api.us-east-2.amazonaws.com/Prod/benchmark",
  },
  [QueryType.TRENDS]: {
    usingExternalService: true,
    serviceUrl:
      "https://vmhjupohda.execute-api.us-east-2.amazonaws.com/Prod/benchmark",
  },
};
