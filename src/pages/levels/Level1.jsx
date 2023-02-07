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

function Level1({ storageKey }) {
  React.useEffect(() => {
    document.title = "Level 1 (Square) - Pagearism";
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

  // Trophy
  const [trophy, setTrophy] = React.useState("gold"); // color
  React.useEffect(() => {
    if (completed) return;
    if (edits <= editsTrophies.gold) setTrophy("gold");
    else if (edits <= editsTrophies.silver) setTrophy("silver");
    else if (edits <= editsTrophies.bronze) setTrophy("chocolate");
    else setTrophy("black");
  }, [edits]);

  const successFunction = () => {
    let success = JSON.stringify(solution) === JSON.stringify(correctSolution); // Order matters
    if (success) {
      setCompleted(true);
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          trophy: trophy,
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
    <title>Level 1 (Square) - Pagearism</title>
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
        In this level your job is to display the square in black on the right.
      </Typography>
      <Typography align="center">
        Your current solution will be displayed in red but be careful with using
        it to fine tune the solution, as your edits are being counted!
      </Typography>
    </>
  );
}

export default Level1;
