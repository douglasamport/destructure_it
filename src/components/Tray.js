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
            <StructureBuilder value={value} />
          </div>
        </div>
      </div>
    );
  }
}

//WORKING HERE   May need to add Parent key So that we can tell who has parents and if they need brackets

//Commas parens and index not working as I expected.

class StructureBuilder extends Component {
  render() {
    let { value: pathObjects } = this.props;
    let renderContainer = [];
    let groupParens = false;

    console.log(pathObjects, "value in strucutre builder");
    if (!pathObjects.length) return <></>;
    const totalLength = pathObjects.length;
    if (totalLength > 1) groupParens = true;
    pathObjects.forEach((object, index) => {
      let [open, close, comma] = ["{", "}", ""];
      if (groupParens) {
        open = "";
        close = "";
        if (index === 0) open = "{";
        if (index === totalLength - 1) close = "}";
        if (index !== totalLength - 1) comma = ",";
      }
      let block;
      if (object.children) {
        pathObjects = object.children;
        block = (
          <div>
            <span>{open}</span>
            <span>{`${object.value}`}</span>
            <span>{":"}</span>
            {<StructureBuilder value={pathObjects} />}
            <span>{`${close}${comma}`}</span>
          </div>
        );
      } else {
        block = (
          <>
            <span>{open}</span>
            <span>{`${object.value}${comma}`}</span>
            <span>{close}</span>
          </>
        );
      }
      renderContainer.push(block);
    });
    return renderContainer;
  }
}

export default Tray;
