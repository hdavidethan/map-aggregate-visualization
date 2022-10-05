import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import { OutputType } from "./queryOutputs";

interface Props {
  output: string;
  outputType: OutputType;
}

function OutputVisualization({ output, outputType }: Props) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const parsedOutput = JSON.parse(output);
      console.log(parsedOutput);
    } catch {}
  }, [output]);

  switch (outputType) {
    case OutputType.TEXT:
      return (
        <Editor
          height="80vh"
          defaultLanguage="json"
          options={{ readOnly: true }}
          value={output}
        />
      );
    case OutputType.BAR_CHART:
      return (
        <BarChart
          width={700}
          height={350}
          data={data}
          margin={{
            top: 15,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
      );
  }
}

export default OutputVisualization;
