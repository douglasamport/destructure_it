import React, { Component } from "react";
import "./css/Viewer.css";
import ObjectParser from "./ObjectParser";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { displayValue: "" };
    // this.handleInbetweenClick = this.handleInbetweenClick.bind(this);
  }

  // // handleInbetweenClick(value) {
  //   this.props.handleValueClick(value);
  // }
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
    let test = "TEST VALUE";
    //, handleThingie: this.handleInbetweenClick
    const props = { test, obj, handleValueClick: this.props.handleValueClick };
    // console.log(
    //   this.props.handleValueClick,
    //   "PRINT PROPS AT VIEWER LEVEL <<<<<<<<"
    // );
    console.log("VIEWER RUNNING");
    //  NOTE -> HANDLE VALUE CLICK IS WORKING HERE>   NEED TO GET IT WORKING INSIDE OBJECT PARSER
    return (
      <div>
        <div className="sub-header" style={subHeaderStyle}></div>
        <div className="section-body" style={flexRow}>
          <p className="label" style={labelStyle}>
            Viewer
          </p>

          <div className="mainViewer" style={mainViewerStyle}>
            <ObjectParser {...props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
