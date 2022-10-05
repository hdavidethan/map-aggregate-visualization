import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { RecoilRoot } from "recoil";
import { QueryConfiguration } from "./atoms/queryConfigurationAtom";
import DataBrowsingSection from "./components/DataBrowsingSection";
import QuerySection from "./components/QuerySection";
import locations from "./locations.json";
import { getDistanceFromLatLonInKm } from "./util/distanceUtils";
import { jsDateToHalfHour } from "./util/halfHourUtils";

function App() {
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

  return (
    <RecoilRoot>
      <Container fluid>
        <Row className="mt-2">
          <Col md={3}>
            <QuerySection calculateOutput={calculateOutput} />
          </Col>
          <Col md={6}>
            <DataBrowsingSection />
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
