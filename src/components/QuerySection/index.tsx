import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import QueryType, { queryTypeName } from "./QueryType";
import QueryParameters from "./QueryParameters";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setParameterValue,
  setQueryType,
  defaultParameters,
  QueryConfiguration,
} from "../../features/queryConfiguration/queryConfigurationSlice";
import ServiceParameters from "./ServiceParameters";
import { Col, Row, Spinner } from "react-bootstrap";

interface Props {
  calculateOutput: (queryConfiguration: QueryConfiguration) => void;
  loading: boolean;
}

function QuerySection({ calculateOutput, loading }: Props) {
  const queryConfiguration = useAppSelector(
    (state) => state.queryConfiguration
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    for (const param in defaultParameters[queryConfiguration.queryType]) {
      if (queryConfiguration.parameters[param] === undefined) {
        const value = defaultParameters[queryConfiguration.queryType][param];
        dispatch(setParameterValue([param, value]));
      }
    }
  }, [queryConfiguration.parameters, dispatch, queryConfiguration.queryType]);

  return (
    <>
      <h3>Query</h3>
      <Form.Label>Select A Query:</Form.Label>
      <Form.Select
        disabled={loading}
        className="mb-3"
        value={queryConfiguration.queryType}
        onChange={(e) => {
          dispatch(setQueryType(e.target.value as unknown as QueryType));
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
      <QueryParameters loading={loading} />
      <hr />
      <h5>Service Parameters</h5>
      <ServiceParameters loading={loading} />
      <Row>
        <Col md="auto">
          <Button
            disabled={loading}
            onClick={() => calculateOutput(queryConfiguration)}
          >
            Run Query
          </Button>
        </Col>
        <Col md="auto">
          {loading && (
            <Spinner className="mt-1" animation="border" variant="primary" />
          )}
        </Col>
      </Row>
    </>
  );
}

export default QuerySection;
