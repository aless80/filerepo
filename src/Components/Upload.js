//https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
import React, { Component } from "react";
//import { FaSearch } from 'react-icons/fa';
//import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { put } from "../Scripts/Storage";
//import { put_local  } from "../Scripts/Storage";
import "./Upload.css";

export default class Upload extends Component {
  state = {
    radio: null, //needed cause radio buttons get instantiated after mount
    loaded: null,
    formdata: null,
    value: null
  };
  refs = React.createRef();
  maxNumFiles = 1;
  fileTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "application/pdf",
    "application/zip"
  ];
  maxSize = 1500;
  languages = ["Jupyter Notebook (Python)", "Python", "MATLAB", "Javascript", "Other"];
  toast_config = {
    position: toast.POSITION.BOTTOM_CENTER
  };
  onFileSelectHandler = event => {
    event.preventDefault();
    //console.log(event.target.files[0]);
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkMimeType(event)
    ) {
      this.setState({
        loaded: 0
      });
    }
  };
  onUploadHandler = () => {
    // Get the data in the form
    const formdata = new FormData(this.refs.form);
    formdata.append("radio", this.state.radio);
    for (var pair of formdata.entries()) {
      console.log("  " + pair[0] + ", " + pair[1] + ", type=" + typeof(pair[1]));
    }    
    this.setState({ formdata });

    // Callbacks on uploading
    const onThen = res => {
      toast.success("Upload successful", this.toast_config);
    };
    const onCatch = err => {
      toast.error("Upload failed");
      console.error(err, this.toast_config);
    };
    const onUploadProgress = progress => {
      this.setState({
        loaded: Math.round((progress.loaded * 100) / progress.total)
      });
    };

    // Send to backend
    //put_local(formdata, onThen, onCatch, onUploadProgress);

    // Send to S3
    put(formdata, onThen, onCatch, onUploadProgress);
  };

  maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > this.maxNumFiles) {
      const msg =
        "Only " + this.maxNumFiles + " files can be uploaded at a time";
      event.target.value = null;
      console.log(msg);
      return false;
    }
    return true;
  };

  checkMimeType = event => {
    let files = event.target.files;
    let err = [];
    for (let x = 0; x < files.length; x++) {
      if (this.fileTypes.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // loop create toast massage
      event.target.value = null;
      toast.error(err[z], this.toast_config);
    }
    return true;
  };

  checkFileSize = event => {
    let files = event.target.files;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > this.maxSize) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z], this.toast_config);
      event.target.value = null;
    }
    return true;
  };

  render() {
    const radioStyle = { marginRight: "3px", marginBottom: "0" };
    return (
      <div className="container">
        <div className="row">
          <form method="post" action="#" id="#" ref="form">
            <div>
              <h2>Upload Form</h2>
              <h4>Programming language</h4>
              <div className="form-group">
                {this.languages.map((lang, ind) => (
                  <div key={"div_" + ind}>
                    <label style={radioStyle}>
                      <input
                        type="radio"
                        name="radio"
                        key={"radio_" + ind}
                        style={radioStyle}
                        value={lang}
                        //onChange={this.onClickRadioHandler}
                      />
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
              <h4>Comment</h4>
              <div className="form-group">
                <input
                  type="text"
                  name="comment"
                  className="form-control"
                  maxLength="100"
                />
              </div>

              <h4>Permissions</h4>
              <div className="form-group">
                <label style={radioStyle}>
                  <input
                    type="radio"
                    name="level"
                    key="radiopublic"
                    value="public"
                    style={radioStyle}
                    defaultChecked
                  />
                  Public
                </label>
                <br />
                <label style={radioStyle}>
                  <input
                    type="radio"
                    name="level"
                    key="radioprivate"
                    value="private"
                    style={{ marginRight: "3px" }}
                  />
                  Private
                </label>
              </div>
            </div>
            <h4>File</h4>
            <div className="form-group">
              <input
                type="file"
                name="file"
                className="form-control-file"
                lang="en"
                onChange={this.onFileSelectHandler}
                placeholder="Browse files"
              />
            </div>
            <ToastContainer autoClose={2000} />
            {this.state.loaded != null && (
              <div>
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={this.onUploadHandler}
                >
                  Upload
                </button>
                {this.state.loaded > 0 && this.state.loaded < 100 && (
                  <div style={{ marginTop: "10px" }}>
                    <Progress
                      max="100"
                      color="success"
                      value={this.state.loaded}
                    >
                      {Math.round(this.state.loaded, 2)}%
                    </Progress>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}
