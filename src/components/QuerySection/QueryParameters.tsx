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
        (config, index) => {
          if (config.parameters.length > 1) {
            return (
              <React.Fragment key={`param-${index}`}>
                <Form.Label>{config.rowLabel}</Form.Label>
                <Row>
                  {config.parameters.map((param, rowIndex) => (
                    <Col key={`param-${index}-${rowIndex}`}>
                      <QueryParameter paramConfig={param} />
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={`param-${index}`}>
                <Form.Label>{config.rowLabel}</Form.Label>
                {config.parameters.map((param, rowIndex) => (
                  <Col key={`param-${index}-${rowIndex}`}>
                    <QueryParameter paramConfig={param} />
                  </Col>
                ))}
              </React.Fragment>
            );
          }
        }
      )}
    </>
  );
}

export default QueryParameters;
