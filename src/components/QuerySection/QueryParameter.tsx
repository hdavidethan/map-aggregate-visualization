import React from "react";
import { Form } from "react-bootstrap";
import { useQueryConfiguration } from "../../atoms/queryConfigurationAtom";
import { QueryParameterConfiguration } from "../../atoms/queryInterfaceConfiguration";

interface Props {
  paramConfig: QueryParameterConfiguration;
}

function QueryParameter({ paramConfig }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryConfiguration, _setQueryType, setQueryParam] =
    useQueryConfiguration();

  function handleSetParam(value: string) {
    switch (paramConfig.type) {
      case "float":
        if (value !== "") {
          setQueryParam(paramConfig.name, parseFloat(value));
        } else {
          setQueryParam(paramConfig.name, 0);
        }
        break;
      case "int":
        if (value !== "") {
          setQueryParam(paramConfig.name, parseInt(value));
        } else {
          setQueryParam(paramConfig.name, 0);
        }
        break;
      case "string":
        setQueryParam(paramConfig.name, value);
        break;
    }
  }

  if (paramConfig.label !== undefined) {
    return (
      <Form.FloatingLabel label={paramConfig.label} className="mb-3">
        <Form.Control
          value={queryConfiguration.parameters[paramConfig.name]}
          onChange={(e) => handleSetParam(e.target.value)}
        />
      </Form.FloatingLabel>
    );
  } else {
    return (
      <Form.Control
        className="mb-3"
        value={queryConfiguration.parameters[paramConfig.name]}
        onChange={(e) => handleSetParam(e.target.value)}
      />
    );
  }
}

export default QueryParameter;
