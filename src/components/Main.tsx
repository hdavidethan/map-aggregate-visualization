import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  ParameterValue,
  QueryConfiguration,
} from "../features/queryConfiguration/queryConfigurationSlice";
import DataBrowsingSection from "../components/DataBrowsingSection";
import OutputSection from "../components/OutputSection";
import QuerySection from "../components/QuerySection";
import QueryType from "../components/QuerySection/QueryType";
import heatmap from "../heatmap.json";
import locations from "../locations.json";
import wordcloud from "../wordcloud.json";
import { jsDateToHalfHour } from "../util/halfHourUtils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLambdas } from "../features/lambdaData/lambdaDataSlice";
import { getPreciseDistance } from "geolib";
import { Coordinates } from "./MapContainer/Coordinates";

interface Payload {
  contentType: string;
  contentValue: string | number;
}

function calculateRealTimeParking(queryConfiguration: QueryConfiguration): {
  result: Payload[];
  lambdas: Array<Coordinates>;
} {
  let sum = 0;
  const lambdas: Array<Coordinates> = [];
  for (const location of locations) {
    if (
      getPreciseDistance(
        { latitude: location.lat, longitude: location.lng },
        {
          latitude: queryConfiguration.parameters.lat as number,
          longitude: queryConfiguration.parameters.lng as number,
        }
      ) < queryConfiguration.parameters.radius
    ) {
      sum += location.parking[jsDateToHalfHour(new Date())];
      lambdas.push({ lat: location.lat, lng: location.lng });
    }
  }
  const result = {
    contentType: "sum",
    contentValue: sum,
  };
  return { result: [result], lambdas };
}

function calculateAggregatedHistogram(queryConfiguration: QueryConfiguration): {
  result: Payload[];
  lambdas: Array<Coordinates>;
} {
  const result = [];
  const lambdas: Array<Coordinates> = [];
  for (let i = 0; i < 48; i++) {
    let sum = 0;
    for (const location of locations) {
      if (
        getPreciseDistance(
          { latitude: location.lat, longitude: location.lng },
          {
            latitude: queryConfiguration.parameters.lat as number,
            longitude: queryConfiguration.parameters.lng as number,
          }
        ) < queryConfiguration.parameters.radius
      ) {
        sum += location.parking[i];
        lambdas.push({ lat: location.lat, lng: location.lng });
      }
    }
    result.push({
      contentType: "parking-occupancy-prediction-" + i,
      contentValue: sum,
    });
  }
  return { result, lambdas };
}

function calculateHeatMap(): Payload[] {
  const result: Payload[] = [];
  let i = 0;
  for (const row of heatmap) {
    let j = 0;
    for (const value of row) {
      result.push({
        contentType: `noise_map ${i},${j}`,
        contentValue: value,
      });
      j++;
    }
    i++;
  }
  return result;
}

function getRequestBody(queryConfiguration: QueryConfiguration): string {
  const queryParameters: { [key: string]: ParameterValue } = {};
  for (const parameter in queryConfiguration.parameters) {
    queryParameters[`PullData.${parameter}`] =
      queryConfiguration.parameters[parameter];
  }
  return JSON.stringify(queryParameters);
}

function Main() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const serviceConfiguration = useAppSelector(
    (state) => state.serviceConfiguration
  );
  const dispatch = useAppDispatch();

  function calculateOutput(queryConfiguration: QueryConfiguration) {
    if (
      serviceConfiguration[queryConfiguration.queryType].usingExternalService
    ) {
      setLoading(true);
      fetch(
        "https://19mg8qtqsk.execute-api.us-east-2.amazonaws.com/Prod/execute",
        {
          // mode: "no-cors",
          method: "POST",
          body: getRequestBody(queryConfiguration),
        }
      )
        .then((res) => res.json())
        .then((json) => {
          const result = json.result ?? json;
          setOutput(JSON.stringify(result, null, 2));
          const lambdas = json.lambdas ?? [];
          dispatch(setLambdas(lambdas));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      switch (QueryType[queryConfiguration.queryType]) {
        case QueryType[QueryType.REAL_TIME_PARKING]: {
          const { result: parking, lambdas } =
            calculateRealTimeParking(queryConfiguration);
          setOutput(JSON.stringify(parking, null, 2));
          dispatch(setLambdas(lambdas));
          console.log(lambdas);
          break;
        }
        case QueryType[QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
          const { result: aggregate, lambdas } =
            calculateAggregatedHistogram(queryConfiguration);
          setOutput(JSON.stringify(aggregate, null, 2));
          dispatch(setLambdas(lambdas));
          break;
        }
        case QueryType[QueryType.NOISE_MAP]: {
          const aggregate = calculateHeatMap();
          setOutput(JSON.stringify(aggregate, null, 2));
          break;
        }
        case QueryType[QueryType.TRENDS]: {
          setOutput(JSON.stringify(wordcloud, null, 2));
          break;
        }
      }
    }
  }
  return (
    <Container fluid>
      <Row className="mt-2">
        <Col md={2}>
          <QuerySection loading={loading} calculateOutput={calculateOutput} />
        </Col>
        <Col md={5}>
          <DataBrowsingSection />
        </Col>
        <Col md={5}>
          <OutputSection output={output} />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
