import React from "react";
import spinner from "../spinner.svg";

export interface Props {
  isVisible: boolean;
}

export function Spinner(props: Props) {
  return (
    <React.Fragment>
      {props.isVisible && (
        <img
          src={spinner}
          className="App-logo"
          alt="logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 999,
            height: "2em",
            width: "2em"
          }}
        />
      )}
    </React.Fragment>
  );
}
