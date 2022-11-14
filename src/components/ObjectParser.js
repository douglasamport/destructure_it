import React, { Component } from "react";
import { domCrawler, simpleObjectBuilder } from "../utils/index";

export default class ObjectParser extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const path = domCrawler(e.target);
    console.log(path);
    const simpleObject = simpleObjectBuilder(path);
    this.props.handleValueClick(simpleObject);
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

function ArrayLineParser({
  objKey: key,
  value,
  type,
  parent,
  handleValueClick,
}) {
  //prettier-ignore-line
  //   console.log("ARRAY");
  const props = { obj: value, type, handleValueClick, key };
  return (
    <div className="pair" data-object-type={parent}>
      <span style={{ display: "none" }} className="key">
        {key}
      </span>
      <ObjectParser {...props} />
    </div>
  );
}
