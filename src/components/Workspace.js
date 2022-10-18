import React, { Component, setState } from "react";
import InputURL from "./Input-urls";
import Viewer from "./Viewer";

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = { urlValue: "", responseValue: "" };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleJsonResponse = this.handleJsonResponse.bind(this);
  }

  handleUrlChange(url) {
    this.setState({ urlValue: url });
    console.log(url);
  }

  handleJsonResponse(value) {
    this.setState({ responseValue: value });
  }
  render() {
    const urlValue = this.state.urlValue;
    const responseValue = this.state.responseValue;
    return (
      <div>
        <InputURL
          copy={this.props.copy}
          value={urlValue}
          handleUrlChange={this.handleUrlChange}
          handleJsonResponse={this.handleJsonResponse}
        />
        <Viewer value={responseValue} />
      </div>
    );
  }
}

export default Workspace;
