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
} from "../../components/CodeBlock";
import { useStopwatch } from "react-timer-hook";

function Level0_1({ storageKey }) {
  React.useEffect(() => {
    document.title = "Test Level - Pagearism";
  }, []);

  const [completed, setCompleted] = React.useState(false);

  // Solution

  const correctSolution = {
    borderStyle: "solid",
    borderWidth: "1",
    width: "100",
    height: "100",
  };

  const [solution, setSolution] = React.useState({
    borderStyle: "dotted",
    borderWidth: "3",
    width: "50",
    height: "50",
  });

  // Score

  const editsTrophies = {
    gold: 5,
    silver: 10,
    bronze: 20,
  };

  const [edits, setEdits] = React.useState(-1);

  let delayEditsIncrease;
  React.useEffect(() => {
    if (completed) return;
    delayEditsIncrease = setTimeout(() => {
      setEdits(edits + 1);
    }, 1000);

    return () => {
      clearTimeout(delayEditsIncrease);
      delayEditsIncrease = null;
    };
  }, [solution]);

  const [focus, setFocus] = React.useState(true); // Used to increase edits on losing focus of input
  React.useEffect(() => {
    if (delayEditsIncrease) {
      clearTimeout(delayEditsIncrease);
      delayEditsIncrease = null;
    }
    setEdits(edits + 1);
  }, [focus]);

  // Stopwatch

  const timeTrophies = {
    gold: { hours: 0, minutes: 2, seconds: 0 },
    silver: { hours: 0, minutes: 5, seconds: 0 },
    bronze: { hours: 0, minutes: 10, seconds: 0 },
  };

  const stopwatch = useStopwatch({ autoStart: false });

  // Trophy
  const [trophy, setTrophy] = React.useState("gold"); // color
  React.useEffect(() => {
    if (completed) return;
    if (
      edits <= editsTrophies.gold &&
      (stopwatch.hours - timeTrophies.gold.hours) * 3600 +
        (stopwatch.minutes - timeTrophies.gold.minutes) * 60 +
        (stopwatch.seconds - timeTrophies.gold.seconds) <=
        0
    )
      setTrophy("gold");
    else if (
      edits <= editsTrophies.silver &&
      (stopwatch.hours - timeTrophies.silver.hours) * 3600 +
        (stopwatch.minutes - timeTrophies.silver.minutes) * 60 +
        (stopwatch.seconds - timeTrophies.silver.seconds) <=
        0
    )
      setTrophy("silver");
    else if (
      edits <= editsTrophies.bronze &&
      (stopwatch.hours - timeTrophies.bronze.hours) * 3600 +
        (stopwatch.minutes - timeTrophies.bronze.minutes) * 60 +
        (stopwatch.seconds - timeTrophies.bronze.seconds) <=
        0
    )
      setTrophy("chocolate");
    else setTrophy("black");
  }, [edits, stopwatch]);

  const successFunction = () => {
    let success = JSON.stringify(solution) === JSON.stringify(correctSolution); // Order matters
    if (success) {
      stopwatch.pause();
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
          edits: edits,
        })
      );
    }
    return success;
  };

  return (
    <>
      <LevelTemplate
        cssComponent={
          <CssComponent
            solution={solution}
            setSolution={setSolution}
            focus={focus}
            setFocus={setFocus}
          />
        }
        htmlComponent={<HtmlComponent />}
        targetComponent={<TargetComponent solution={solution} />}
        helpComponent={<HelpComponent />}
        successFunction={successFunction}
        edits={edits}
        stopwatch={stopwatch}
        trophy={trophy}
        completed={completed}
      />
    </>
  );
}

function CssComponent({ solution, setSolution, focus, setFocus }) {
  const borderStyles = [
    "dashed",
    "dotted",
    "double",
    "groove",
    "hidden",
    "inherit",
    "initial",
    "inset",
    "none",
    "outset",
    "revert",
    "ridge",
    "solid",
    "unset",
  ];

  return (
    <CBContainer>
      <CBTop>
        {`.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content {`}
      </CBTop>
      <CBLine>
        <CBLeft>{"  border: "}</CBLeft>
        <input
          type="number"
          value={solution.borderWidth}
          onChange={(e) =>
            setSolution({ ...solution, borderWidth: e.target.value })
          }
          onBlur={() => setFocus(!focus)}
        />
        <CBCenter>{"px "}</CBCenter>
        <select
          value={solution.borderStyle}
          onChange={(e) =>
            setSolution({ ...solution, borderStyle: e.target.value })
          }
          onBlur={() => setFocus(!focus)}
        >
          <option value="" hidden></option>
          {borderStyles.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <CBRight>{" black;"}</CBRight>
      </CBLine>

      <CBLine>
        <CBLeft>{"  width: "}</CBLeft>
        <input
          type="number"
          value={solution.width}
          onChange={(e) => setSolution({ ...solution, width: e.target.value })}
          onBlur={() => setFocus(!focus)}
        />
        <CBRight>{"px;"}</CBRight>
      </CBLine>

      <CBLine>
        <CBLeft>{"  height: "}</CBLeft>
        <input
          type="number"
          value={solution.height}
          onChange={(e) => setSolution({ ...solution, height: e.target.value })}
          onBlur={() => setFocus(!focus)}
        />
        <CBRight>{"px;"}</CBRight>
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
    <title>Level 1</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <div class="content"></div>
    </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "vertical",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              borderColor: "red",
              borderWidth: +solution.borderWidth,
              borderStyle: solution.borderStyle,
              width: +solution.width,
              height: +solution.height,
            }}
          ></div>
        </div>
      </div>
      <div style={{ position: "absolute", height: "100%", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "vertical",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{ border: "1px solid black", width: 100, height: 100 }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function HelpComponent() {
  return (
    <>
      <Typography align="center" style={{ marginTop: 10 }}>
        In this level you'll have to edit the fields in the CSS tab to display
        the black square on the right.
      </Typography>
      <Typography align="center">
        Your current solution will be displayed in red.
      </Typography>
    </>
  );
}

export default Level0_1;
