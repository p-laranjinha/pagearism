import * as React from "react";
import LevelTemplate from "../LevelTemplate";
import { Typography } from "@mui/material";
import {
  CBFull,
  CBContainer,
  CBTop,
  CBLine,
  CBLeft,
  CBCenter,
  CBRight,
  CBBottom,
  CBMiddle,
} from "../../components/CodeBlock";
import { useStopwatch } from "react-timer-hook";

function Level2({ storageKey }) {
  React.useEffect(() => {
    document.title = "Level 2 (Aligning) - Pagearism";
  }, []);

  const [completed, setCompleted] = React.useState(false);

  // Solution

  const correctSolution = {
    center: {
      position: "absolute",
      top: "50",
      left: "50",
      translateLeft: "-50",
      translateRight: "-50",
    },
    corner: {
      position: "absolute",
      bottom: "10",
      right: "10",
    },
  };

  const [solution, setSolution] = React.useState({
    center: {
      position: "unset",
      top: "0",
      left: "0",
      translateLeft: "0",
      translateRight: "0",
    },
    corner: {
      position: "unset",
      bottom: "0",
      right: "0",
    },
  });

  // Stopwatch

  const timeTrophies = {
    gold: { hours: 0, minutes: 1, seconds: 0 },
    silver: { hours: 0, minutes: 2, seconds: 30 },
    bronze: { hours: 0, minutes: 5, seconds: 0 },
  };

  const stopwatch = useStopwatch({ autoStart: false });

  // Trophy
  const [trophy, setTrophy] = React.useState("gold"); // color
  React.useEffect(() => {
    if (completed) return;
    if (
      (stopwatch.hours - timeTrophies.gold.hours) * 3600 +
        (stopwatch.minutes - timeTrophies.gold.minutes) * 60 +
        (stopwatch.seconds - timeTrophies.gold.seconds) <=
      0
    )
      setTrophy("gold");
    else if (
      (stopwatch.hours - timeTrophies.silver.hours) * 3600 +
        (stopwatch.minutes - timeTrophies.silver.minutes) * 60 +
        (stopwatch.seconds - timeTrophies.silver.seconds) <=
      0
    )
      setTrophy("silver");
    else if (
      (stopwatch.hours - timeTrophies.bronze.hours) * 3600 +
        (stopwatch.minutes - timeTrophies.bronze.minutes) * 60 +
        (stopwatch.seconds - timeTrophies.bronze.seconds) <=
      0
    )
      setTrophy("chocolate");
    else setTrophy("black");
  }, [stopwatch]);

  const successFunction = () => {
    let success = JSON.stringify(solution) === JSON.stringify(correctSolution); // Order matters
    if (success) {
      setCompleted(true);
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          trophy: trophy,
          time: {
            hours: stopwatch.hours,
            minutes: stopwatch.minutes,
            seconds: stopwatch.seconds,
          },
        })
      );
    }
    return success;
  };

  return (
    <>
      <LevelTemplate
        cssComponent={
          <CssComponent solution={solution} setSolution={setSolution} />
        }
        htmlComponent={<HtmlComponent />}
        targetComponent={<TargetComponent solution={solution} />}
        helpComponent={<HelpComponent />}
        successFunction={successFunction}
        trophy={trophy}
        stopwatch={stopwatch}
        completed={completed}
      />
    </>
  );
}

