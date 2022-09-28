import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import MapContainer from "./components/MapContainer";
import locations from "./locations.json";
import { getDistanceFromLatLonInKm } from "./util/distanceUtils";
import {
  halfHourToTimeString,
  timeRangeToHalfHour,
} from "./util/halfHourUtils";

function App() {
  const [timeRange, setTimeRange] = useState(0);
  const [lat, setLat] = useState(40.451);
  const [lng, setLng] = useState(-79.935);
  const [radius, setRadius] = useState(300);
  const [output, setOutput] = useState("");

  function calculateOutput() {
    let sum = 0;
    for (const location of locations) {
      if (
        getDistanceFromLatLonInKm(location.lat, location.lng, lat, lng) * 1000 <
        radius
      ) {
        sum += location.parking[timeRange];
      }
    }
    const result = {
      content_type: "sum",
      content_value: sum,
    };
    setOutput(JSON.stringify(result, null, 2));
  }

  const halfHourIndex = timeRangeToHalfHour(timeRange);

  return (
    <Container fluid>
      <Row className="mb-4">
        <h1>Map-Aggregate Visualizer</h1>
      </Row>
      <Row>
        <Col md={3}>
          <Form.Label>Select A Query:</Form.Label>
          <Form.Select className="mb-3">
            <option value="rt-parking">Real-time Parking</option>
          </Form.Select>
          <Form.Label>Center</Form.Label>
          <Row>
            <Col>
              <FloatingLabel
                controlId="latitudeInput"
                label="Latitude"
                className="mb-3"
              >
                <Form.Control
                  value={lat}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setLat(parseFloat(e.target.value));
                    } else {
                      setLat(0);
                    }
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="longitudeInput"
                label="Longitude"
                className="mb-3"
              >
                <Form.Control
                  value={lng}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setLng(parseFloat(e.target.value));
                    } else {
                      setLng(0);
                    }
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label>Radius (m)</Form.Label>
          <Form.Control
            className="mb-3"
            value={radius}
            onChange={(e) => {
              if (e.target.value !== "") {
                setRadius(parseInt(e.target.value));
              } else {
                setRadius(0);
              }
            }}
          />
          <Form.Label>
            Selected Time: {halfHourToTimeString(halfHourIndex)}
          </Form.Label>
          <Form.Range
            className="mb-3"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.valueAsNumber)}
          />
          <Button onClick={() => calculateOutput()}>Run Query</Button>
        </Col>
        <Col md={6}>
          <MapContainer
            halfHourIndex={halfHourIndex}
            markers={locations}
            queryRadius={radius}
          />
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
  );
}

export default App;
