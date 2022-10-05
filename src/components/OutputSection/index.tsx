import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useQueryConfiguration } from "../../atoms/queryConfigurationAtom";
import OutputVisualization from "./OutputVisualization";
import queryOutputs, { outputTypeName } from "./queryOutputs";

interface Props {
  output: string;
}

function OutputSection({ output }: Props) {
  const [queryConfiguration] = useQueryConfiguration();

  const outputTypes = queryOutputs[queryConfiguration.queryType];

  const [selectedOutputType, setSelectedOutputType] = useState(outputTypes[0]);

  return (
    <>
      <h3>Output</h3>
      <ButtonGroup className="mt-2 mb-4">
        {outputTypes.map((outputType) => (
          <Button
            key={outputType}
            value={outputType}
            active={selectedOutputType === outputType}
            onChange={() => setSelectedOutputType(outputType)}
          >
            {outputTypeName(outputType)}
          </Button>
        ))}
      </ButtonGroup>
      <OutputVisualization output={output} outputType={selectedOutputType} />
    </>
  );
}

export default OutputSection;
