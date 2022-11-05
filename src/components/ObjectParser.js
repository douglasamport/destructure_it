import React, { Component } from "react";

/*
TODO: 
1. Add in Context that allows us to track depth  https://codesandbox.io/s/get-call-depth-inside-react-component-demo-grvsi?file=/src/CountDepthContext.tsx
2. use depth to help setup formatting, depth will only change for each ObjectParser that is called.
3. add check for string null undefined etc see note below

*/
export default class ObjectParser extends Component {
  renderValue(type, obj, dataValue) {
    return (
      <span className={`value ${type}`} data-value={dataValue}>
        '{obj}'
      </span>
    );
  }

  renderContainer(parent, obj, open = "{", close = "}") {
    const props = { obj, parent };
    return (
      <span className="objectContainer">
        <span className="bracket, open">{open}</span>
        <KeyValueParser {...props} />
        <span className="bracket, close">{close}</span>
      </span>
    );
  }

  render() {
    const { obj, type } = this.props;

    if (obj === NaN) return this.renderValue("nan", "nan", "nan");

    if (obj === undefined)
      return this.renderValue("undefined", "undefined", obj);

    if (obj === null) return this.renderValue("null", "null", "null");

    if (typeof obj === "string") return this.renderValue(type, obj, obj);

    if (typeof obj === "number") return this.renderValue(type, obj, obj);

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

    const { obj, parent } = this.props;
    const keys = Object.keys(obj);

    return (
      <div className="pairsContainer" style={pairsContainerStyle}>
        {keys.map((objKey, i) => {
          const value = obj[objKey];
          const props = {
            key: i,
            value,
            objKey,
            type: typeof value,
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

function LineParser({ objKey: key, value, type, parent }) {
  return (
    <div className="pair">
      <span className="key">{key}</span>
      <span className="colon">:</span>
      <span>
        <ObjectParser obj={value} type={type} />
      </span>
    </div>
  );
}

function ArrayLineParser({ value, type }) {
  return (
    <div className="pair">
      <span>
        <ObjectParser obj={value} type={type} />
      </span>
    </div>
  );
}
