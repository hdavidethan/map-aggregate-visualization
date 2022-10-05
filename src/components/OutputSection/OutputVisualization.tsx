import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import { OutputType } from "./queryOutputs";
import { useQueryConfiguration } from "../../atoms/queryConfigurationAtom";
import QueryType from "../QuerySection/QueryType";

interface Props {
  output: string;
  outputType: OutputType;
}

function OutputVisualization({ output, outputType }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [queryConfiguration] = useQueryConfiguration();

  useEffect(() => {
    try {
      const parsedOutput = JSON.parse(output);
      switch (QueryType[queryConfiguration.queryType]) {
        case QueryType[QueryType.REAL_TIME_PARKING]:
          setData([]);
          break;
        case QueryType[QueryType.AGGREGATED_PARKING_HISTOGRAM]:
          const aggregatedData = [];
          for (const payload of parsedOutput) {
            aggregatedData.push({
              name: payload.content_type.split(" ")[1],
              p: payload.content_value,
            });
          }
          setData(aggregatedData);
          break;
      }
    } catch {}
  }, [output, queryConfiguration.queryType]);

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
            right: 35,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Bar dataKey="p" fill="#8884d8" />
        </BarChart>
      );
  }
}

export default OutputVisualization;
