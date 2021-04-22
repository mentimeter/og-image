import React from "react";
import ReactDOM from "react-dom/server";
import { TemplateData } from "./types";

function getCss() {
  let background = "white";
  let foreground = "black";
  let radial = "lightgray";
  return `
    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: sans-serif;
        font-size: 96px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
        text-align: center;
    }`;
}

const MentiLogo: React.FC = (props) => (
  <svg
    viewBox="0 0 803.87 676.39"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    height="255"
    width="255"
    className="r-svg"
    {...props}
  >
    <title>Mentimeter Logo</title>
    <g>
      <g fill="#000000">
        <polygon
          fill="#FFB9D0"
          points="67.06 663 532.44 663 201.01 0 67.06 0 67.06 663"
        ></polygon>
        <polygon
          fill="#196CFF"
          points="602.86 0 602.86 133.95 468.91 133.95 468.91 267.9 334.96 267.9 334.96 663 736.81 663 736.81 0 602.86 0"
        ></polygon>
        <path
          fill="#FF80AB"
          d="M67.06,267.9V663H468.85C465.23,444.16,286.73,267.9,67.06,267.9Z"
        ></path>
        <path
          fill="#FF403D"
          d="M67.06,468.82V662.9h200.8C264.25,555.11,175.74,468.82,67.06,468.82Z"
        ></path>
        <rect y="662.97" width="803.87" height="13.41"></rect>
      </g>
    </g>
  </svg>
);

const Page: React.FC = ({ children }) => (
  <html>
    <meta charSet="utf-8" />
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${getCss()}</style>
    <body>
      <div>
        <div className="spacer" />
        <div className="logo-wrapper">
          <MentiLogo />
        </div>
        <div className="spacer" />
        <div className="heading">{children}</div>
      </div>
    </body>
  </html>
);

export function getHtml(templateData: TemplateData) {
  const { text } = templateData;
  const content = ReactDOM.renderToString(
    <Page>
      <div>{text}</div>
    </Page>
  );
  return `<!DOCTYPE html>${content}`;
}
