import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Slider from "@mui/material/Slider";
import MapContainer from "../MapContainer";
import { halfHourToTimeString } from "../../util/halfHourUtils";

import locations from "../../locations.json";
import ScrollControls from "./ScrollControls";

function DataBrowsingSection() {
  const [timeScroll, setTimeScroll] = useState(0);
  const [timeRange, setTimeRange] = useState<number[]>([0, 47]);

  return (
    <>
      <h3>Data Browsing</h3>
      <Form.Label>Select Time Range</Form.Label>
      <Slider
        min={0}
        max={47}
        value={timeRange}
        valueLabelFormat={(value) => {
          return halfHourToTimeString(value);
        }}
        valueLabelDisplay="auto"
        onChange={(event, value) => {
          (value as number[])[1] - (value as number[])[0] >= 1 &&
            setTimeRange(value as number[]);
        }}
        disableSwap
      />
      <Form.Label className="mt-4 mb-0">
        Playback Time: {halfHourToTimeString(timeScroll + timeRange[0])}
      </Form.Label>
      <Slider
        aria-label="Custom marks"
        value={timeScroll}
        min={0}
        max={timeRange[1] - timeRange[0]}
        marks={[
          { value: 0, label: halfHourToTimeString(timeRange[0]) },
          {
            value: timeRange[1] - timeRange[0],
            label: halfHourToTimeString(timeRange[1]),
          },
        ]}
        onChange={(event, value) => {
          setTimeScroll(value as number);
        }}
      />
      <ScrollControls
        timeScroll={timeScroll}
        rangeSize={timeRange[1] - timeRange[0]}
        setTimeScroll={setTimeScroll}
        className="mb-3"
      />
      <MapContainer
        halfHourIndex={timeScroll + timeRange[0]}
        markers={locations}
      />
    </>
  );
}

export default DataBrowsingSection;
