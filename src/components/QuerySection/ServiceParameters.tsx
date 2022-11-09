import React from "react";
import { Form } from "react-bootstrap";
import {
  setServiceUrl,
  setUsingExternalService,
} from "../../features/serviceConfiguration/serviceConfigurationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface Props {
  loading: boolean;
}

function ServiceParameters({ loading }: Props) {
  const { serviceConfiguration, queryConfiguration } = useAppSelector(
    (state) => state
  );
  const dispatch = useAppDispatch();

  const usingExternalService =
    serviceConfiguration[queryConfiguration.queryType].usingExternalService;
  const serviceUrl =
    serviceConfiguration[queryConfiguration.queryType].serviceUrl;

  return (
    <>
      <Form.Check
        type="checkbox"
        disabled={loading}
        label="Enable External Service"
        checked={usingExternalService}
        onClick={() =>
          dispatch(
            setUsingExternalService([
              queryConfiguration.queryType,
              !usingExternalService,
            ])
          )
        }
        onChange={() => {}}
      />
      <Form.Label className="mt-3">Service URL</Form.Label>
      <Form.Control
        type="text"
        disabled={loading}
        value={serviceUrl}
        className="mb-3"
        onChange={(e) =>
          dispatch(
            setServiceUrl([queryConfiguration.queryType, e.target.value])
          )
        }
      />
    </>
  );
}

export default ServiceParameters;
