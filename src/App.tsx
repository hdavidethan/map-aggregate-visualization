import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { RecoilRoot } from "recoil";
import { QueryConfiguration } from "./atoms/queryConfigurationAtom";
import DataBrowsingSection from "./components/DataBrowsingSection";
import OutputSection from "./components/OutputSection";
import QuerySection from "./components/QuerySection";
import QueryType from "./components/QuerySection/QueryType";
import locations from "./locations.json";
import wordcloud from "./wordcloud.json";
import { getDistanceFromLatLonInKm } from "./util/distanceUtils";
import { halfHourToTimeString, jsDateToHalfHour } from "./util/halfHourUtils";

interface Payload {
  content_type: string;
  content_value: string | number;
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
    content_type: "sum",
    content_value: sum,
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
      content_type: "parking_histogram " + halfHourToTimeString(i),
      content_value: sum,
    });
  }
  return result;
}

function App() {
  const [output, setOutput] = useState("");
  function calculateOutput(queryConfiguration: QueryConfiguration) {
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
      case QueryType[QueryType.TRENDS]: {
        setOutput(JSON.stringify(wordcloud, null, 2));
        break;
      }
    }
  }

  return (
    <RecoilRoot>
      <Container fluid>
        <Row className="mt-2">
          <Col md={2}>
            <QuerySection calculateOutput={calculateOutput} />
          </Col>
          <Col md={5}>
            <DataBrowsingSection />
          </Col>
          <Col md={5}>
            <OutputSection output={output} />
          </Col>
        </Row>
      </Container>
    </RecoilRoot>
  );
}

export default App;
