import React, { Component } from "react";

// testing API https://www.boredapi.com/api/activity
// nested objects https://api.coindesk.com/v1/bpi/currentprice.json

//https://www.adidas.co.uk/api/products/IA3912   Figure out how to make you work!!!
class InputURL extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  handleChange(event) {
    this.props.handleUrlChange(event.target.value);
  }

  handleResponse(value) {
    this.props.handleJsonResponse(value);
  }

  handleSubmit(event) {
    this.fetchData(this.props.value);
    event.preventDefault();
  }

  fetchData(url) {
    const headers = {
      // credentials: "same-origin",
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-credentials": true,
      // "access-control-allow-headers": "*",
      "access-control-allow-methods": "GET,POST",
      // "sec-fetch-mode": "navigate",
      // "sec-fetch-site": "none",
    };
    const options = {
      credentials: "include",
      mode: "cors",
    };

    const server = "http://localhost:3000/";
    console.log(`${server}param?url=${url}`, "URL");
    fetch(`${server}param?url=${url}`, options)
      .then(async (response) => {
        console.log("Working");
        console.log(response);
        return await response.json();
      })
      .then((json) => {
        console.log(json.headers);
        this.handleResponse(json);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      inputUrl: { title, input },
    } = this.props.copy;
    // console.log(title, "<>", input);
    const flexRow = {
      backgroundColor: "#DBF3FA",
      display: "flex",
      flexFlow: "row",
      justifyContent: "center",
      alignItems: "center",
    };
    const labelStyle = {
      padding: "10px",
    };
    const submitStyle = {
      margin: "10px",
    };
    const urlInputStyle = {
      minWidth: "400px",
      maxHeight: "60px",
    };

    return (
      <div>
        <form
          className="c-urlinput"
          style={flexRow}
          onSubmit={this.handleSubmit}
        >
          <label style={labelStyle}>{title}</label>
          <input
            className="urlinput"
            style={urlInputStyle}
            placeholder={input}
            type="url"
            value={this.props.value}
            onChange={this.handleChange}
          ></input>
          <input style={submitStyle} type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default InputURL;
