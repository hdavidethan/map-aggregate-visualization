import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useQueryConfiguration } from "../../atoms/queryConfigurationAtom";
import queryInterfaceConfiguration from "../../atoms/queryInterfaceConfiguration";
import QueryParameter from "./QueryParameter";

function QueryParameters() {
  const [queryConfiguration] = useQueryConfiguration();
  return (
    <>
      {queryInterfaceConfiguration[queryConfiguration.queryType].map(
        (config) => {
          if (config.parameters.length > 1) {
            return (
              <>
                <Form.Label>{config.rowLabel}</Form.Label>
                <Row>
                  {config.parameters.map((param) => (
                    <Col>
                      <QueryParameter paramConfig={param} />
                    </Col>
                  ))}
                </Row>
              </>
            );
          } else {
            return (
              <>
                <Form.Label>{config.rowLabel}</Form.Label>
                {config.parameters.map((param) => (
                  <Col>
                    <QueryParameter paramConfig={param} />
                  </Col>
                ))}
              </>
            );
          }
        }
      )}
    </>
  );
}

export default QueryParameters;
