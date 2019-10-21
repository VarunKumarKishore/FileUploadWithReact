
import React, { Component } from 'react';
import axios from 'axios';

export default class FileUploadService{


  fileUpload = (uploadRequest) => {

    return axios.post('http://localhost:8080/uploadFile', uploadRequest);
  }
}
