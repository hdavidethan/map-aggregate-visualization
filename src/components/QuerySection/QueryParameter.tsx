import React from "react";
import { Form } from "react-bootstrap";
import { QueryParameterConfiguration } from "../../features/queryConfiguration/queryInterfaceConfiguration";
import { setParameterValue } from "../../features/queryConfiguration/queryConfigurationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface Props {
  paramConfig: QueryParameterConfiguration;
}

function QueryParameter({ paramConfig }: Props) {
  const queryConfiguration = useAppSelector(
    (state) => state.queryConfiguration
  );
  const dispatch = useAppDispatch();

  function handleSetParam(value: string) {
    switch (paramConfig.type) {
      case "float":
        if (value !== "") {
          dispatch(setParameterValue([paramConfig.name, parseFloat(value)]));
        } else {
          dispatch(setParameterValue([paramConfig.name, 0]));
        }
        break;
      case "int":
        if (value !== "") {
          dispatch(setParameterValue([paramConfig.name, parseInt(value)]));
        } else {
          dispatch(setParameterValue([paramConfig.name, 0]));
        }
        break;
      case "string":
        dispatch(setParameterValue([paramConfig.name, value]));
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
