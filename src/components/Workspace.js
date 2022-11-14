import React, { Component, setState } from "react";
import InputURL from "./Input-urls";
import Viewer from "./Viewer";
import Tray from "./Tray";
import {
  reduceWrapperArray,
  domCrawler,
  simpleObjectBuilder,
} from "../utils/index";

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = { urlValue: "", responseValue: "", trayValue: [] };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleJsonResponse = this.handleJsonResponse.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
  }

  handleUrlChange(url) {
    this.setState({ urlValue: url });
  }

  handleJsonResponse(value) {
    this.setState({ responseValue: value });
    console.log("Handled JSON Response");
  }

  handleValueClick(value) {
    // console.log(value, "VALUE");
    const { trayValue = [] } = this.state;
    // console.log(trayValue);
    const array = [...trayValue, value];
    // console.log(array, "ARRAY");
    const newArray = reduceWrapperArray(array);
    // console.log(newArray, "COMBINED");
    this.setState({ trayValue: newArray }, () => {
      // console.log(this.state.trayValue, "Updated Tray Object");
    });
  }

  render() {
    const { urlValue, responseValue, trayValue } = this.state;
    const { copy } = this.props;
    // const trayProps = { pathObjects: trayValue };
    const inputUrlProps = {
      copy,
      value: urlValue,
      handleUrlChange: this.handleUrlChange,
      handleJsonResponse: this.handleJsonResponse,
    };
    const viewerProps = {
      value: responseValue,
      handleValueClick: this.handleValueClick,
    };

    return (
      <div>
        <Tray value={trayValue} />
        <InputURL {...inputUrlProps} />
        <Viewer {...viewerProps} />
      </div>
    );
  }
}

export default Workspace;
