import React, { Component } from "react";
import "./css/Viewer.css";
import ObjectParser from "./ObjectParser";

class Tray extends Component {
  constructor(props) {
    super(props);
    // this.state = { displayValue: "" };
  }

  state = {};
  render() {
    // console.log(this.props, "INSIDE VIEWER");
    const flexRow = {
      backgroundColor: "#FAFAFA",
      display: "flex",
      flexFlow: "row",
      justifyContent: "center",
      alignItems: "center",
    };

    const mainViewerStyle = {
      minWidth: "400px",
      minHeight: "100px",
      backgroundColor: "#fff",
      border: "1px solid black",
    };
    const labelStyle = {
      padding: "10px",
    };

    const subHeaderStyle = {
      height: "40px",
    };

    const { value } = this.props;
    console.log(value, "TRAY VALUE");

    return (
      <div>
        <div className="sub-header" style={subHeaderStyle}></div>
        <div className="section-body" style={flexRow}>
          <p className="label" style={labelStyle}>
            Tray
          </p>

          <div className="mainViewer" style={mainViewerStyle}></div>
        </div>
      </div>
    );
  }
}

export default Tray;
