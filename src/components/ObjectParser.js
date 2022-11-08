import React, { Component } from "react";
import domCrawler from "./process";
/*
TODO: 
1. Add in Context that allows us to track depth  https://codesandbox.io/s/get-call-depth-inside-react-component-demo-grvsi?file=/src/CountDepthContext.tsx
2. use depth to help setup formatting, depth will only change for each ObjectParser that is called.
3. add check for string null undefined etc see note below

*/
export default class ObjectParser extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e.target);
    const path = domCrawler(e.target);
    console.log(path, "PATH");
    console.log(this.props, "PROPS");
    this.props.handleValueClick(path);
  }

  renderValue(type, obj, dataValue) {
    return (
      <span
        onClick={this.handleClick}
        className={`value ${type}`}
        data-value={dataValue}
      >
        '{obj}'
      </span>
    );
  }

  renderContainer(parent, obj, open = "{", close = "}") {
    const props = {
      obj,
      parent,
      handleValueClick: this.props.handleValueClick,
    };
    return (
      <span className="objectContainer">
        <span className="bracket, open">{open}</span>
        <KeyValueParser {...props} />
        <span className="bracket, close">{close}</span>
      </span>
    );
  }

  render() {
    const { obj } = this.props;
    const type = typeof obj;

    if (obj === undefined)
      return this.renderValue("undefined", "undefined", obj);

    if (obj === null) return this.renderValue("null", "null", "null");

    if (typeof obj === "string") return this.renderValue(type, obj, obj);

    if (typeof obj === "number") {
      return isNaN(obj)
        ? this.renderValue("nan", "NaN", "NaN")
        : this.renderValue(type, obj, obj);
    }
    if (typeof obj === "object" && Array.isArray(obj)) {
      return this.renderContainer("array", obj, "[", "]");
    }

    if (typeof obj === "object" && obj !== null && obj !== undefined) {
      return this.renderContainer("obj", obj);
    }
  }
}

class KeyValueParser extends Component {
  render() {
    const pairsContainerStyle = {
      paddingLeft: "20px",
    };

    const { obj, parent, handleValueClick } = this.props;
    const keys = Object.keys(obj);

    return (
      <div
        className="pairsContainer"
        style={pairsContainerStyle}
        data-object-type={parent}
      >
        {keys.map((objKey, i) => {
          const value = obj[objKey];
          const props = {
            key: i,
            value,
            objKey,
            type: typeof value,
            parent,
            handleValueClick,
          };

          return parent === "array" ? (
            <ArrayLineParser {...props} />
          ) : (
            <LineParser {...props} />
          );
        })}
      </div>
    );
  }
}

function LineParser({ objKey: key, value, type, parent, handleValueClick }) {
  const props = { obj: value, type, handleValueClick };
  return (
    <div className="pair" data-object-type={parent}>
      <span className="key">{key}</span>
      <span className="colon">:</span>
      <ObjectParser {...props} />
    </div>
  );
}

function ArrayLineParser({ value, type, parent, handleValueClick }) {
  //   console.log("ARRAY");
  const props = { obj: value, type, handleValueClick };
  return (
    <div className="pair" data-object-type={parent}>
      <ObjectParser {...props} />
    </div>
  );
}