function CssComponent({ solution, setSolution }) {
  const positions = [
    "absolute",
    "fixed",
    "inherit",
    "initial",
    "relative",
    "revert",
    "static",
    "sticky",
    "unset",
  ];

  return (
    <CBContainer>
      <CBTop>
        {`body {
  margin: 0;
}

.center {`}
      </CBTop>
      <CBLine>
        <CBLeft>{"  position: "}</CBLeft>
        <select
          value={solution.center.position}
          onChange={(e) =>
            setSolution({
              ...solution,
              center: { ...solution.center, position: e.target.value },
            })
          }
        >
          <option value="" hidden></option>
          {positions.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <CBRight>{";"}</CBRight>
      </CBLine>
      <CBLine>
        <CBLeft>{"  top: "}</CBLeft>
        <input
          type="number"
          value={solution.center.top}
          onChange={(e) =>
            setSolution({
              ...solution,
              center: { ...solution.center, top: e.target.value },
            })
          }
        />
        <CBRight>{"%;"}</CBRight>
      </CBLine>
      <CBLine>
        <CBLeft>{"  left: "}</CBLeft>
        <input
          type="number"
          value={solution.center.left}
          onChange={(e) =>
            setSolution({
              ...solution,
              center: { ...solution.center, left: e.target.value },
            })
          }
        />
        <CBRight>{"%;"}</CBRight>
      </CBLine>
      <CBLine>
        <CBLeft>{"  transform: translate("}</CBLeft>
        <input
          type="number"
          value={solution.center.translateLeft}
          onChange={(e) =>
            setSolution({
              ...solution,
              center: {
                ...solution.center,
                translateLeft: e.target.value,
              },
            })
          }
        />
        <CBCenter>{"%, "}</CBCenter>
        <input
          type="number"
          value={solution.center.translateRight}
          onChange={(e) =>
            setSolution({
              ...solution,
              center: {
                ...solution.center,
                translateRight: e.target.value,
              },
            })
          }
        />
        <CBRight>{"%);"}</CBRight>
      </CBLine>
      <CBMiddle>
        {`}

.corner {`}
      </CBMiddle>
      <CBLine>
        <CBLeft>{"  position: "}</CBLeft>
        <select
          value={solution.corner.position}
          onChange={(e) =>
            setSolution({
              ...solution,
              corner: { ...solution.corner, position: e.target.value },
            })
          }
        >
          <option value="" hidden></option>
          {positions.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <CBRight>{";"}</CBRight>
      </CBLine>
      <CBLine>
        <CBLeft>{"  bottom: "}</CBLeft>
        <input
          type="number"
          value={solution.corner.bottom}
          onChange={(e) =>
            setSolution({
              ...solution,
              corner: { ...solution.corner, bottom: e.target.value },
            })
          }
        />
        <CBRight>{"%;"}</CBRight>
      </CBLine>
      <CBLine>
        <CBLeft>{"  right: "}</CBLeft>
        <input
          type="number"
          value={solution.corner.right}
          onChange={(e) =>
            setSolution({
              ...solution,
              corner: { ...solution.corner, right: e.target.value },
            })
          }
        />
        <CBRight>{"%;"}</CBRight>
      </CBLine>
      <CBBottom>{"}"}</CBBottom>
    </CBContainer>
  );
}

function HtmlComponent() {
  return (
    <CBFull language="html">
      {`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Level 2 (Aligning) - Pagearism</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <span class="center">Center!</span>
    <span class="corner">10% from the corner!</span>
  </body>
</html>`}
    </CBFull>
  );
}

function TargetComponent({ solution }) {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        <span
          style={{
            color: "red",
            position: solution.center.position,
            top: solution.center.top + "%",
            left: solution.center.left + "%",
            transform:
              "translate(" +
              solution.center.translateLeft +
              "%, " +
              solution.center.translateRight +
              "%)",
          }}
        >
          Center!
        </span>
        <span
          style={{
            color: "red",
            position: solution.corner.position,
            bottom: solution.corner.bottom + "%",
            right: solution.corner.right + "%",
          }}
        >
          10% from the corner!
        </span>
      </div>
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        <span
          style={{
            color: "black",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Center!
        </span>
        <span
          style={{
            color: "black",
            position: "absolute",
            bottom: "10%",
            right: "10%",
          }}
        >
          10% from the corner!
        </span>
      </div>
    </div>
  );
}

function HelpComponent() {
  return (
    <>
      <Typography align="center" style={{ marginTop: 10 }}>
        In this level you'll have to center one text and put another one a bit
        away from the bottom-right corner.
      </Typography>
      <Typography align="center" style={{ marginTop: 10 }}>
        The top and left atributes define the distance between the border of the
        element and the border of the screen.
      </Typography>
      <Typography align="center">
        So if you want to make an element completely centered, it would be more
        useful for the atributes to define the distance between the center of
        the element and the border of the screen instead.
      </Typography>
      <Typography align="center">
        The transform attribute can be used for this purpose.
      </Typography>
      <Typography align="center" style={{ marginTop: 10 }}>
        Your current solution will be displayed in red.
      </Typography>
    </>
  );
}

export default Level2;
