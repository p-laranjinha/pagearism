import * as React from "react";
import "./CodeBlock.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function CBFull({ language = "html", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{ height: "100%" }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function CBContainer({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function CBTop({ language = "css", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{ paddingBottom: 0 }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function CBMiddle({ language = "css", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{ paddingTop: 0, paddingBottom: 0 }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function CBBottom({ language = "css", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{ paddingTop: 0, flexGrow: 1 }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function CBLine({ children }) {
  return (
    <div style={{ display: "flex", height: "fit-content" }}>{children}</div>
  );
}

export function CBLeft({ language = "css", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        width: "fit-content",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function CBCenter({ language = "css", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{
        padding: 0,
        width: "fit-content",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function CBRight({ language = "css", children }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vs2015}
      customStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        flexGrow: 1,
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
