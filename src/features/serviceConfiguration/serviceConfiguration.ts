import QueryType from "../../components/QuerySection/QueryType";
import { ServiceConfiguration } from "./serviceConfigurationSlice";

export const serviceConfiguration: ServiceConfiguration = {
  [QueryType.REAL_TIME_PARKING]: {
    usingExternalService: false,
    serviceUrl:
      "https://y0gepxmrae.execute-api.us-east-2.amazonaws.com/Prod/benchmark",
  },
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
    usingExternalService: false,
    serviceUrl:
      "https://19mg8qtqsk.execute-api.us-east-2.amazonaws.com/Prod/benchmark",
  },
  [QueryType.NOISE_MAP]: {
    usingExternalService: false,
    serviceUrl: "",
  },
  [QueryType.TRENDS]: {
    usingExternalService: false,
    serviceUrl: "",
  },
};
