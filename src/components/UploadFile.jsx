import React, { Component } from 'react';
import Dropzone  from 'react-dropzone';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';
import FileUploadService from '../service/FileUploadService';

export default class UploadFile extends Component {
  constructor(props){
    super(props);
    this.state={
      fileUploadInProgress : false,
      fileUploadSuccessfull : false,
      fileUploadFailed : false,
      fileName: null,
      uploadPercentage: 0
    };

    this.fileUploadService = new FileUploadService();
    console.log("inside UploadFile constructor");
  }

  handleUpload = (acceptedFiles) => {
    console.log("Uploaded File is "+acceptedFiles);
    var self = this;
    const reader = new FileReader();
    acceptedFiles.forEach(file => reader.readAsText(file));

    reader.onload = () => {
      console.log("file onload");
      this.setState({'fileUploadInProgress':false,
                    'fileName': acceptedFiles[0].name,
                  });

      this.fileUploadService.fileUpload(acceptedFiles[0])
        .then(function(response){
          console.log(response);
          self.setState({fileUploadSuccessfull: true});
        })
        .catch(function(error){
          console.log("error occured in upload service");
          self.setState({fileUploadFailed: true});

        });
    }

    reader.onprogress = (e) => {
      var loaded = e.loaded;
      var total = e.total;
      var percent_complete = (loaded / total) * 100;
      this.setState({'fileUploadInProgress':true,
      "uploadPercentage":percent_complete});
      console.log("file in progress");
    }

    reader.onerror = () => {
      console.log("File upload is failed");
      this.setState({'fileUploadFailed':true});
    }
  }

  render() {
    const cursorStyle = {
          cursor: 'pointer',
          borderStyle: 'dashed',
          borderWidth: '2px',
    }

    const centerAlign = {
      textAlign : 'center',
    }
    return (
      <div className="d-flex justify-content-end">
          <Form>
          <Dropzone onDrop={this.handleUpload}>
            {({getRootProps, getInputProps, isFocused}) => (
            <div>
              <div {...getRootProps()} style={cursorStyle} className="justify-content-md-center">
                <input {...getInputProps()}/>
                <p>Drag 'n' drop some files here, or select Choose file</p>
                <br/>
                <div style={centerAlign}>
                  <Button variant="secondary">Choose File</Button>
                </div>
              </div>
              <br/>
              {this.state.fileUploadInProgress && <ProgressBar animated now={this.state.uploadPercentage} />}
              {this.state.fileUploadFailed && <Alert variant="danger">{this.state.fileName} file upload failed!</Alert>}
              {this.state.fileUploadSuccessfull && <Alert variant="success">{this.state.fileName} file upload successfully!</Alert>}
            </div>
            )}
          </Dropzone>

          </Form>
      </div>
    );
  }
}
