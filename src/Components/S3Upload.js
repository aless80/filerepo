import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import Amplify, { API, graphqlOperation, Storage } from "aws-amplify";
export default class S3Upload extends Component {
  state = { uploading: false };
  customPrefix = {
    public: "Public/",
    protected: "Protected/",
    private: "Private/"
  };
  onChange = async e => {
    const file = e.target.files[0];
    const fileName = uuid();
    this.setState({ uploading: true });
    const result = Storage.put(fileName, file, {
      //customPrefix: this.customPrefix,
      metadata: this.props.metadata
    })
      .then(res => {
        console.log("res:", res);
      })
      .catch(err => {
        console.log("err:", err);
      });
    console.log("Uploaded file: ", result);
    this.setState({ uploading: false });
  };
  render() {
    return (
      <div>
        <input
          type="button"
          onClick={() =>
            document.getElementById("add-image-file-input").click()
          }
          disabled={this.state.uploading}
          icon="file image outline"
          value={this.state.uploading ? "Uploading..." : "Add Image"}
        />
        <input
          id="add-image-file-input"
          type="file"
          accept="image/*"
          onChange={this.onChange}
          style={{ display: "none" }}
        />
      </div>
    );
  }
}
