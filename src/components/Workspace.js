import React, { Component, setState } from "react";
import InputURL from "./Input-urls";
import Viewer from "./Viewer";
import Tray from "./Tray";

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = { urlValue: "", responseValue: "", trayValue: "" };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleJsonResponse = this.handleJsonResponse.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
  }

  handleUrlChange(url) {
    console.log("handleURLChange");
    this.setState({ urlValue: url });
    console.log(url);
  }

  handleJsonResponse(value) {
    this.setState({ responseValue: value });
    console.log("Handled JSON Response");
  }

  handleValueClick(value) {
    this.setState({ trayValue: value });
    console.log("HANDLED VALUE CLICK");
  }

  render() {
    const { urlValue, responseValue, trayValue } = this.state;
    return (
      <div>
        <Tray value={trayValue} />
        <InputURL
          copy={this.props.copy}
          value={urlValue}
          handleUrlChange={this.handleUrlChange}
          handleJsonResponse={this.handleJsonResponse}
        />
        <Viewer
          value={responseValue}
          handleValueClick={this.handleValueClick}
        />
      </div>
    );
  }
}

export default Workspace;
