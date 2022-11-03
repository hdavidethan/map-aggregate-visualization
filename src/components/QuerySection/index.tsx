import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import QueryType, { queryTypeName } from "./QueryType";
import QueryParameters from "./QueryParameters";
import ServiceButton from "./ServiceButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setParameterValue,
  setQueryType,
  defaultParameters,
  QueryConfiguration,
} from "../../features/queryConfiguration/queryConfigurationSlice";

interface Props {
  calculateOutput: (queryConfiguration: QueryConfiguration) => void;
}

function QuerySection({ calculateOutput }: Props) {
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
      <ServiceButton />
      <Form.Label>Select A Query:</Form.Label>
      <Form.Select
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
      <QueryParameters />
      <Button onClick={() => calculateOutput(queryConfiguration)}>
        Run Query
      </Button>
    </>
  );
}

export default QuerySection;
