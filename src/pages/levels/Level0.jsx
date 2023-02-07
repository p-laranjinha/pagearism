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

function Level0({ storageKey }) {
  React.useEffect(() => {
    document.title = "Level 0 (Hello World!) - Pagearism";
  }, []);

  const [completed, setCompleted] = React.useState(false);

  // Solution

  const correctSolution = {
    decoration: "underline",
  };

  const [solution, setSolution] = React.useState({
    decoration: "none",
  });

  const successFunction = () => {
    let success = JSON.stringify(solution) === JSON.stringify(correctSolution); // Order matters
    if (success) {
      setCompleted(true);
      localStorage.setItem(storageKey, JSON.stringify({ completed: true }));
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
        completed={completed}
      />
    </>
  );
}

function CssComponent({ solution, setSolution }) {
  const decorations = [
    "blink",
    "grammar-error",
    "inherit",
    "initial",
    "line-through",
    "none",
    "overline",
    "revert",
    "spelling-error",
    "underline",
    "unset",
  ];

  return (
    <CBContainer>
      <CBTop>{"span {"}</CBTop>
      <CBLine>
        <CBLeft>{"  text-decoration-line: "}</CBLeft>
        <select
          value={solution.decoration}
          onChange={(e) =>
            setSolution({ ...solution, decoration: e.target.value })
          }
        >
          <option value="" hidden></option>
          {decorations.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <CBRight>{";"}</CBRight>
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
    <title>Level 0 (Hello World!) - Pagearism</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <span>Hello World!</span>
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
        padding: 8,
      }}
    >
      <span
        style={{
          color: "black",
          textDecorationLine: solution.decoration,
        }}
      >
        Hello World!
      </span>
    </div>
  );
}

function HelpComponent() {
  return (
    <>
      <Typography align="center" style={{ marginTop: 10 }}>
        Welcome to the first level of Pagearism.
      </Typography>
      <Typography align="center" style={{ marginTop: 10 }}>
        In this level the objective is to add an underline to the "Hello World!"
        displayed on the right.
      </Typography>
      <Typography align="center" style={{ marginTop: 10 }}>
        There aren't any timers or counters in this level, so you can take your
        time getting used to the user interface!
      </Typography>
    </>
  );
}

export default Level0;
