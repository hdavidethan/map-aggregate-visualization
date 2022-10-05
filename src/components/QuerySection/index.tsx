import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import {
  defaultParameters,
  QueryConfiguration,
  useQueryConfiguration,
} from "../../atoms/queryConfigurationAtom";
import QueryType, { queryTypeName } from "./QueryType";

interface Props {
  calculateOutput: (queryConfiguration: QueryConfiguration) => void;
}

function QuerySection({ calculateOutput }: Props) {
  const [queryConfiguration, setQueryType, setQueryParam] =
    useQueryConfiguration();

  useEffect(() => {
    for (const param in defaultParameters[queryConfiguration.queryType]) {
      if (queryConfiguration.parameters[param] === undefined) {
        const value = defaultParameters[queryConfiguration.queryType][param];
        setQueryParam(param, value);
      }
    }
  }, [
    queryConfiguration.parameters,
    setQueryParam,
    queryConfiguration.queryType,
  ]);

  return (
    <>
      <h3>Query</h3>
      <Form.Label>Select A Query:</Form.Label>
      <Form.Select
        className="mb-3"
        value={queryConfiguration.queryType}
        onChange={(e) => {
          setQueryType(e.target.value as unknown as QueryType);
        }}
      >
        {Object.keys(QueryType)
          .filter((value) => isNaN(Number(value)))
          .map((queryTypeKey) => {
            const queryType = QueryType[queryTypeKey as keyof typeof QueryType];
            return (
              <option key={queryType} value={queryType}>
                {queryTypeName(queryType)}
              </option>
            );
          })}
      </Form.Select>
      <hr />
      <h5>Query Parameters</h5>
      <Form.Label>Center</Form.Label>
      <Row>
        <Col>
          <FloatingLabel
            controlId="latitudeInput"
            label="Latitude"
            className="mb-3"
          >
            <Form.Control
              value={queryConfiguration.parameters.lat}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setQueryParam("lat", parseFloat(e.target.value));
                } else {
                  setQueryParam("lat", 0);
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
              value={queryConfiguration.parameters.lng}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setQueryParam("lng", parseFloat(e.target.value));
                } else {
                  setQueryParam("lng", 0);
                }
              }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Form.Label>Radius (m)</Form.Label>
      <Form.Control
        className="mb-3"
        value={queryConfiguration.parameters.radius}
        onChange={(e) => {
          if (e.target.value !== "") {
            setQueryParam("radius", parseFloat(e.target.value));
          } else {
            setQueryParam("radius", 0);
          }
        }}
      />
      <Button onClick={() => calculateOutput(queryConfiguration)}>
        Run Query
      </Button>
    </>
  );
}

export default QuerySection;
