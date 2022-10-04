import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { RecoilRoot } from "recoil";
import { QueryConfiguration } from "./atoms/queryConfigurationAtom";

import MapContainer from "./components/MapContainer";
import QuerySection from "./components/QuerySection";
import locations from "./locations.json";
import { getDistanceFromLatLonInKm } from "./util/distanceUtils";
import {
  halfHourToTimeString,
  jsDateToHalfHour,
  timeRangeToHalfHour,
} from "./util/halfHourUtils";

function App() {
  const [timeRange, setTimeRange] = useState(0);
  const [output, setOutput] = useState("");

  function calculateOutput(queryConfiguration: QueryConfiguration) {
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
    setOutput(JSON.stringify([result], null, 2));
  }

  const halfHourIndex = timeRangeToHalfHour(timeRange);

  return (
    <RecoilRoot>
      <Container fluid>
        <Row className="mt-2">
          <Col md={3}>
            <QuerySection calculateOutput={calculateOutput} />
          </Col>
          <Col md={6}>
            <h3>Data Browsing</h3>
            <Form.Label>
              Selected Time: {halfHourToTimeString(halfHourIndex)}
            </Form.Label>
            <Form.Range
              className="mb-3"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.valueAsNumber)}
            />
            <MapContainer halfHourIndex={halfHourIndex} markers={locations} />
          </Col>
          <Col md={3}>
            <h3>Output</h3>
            <Editor
              height="80vh"
              defaultLanguage="json"
              options={{ readOnly: true }}
              value={output}
            />
          </Col>
        </Row>
      </Container>
    </RecoilRoot>
  );
}

export default App;
