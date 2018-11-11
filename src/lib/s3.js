'use strict';

const fs = require('fs-extra');

const aws = require('aws-s3');

const amazonS3 = new aws.S3();

const s3 = module.exports = {};

s3.pUpload = (path, key) => {
  const uploadOptions = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-rend',
    Body: fs.createReadStream(path),
  };
  return amazonS3.upload(uploadOptions)
    .promise()
    .then((response) => {
      return fs.remove(path)
        .then(() => response.Location);
    })
    .catch((uploadError) => {
      return fs.remove(path)
        .then(() => Promise.reject(uploadError))
        .catch(() => Promise.reject(uploadError));
    });
};

s3.pRemove = (key) => {
  const removeOptions = {
    Key: key,
    Bucket: process.env.AWS_BUCKET,
  };
  // returning a promise
  return amazonS3.deleteObject(removeOptions).promise();
};
