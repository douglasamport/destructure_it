import React, { Component } from "react";
import "./css/Viewer.css";

class Tray extends Component {
  render() {
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

    return (
      <div>
        <div className="sub-header" style={subHeaderStyle}></div>
        <div className="section-body" style={flexRow}>
          <p className="label" style={labelStyle}>
            Tray
          </p>

          <div className="mainViewer" style={mainViewerStyle}>
            {/* <TrayParser {...props} /> */}
          </div>
        </div>
      </div>
    );
  }
}

class TrayParser extends Component {
  state = {};

  renderContainer(value, open = "{", close = "}") {
    return (
      <span className="objectContainer">
        <span className="bracket, open">{open}</span>
        <span>{value}</span>
        <span className="bracket, close">{close}</span>
      </span>
    );
  }

  render() {
    const { value } = this.props;

    //Build Reducer Function to parse the values correctly

    return value.map((array) => {
      return array.map((obj) => {
        return (
          <>{/* <span>{this.renderContainer(obj.value, "{", "}")}</span> */}</>
        );
      });
    });
  }
}
export default Tray;
