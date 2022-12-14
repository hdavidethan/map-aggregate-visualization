import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import { OutputType } from "./queryOutputs";
import QueryType from "../QuerySection/QueryType";
import WordCloudCanvas from "./WordCloudCanvas";
import { HeatMap } from "@nivo/heatmap";
import { useAppSelector } from "../../hooks";
import {
  getNextTimeOffset,
  halfHourToTimeString,
} from "../../util/halfHourUtils";

interface Props {
  output: string;
  outputType: OutputType;
}

function OutputVisualization({ output, outputType }: Props) {
  const [data, setData] = useState<any[]>([]);
  const queryConfiguration = useAppSelector(
    (state) => state.queryConfiguration
  );

  useEffect(() => {
    try {
      const parsedOutput = JSON.parse(output);
      switch (QueryType[queryConfiguration.queryType]) {
        case QueryType[QueryType.REAL_TIME_PARKING]: {
          setData([]);
          break;
        }
        case QueryType[QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
          const aggregatedData = [];
          const timeOffset = getNextTimeOffset(new Date());
          for (const payload of parsedOutput) {
            const payloadTokens = payload.contentType.split("-");
            const index = parseInt(payloadTokens[payloadTokens.length - 1]);
            const timeIndex = halfHourToTimeString((index + timeOffset) % 48);
            aggregatedData.push({
              name: timeIndex,
              p: payload.contentValue,
            });
          }
          setData(aggregatedData);
          break;
        }
        case QueryType[QueryType.NOISE_MAP]: {
          const aggregatedData = [];
          const rows: { [key: number]: { x: number; y: number }[] } = {};
          for (const payload of parsedOutput) {
            const [x, y] = payload.contentType
              .split(" ")[1]
              .split(",")
              .map((v: string) => parseInt(v));
            const nextValue = {
              y: payload.contentValue,
              x: y,
            };
            if (Array.isArray(rows[x])) {
              rows[x].push(nextValue);
            } else {
              rows[x] = [nextValue];
            }
          }

          for (const x in rows) {
            aggregatedData.push({
              id: parseInt(x),
              data: rows[x],
            });
          }
          setData(aggregatedData);
          break;
        }
        case QueryType[QueryType.TRENDS]: {
          const aggregatedData = [];
          for (const payload of parsedOutput) {
            const [minValue, maxValue] = payload.contentValue.split("-");
            aggregatedData.push([payload.groupId, (minValue + maxValue) / 2]);
          }
          setData(aggregatedData);
          break;
        }
      }
    } catch {}
  }, [output, queryConfiguration.queryType]);

  let content: React.ReactNode | null = null;
  switch (outputType) {
    case OutputType.TEXT:
      content = (
        <Editor
          height="80vh"
          defaultLanguage="json"
          options={{ readOnly: true }}
          value={output}
        />
      );
      break;
    case OutputType.BAR_CHART:
      content = (
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
      break;
    case OutputType.HEAT_MAP:
      content = (
        <HeatMap
          height={700}
          width={700}
          data={data}
          colors={{
            type: "sequential",
            scheme: "oranges",
            divergeAt: 0.5,
            minValue: 0,
            maxValue: 1,
          }}
          emptyColor="#555555"
          valueFormat=">-.3r"
        />
      );
      break;
    case OutputType.WORD_CLOUD:
      content = <WordCloudCanvas data={data} />;
      break;
  }
  return <div id="output-visualization">{content}</div>;
}

export default OutputVisualization;
