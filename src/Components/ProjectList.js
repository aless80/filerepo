import React, { Component } from "react";
import { list } from "../Scripts/Storage";
//import { Link } from "react-router-dom";
import awsconfig from "../aws-exports";
//To get Metadata of S3 objects:
/*import AWS from 'aws-sdk';
AWS.config.update({
  region: awsconfig.aws_cognito_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsconfig.aws_cognito_identity_pool_id
  })
});
var S3 = new AWS.S3
*/

export const TRUNCATION_LIMIT = 290;
export const PAGE_SIZE = 20;

export default class ProjectList extends Component {
  state = {
    files: [],
    sortBy: "filename",
    direction: "desc",
    isLoading: true,
    currentPage: undefined
  };
  pagesCount = 0;
  dataSetSize = undefined;
  unsubscribe = null;

  componentDidMount() {
    const onThen = res => {
      res.forEach(obj => {
        console.log('compoentDidMount > list > onThen > obj:',obj)
        /*console.log('new AWS.S3:', S3)
        S3.headObject({Bucket: obj.level, Key: obj.key}, (err, data) => console.log('S3.headObject err:', err))
        */
      });

      this.setState({
        ...this.state,
        files: [...this.state.files, ...res],
        currentPage: 0
      });
    };
    const onFinish = res => {
      res.forEach(console.log);
      this.setState({
        ...this.state,
        files: [...this.state.files, ...res],
        currentPage: 0,
        isLoading: false
      });
    };
    const onCatch = err => {
      console.log("err:", err);
    };
    list("", "public", onThen, onCatch);
    list("", "private", onFinish, onCatch);
    //get("profile.jpg", "public") #to get the metadata, but it returns the object itself as well

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //Sort the files
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.direction !== prevState.direction
    ) {
      let files = this.state.files.sort(
        this.dynamicSort(this.state.sortBy, this.state.direction)
      );
      this.setState({ ...this.state, files: files, isLoading: false });
    }
  }
  dynamicSort = (key, order = "desc") => {
    var sortOrder = 1;
    if (order === "desc") {
      sortOrder = 1;
    } else if (order === "asc") {
      sortOrder = -1;
    }
    return (a, b) => {
      let result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      return result * sortOrder;
    };
  };
  renderSorting(targetname) {
    if (this.state.sortBy !== targetname) {
      return "";
    }
    return this.state.direction === "desc" ? "\u00A0\u25B4" : "\u00A0\u25BE";
  }
  onDoubleClickHeader(event) {
    event.stopPropagation();
    // Block event on <span>
    if (event.target.tagName !== "TH") return;
    // Set sortBy and direction in state based on previous state and what was clicked
    let targetname = event.target.attributes.name.nodeValue;
    let direction = "desc";
    if (this.state.sortBy === targetname) {
      direction = this.state.direction === "desc" ? "asc" : "desc";
    }
    this.setState({
      ...this.state,
      isLoading: true,
      sortBy: targetname,
      direction
    });
  }

  //Print a string with the time difference between the input Date and now
  timeDifference = previous => {
    if (!previous) return "";
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 7;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    const current = Date.now();
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerHour * 2) {
      return Math.round(elapsed / msPerHour) + " hour ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerDay * 2) {
      return Math.round(elapsed / msPerDay) + " day ago";
    } else if (elapsed < msPerWeek * 2) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerWeek) + " weeks ago";
    } else if (elapsed < msPerMonth * 2) {
      return Math.round(elapsed / msPerMonth) + " month ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } /*else if (elapsed < msPerYear * 2) {
      return Math.round(elapsed / msPerYear) + " year ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }*/ else {
      return this.getDateTime(previous);
    }
  };

  render() {
    let { files, isLoading, currentPage } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <br />
          {isLoading && <div className="spinner" />}
          {!isLoading && (
            <div className="panel-body">
              <div>
                <div className="tablePosts">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th
                          name="key"
                          onDoubleClick={event =>
                            this.onDoubleClickHeader(event)
                          }
                        >
                          File Name
                          <span>{decodeURI(this.renderSorting("key"))}</span>
                        </th>
                        <th
                          name="level"
                          onDoubleClick={event =>
                            this.onDoubleClickHeader(event)
                          }
                        >
                          Permission
                          <span>{decodeURI(this.renderSorting("level"))}</span>
                        </th>
                        <th
                          name="size"
                          onDoubleClick={event =>
                            this.onDoubleClickHeader(event)
                          }
                        >
                          Size
                          <span>{decodeURI(this.renderSorting("size"))}</span>
                        </th>
                        <th
                          name="timestamp"
                          onDoubleClick={event =>
                            this.onDoubleClickHeader(event)
                          }
                        >
                          Last modified
                          <span>
                            {decodeURI(this.renderSorting("timestamp"))}
                          </span>
                        </th>
                        {/*<th
                          name="comment"
                          onDoubleClick={event =>
                            this.onDoubleClickHeader(event)
                          }
                        >
                          Comment
                          <span>
                            {decodeURI(this.renderSorting("comment"))}
                          </span>
                        </th>
                        */}
                      </tr>
                    </thead>

                    <tbody>
                      {files.length === 0 && (
                        <tr className="border-bottom-0">
                          <td>No files</td>
                        </tr>
                      )}
                      {files.length > 0 &&
                        files
                          .slice(
                            currentPage * PAGE_SIZE,
                            (currentPage + 1) * PAGE_SIZE
                          )
                          .map((file, i) => (
                            <tr
                              key={file.key}
                              className={"alt" + ((i % 2) + 1)}
                            >
                              <td>
                                <a
                                  href={`https://${awsconfig.aws_user_files_s3_bucket}.s3.${awsconfig.aws_user_files_s3_bucket_region}.amazonaws.com/public/${file.key}`}
                                  target="_blank" rel="noopener noreferrer"
                                >
                                  {file.key}
                                </a>
                              </td>
                              <td>{file.level}</td>
                              {/*<td>{file.dir}</td>*/}
                              <td>{Math.round(file.size / 1024) + "KB"}</td>
                              <td title="time">
                                {this.timeDifference(file.lastModified)}
                              </td>
                              {/*<td>TODO: {file.comment}</td>*/}
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>

                {/*<Pagination
                currentPage={this.state.currentPage}
                pagesCount={this.pagesCount}
                handlePageClick={(event, page) => this.pageClick(event, page)}
              />*/}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
