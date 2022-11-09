import React, { useEffect, useState } from "react";
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
import { getDistanceFromLatLonInKm } from "../util/distanceUtils";
import { jsDateToHalfHour } from "../util/halfHourUtils";
import { useAppSelector } from "../hooks";

interface Payload {
  contentType: string;
  contentValue: string | number;
}

function calculateRealTimeParking(
  queryConfiguration: QueryConfiguration
): Payload[] {
  let sum = 0;
  for (const location of locations) {
    if (
      getDistanceFromLatLonInKm(
        location.lat,
        location.lng,
        queryConfiguration.parameters.lat as number,
        queryConfiguration.parameters.lng as number
      ) *
        1000 <
      queryConfiguration.parameters.radius
    ) {
      sum += location.parking[jsDateToHalfHour(new Date())];
    }
  }
  const result = {
    contentType: "sum",
    contentValue: sum,
  };
  return [result];
}

function calculateAggregatedHistogram(
  queryConfiguration: QueryConfiguration
): Payload[] {
  const result = [];
  for (let i = 0; i < 48; i++) {
    let sum = 0;
    for (const location of locations) {
      if (
        getDistanceFromLatLonInKm(
          location.lat,
          location.lng,
          queryConfiguration.parameters.lat as number,
          queryConfiguration.parameters.lng as number
        ) *
          1000 <
        queryConfiguration.parameters.radius
      ) {
        sum += location.parking[i];
      }
    }
    result.push({
      contentType: "parking-occupancy-prediction-" + i,
      contentValue: sum,
    });
  }
  return result;
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
          setOutput(JSON.stringify(json, null, 2));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      switch (QueryType[queryConfiguration.queryType]) {
        case QueryType[QueryType.REAL_TIME_PARKING]: {
          let parking = calculateRealTimeParking(queryConfiguration);
          setOutput(JSON.stringify(parking, null, 2));
          break;
        }
        case QueryType[QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
          let aggregate = calculateAggregatedHistogram(queryConfiguration);
          setOutput(JSON.stringify(aggregate, null, 2));
          break;
        }
        case QueryType[QueryType.NOISE_MAP]: {
          let aggregate = calculateHeatMap();
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
