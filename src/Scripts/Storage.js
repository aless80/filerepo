import axios from "axios";
// S3 storage
import Amplify, { Storage } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);
Storage.configure({ level: "public" });

// AWS.S3: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//used by https://read.acloud.guru/build-your-own-multi-user-photo-album-app-with-react-graphql-and-aws-amplify-374800b22e96
//const AWS = require('aws-sdk');
//const S3 = new AWS.S3({ signatureVersion: 'v4' });

export const put = (formdata, onThen, onCatch, progressCb = prog => {}) => {
  /*console.log('formdata.get("file").name:', formdata.get("file").name);
  console.log('formdata.get("file"):', formdata.get("file"));
  console.log('formdata.get("radio"):', formdata.get("radio"));
  console.log('formdata.get("level"):', formdata.get("level"))
  */
  // Get metadata
  const metadata = {};
  formdata.forEach((value, key) => {
    metadata[key] = value;
  });
  delete metadata.file;

  // Send to S3
  Storage.put(formdata.get("file").name, formdata.get("file"), {
    level: formdata.get("level"),
    contentType: formdata.get("file").type,
    //customPrefix: customPrefix, //no work
    //customPrefix: {public: "Public/"}, //no work
    metadata: metadata,
    progressCallback(progress) {
      progressCb(progress);
    }
  })
    .then(res => {
      onThen(res);
    })
    .catch(err => {
      onCatch(err);
    });
};

export const put_local = (formdata, onThen, onCatch, progressCb) => {
  let config = { onUploadProgress: onCatch };
  axios
    .post("http://localhost:8000/upload", formdata, config)
    .then(res => {
      onThen(res);
    })
    .catch(err => {
      onCatch(err);
    });
};

export const list = (dir, level, onThen, onCatch) => {
  Storage.list(dir, {
    level
    //identityId: 'identityId of another user'
  })
    .then(res => {
      console.log("list('" + dir + "','" + level + "'):");
      onThen(res)
    })
    .catch(err => onCatch(err));
};

export const get = (filename, level) => {
  Storage.get(filename, {
    level,
    expires: 60
    //identityId: "identityId of another user"
  })
    .then(res => {
      console.log("get('" + filename + "','" + level + "'):");
      console.log(res);
    })
    .catch(err => console.log(err));
};

export const remove = (filename, level) => {
  Storage.remove(filename, { level, expires: 60 })
    .then(res => console.log("Get:", res))
    .catch(err => console.log(err));
};
