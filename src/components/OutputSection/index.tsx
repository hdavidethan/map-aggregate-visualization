import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useQueryConfiguration } from "../../atoms/queryConfigurationAtom";
import OutputVisualization from "./OutputVisualization";
import queryOutputs, { OutputType, outputTypeName } from "./queryOutputs";

interface Props {
  output: string;
}

function OutputSection({ output }: Props) {
  const [queryConfiguration] = useQueryConfiguration();

  const outputTypes = queryOutputs[queryConfiguration.queryType];

  const [selectedOutputType, setSelectedOutputType] = useState(
    outputTypes?.[0] ?? OutputType.TEXT
  );

  return (
    <>
      <h3>Output</h3>
      <ButtonGroup className="mt-2 mb-4">
        {outputTypes &&
          outputTypes.map((outputType) => (
            <Button
              key={outputType}
              value={outputType}
              active={selectedOutputType === outputType}
              onClick={() => setSelectedOutputType(outputType)}
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
