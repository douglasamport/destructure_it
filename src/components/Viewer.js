import React, { Component } from "react";
import "./Viewer.css";

/*
TODO: 
1. Add in Context that allows us to track depth  https://codesandbox.io/s/get-call-depth-inside-react-component-demo-grvsi?file=/src/CountDepthContext.tsx
2. use depth to help setup formatting, depth will only change for each ObjectParser that is called.
3. add check for string null undefined etc see note below
4. build in check and handling for arrays
5. 
fi
*/
class ObjectParser extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    // add in check for string, num, null, undefined here so that we can use this component recursivly
    const obj = this.props.obj;
    const type = this.props.type ? this.props.type : "";
    // console.log(obj);
    if (typeof obj === "string") {
      return (
        <>
          <span className={`awesome ${type}`} data-value={obj}>
            '{obj}'
          </span>
        </>
      );
    }

    if (typeof obj === "number") {
      return (
        <>
          <span className={`awesome ${type}`} data-value={obj}>
            {obj}
          </span>
        </>
      );
    }

    if (typeof obj === "object" && obj !== null && obj !== undefined) {
      return (
        <span className="objectContainer">
          <span className="parenthesis, open">&#123;</span>{" "}
          <KeyValueParser obj={obj} />
          <span className="parenthesis, close">&#125;</span>
        </span>
      );
    }

    // if (typeof obj === "object" && obj !== null && obj !== undefined) {
    //   return (
    //     <div className="objectContainer">
    //       <div className="parenthesis, open">&#123;</div>
    //       <KeyValueParser obj={obj} />
    //       <div className="parenthesis, close">&#125;</div>
    //     </div>
    //   );
    // }
  }
}
function getType(obj) {
  // console.log(typeof obj, "SHOULD BE TYPE");
  return typeof obj;
}
class KeyValueParser extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
  render() {
    const pairsContainerStyle = {
      paddingLeft: "20px",
    };

    const obj = this.props.obj;
    const keys = Object.keys(obj);

    return (
      <div className="pairsContainer" style={pairsContainerStyle}>
        {keys.map((objKey, i) => {
          const value = obj[objKey];
          const props = {
            key: i,
            value,
            objKey,
            type: getType(value),
          };
          return <LineParser {...props} />;
        })}
      </div>
    );
  }
}

class LineParser extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { objKey: key, value, type } = this.props;

    return (
      <div className="pair">
        <span className="key">{key}</span>
        <span className="colon">:</span>
        <span>
          <ObjectParser obj={value} type={type} />
        </span>
        {/* <span className={`value, ${type}`} data-value={value}>
          {value}
        </span> */}
      </div>
    );
  }
}

// if (typeof)

// console.log(typeof obj, "object");
// console.log(typeof "string", "string");
// console.log(typeof 45, "number");
// console.log(typeof 5.678, "float");
// console.log(typeof null, "null");
// console.log(typeof undefined, "undefined");
// console.log(typeof NaN, "NaN");
// console.log(Array.isArray([1, 2, 3]));

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

    const obj = this.props.value ? this.props.value : "";
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
