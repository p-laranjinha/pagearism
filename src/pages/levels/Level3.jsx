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

function Level3({ storageKey }) {
  React.useEffect(() => {
    document.title = "Level 3 (calc) - Pagearism";
  }, []);

  const [completed, setCompleted] = React.useState(false);

  // Solution

  const correctSolution = {
    width: "calc(50% - 20px)",
    height: "25%",
  };

  const [solution, setSolution] = React.useState({
    width: "",
    height: "",
  });

  // Score

  const editsTrophies = {
    gold: 3,
    silver: 6,
    bronze: 9,
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
    gold: { hours: 0, minutes: 1, seconds: 0 },
    silver: { hours: 0, minutes: 2, seconds: 0 },
    bronze: { hours: 0, minutes: 5, seconds: 0 },
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
        {`body {
  margin: 0;
}

.red {
  position: absolute;
  background-color: red;
  left: 20px;`}
      </CBTop>
      <CBLine>
        <CBLeft>{"  width: "}</CBLeft>
        <input
          value={solution.width}
          onChange={(e) => setSolution({ ...solution, width: e.target.value })}
          onBlur={() => setFocus(!focus)}
        />
        <CBRight>{";"}</CBRight>
      </CBLine>
      <CBLine>
        <CBLeft>{"  height: "}</CBLeft>
        <input
          value={solution.height}
          onChange={(e) => setSolution({ ...solution, height: e.target.value })}
          onBlur={() => setFocus(!focus)}
        />
        <CBRight>{";"}</CBRight>
      </CBLine>
      <CBBottom>{`

.green {
  position: absolute;
  background-color: green;
  width: 20px;
  height: 25%;
}

.blue {
  position: absolute;
  background-color: blue;
  top: 25%;
  width: 50%;
  height: 100px;
}`}</CBBottom>
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
    <title>Level 3 (calc) - Pagearism</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="red"></div>
    <div class="green"></div>
    <div class="blue"></div>
  </body>
</html>
`}
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
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
          left: "20px",
          width: "calc(50% - 20px)",
          height: "25%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: "20px",
          height: "25%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "blue",
          top: "25%",
          width: "50%",
          height: "100px",
        }}
      ></div>
    </div>
  );
}

function HelpComponent() {
  return (
    <>
      <Typography align="center" style={{ marginTop: 10 }}>
        Your job in this level is to fix the code in order to make it represent
        what is displayed on the right, as the red box in the code doesn't match
        the red box displayed.
      </Typography>
      <Typography align="center" style={{ marginTop: 10 }}>
        Because of how the width of the green and blue box were defined, you
        might have to use the "calc()" tool! For example,
        <CBFull language="css">calc(100px + 5cm)</CBFull>
        would output the addition of 100 pixels and 5 centimeters.
      </Typography>
      <Typography align="center" style={{ marginTop: 10 }}>
        You will not be able to see your current solution displayed, and you are
        both being timed and having your edits counted.
      </Typography>
    </>
  );
}

export default Level3;
