import React, { Component } from "react";
import { get, list } from "../Scripts/Storage";

export default class ProjectList extends Component {
  state = {
    files: []
  };
  componentDidMount() {
    const onThen = res => {
      res.forEach(console.log);
      this.setState({ files: res });
    };
    const onCatch = err => {
      console.log("err:", err);
    };
    list("", "public", onThen, onCatch);
    //WORKS get("OSL-PDL.png", "public");
  }
  render() {
    let { files } = this.state;
    return (
      <div className="container">
        <div className="row">
          <h2>Project List</h2>
          </div>
          <div className="row">
          <ul>
          {files.map((file, ind) => (
            
              <li key={ind}>{file.key + ' ' + Math.round(file.size/1024) + 'KB'}</li>
            
          ))}
          </ul>
        </div>
      </div>
    );
  }
}
