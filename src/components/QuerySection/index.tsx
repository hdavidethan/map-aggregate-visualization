import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  defaultParameters,
  QueryConfiguration,
  useQueryConfiguration,
} from "../../atoms/queryConfigurationAtom";
import QueryType, { queryTypeName } from "./QueryType";
import QueryParameters from "./QueryParameters";

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
      <QueryParameters />
      <Button onClick={() => calculateOutput(queryConfiguration)}>
        Run Query
      </Button>
    </>
  );
}

export default QuerySection;
