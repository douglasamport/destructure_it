import React, { Component } from "react";
import "./css/Viewer.css";
import ObjectParser from "./ObjectParser";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { displayValue: "" };
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

    let obj = this.props.value ? this.props.value : "";
    if (obj) {
      obj.test = NaN;
      obj.testtwo = undefined;
      obj.testthree = null;
    }

    return (
      <div>
        <div className="sub-header" style={subHeaderStyle}></div>
        <div className="section-body" style={flexRow}>
          <p className="label" style={labelStyle}>
            Viewer
          </p>

          <div className="mainViewer" style={mainViewerStyle}>
            <ObjectParser obj={obj} />
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
