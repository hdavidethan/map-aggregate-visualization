import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface Props {
  className?: string;
  timeScroll: number;
  rangeSize: number;
  setTimeScroll: React.Dispatch<React.SetStateAction<number>>;
}

enum ScrollSpeed {
  ONE,
  TWO,
  FIVE,
  TEN,
}

function ScrollControls({
  className,
  rangeSize,
  timeScroll,
  setTimeScroll,
}: Props) {
  const [speed, setSpeed] = useState<ScrollSpeed>(ScrollSpeed.ONE);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    let period = 1000;
    switch (speed) {
      case ScrollSpeed.ONE:
        period = 1000;
        break;
      case ScrollSpeed.TWO:
        period = 500;
        break;
      case ScrollSpeed.FIVE:
        period = 200;
        break;
      case ScrollSpeed.TEN:
        period = 100;
        break;
    }

    const interval = setInterval(() => {
      if (play) {
        setTimeScroll((timeScroll + 1) % (rangeSize + 1));
      }
    }, period);

    return () => clearInterval(interval);
  }, [play, speed, timeScroll, setTimeScroll, rangeSize]);

  return (
    <ButtonToolbar className={className}>
      <ButtonGroup className="me-2">
        <Button
          active={speed === ScrollSpeed.ONE}
          onClick={() => setSpeed(ScrollSpeed.ONE)}
        >
          30 min/s
        </Button>
        <Button
          active={speed === ScrollSpeed.TWO}
          onClick={() => setSpeed(ScrollSpeed.TWO)}
        >
          1 hr/s
        </Button>
        <Button
          active={speed === ScrollSpeed.FIVE}
          onClick={() => setSpeed(ScrollSpeed.FIVE)}
        >
          2.5 hr/s
        </Button>
        <Button
          active={speed === ScrollSpeed.TEN}
          onClick={() => setSpeed(ScrollSpeed.TEN)}
        >
          5 hr/s
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button active={play} onClick={() => setPlay(true)}>
          <PlayArrowIcon />
        </Button>
        <Button active={!play} onClick={() => setPlay(false)}>
          <PauseIcon />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

export default ScrollControls;
