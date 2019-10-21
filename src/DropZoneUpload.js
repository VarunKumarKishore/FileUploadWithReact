  import React, { Component, Fragment } from 'react';
  import Dropzone from 'react-dropzone';
  import axios from 'axios';


  export default class DropZoneUpload extends Component {


    constructor(props){
      super(props);
      this.state={
        files : [],
        fileUploadedSuccessfully : false,
        fileUploadFailed : false,
        fileName : null,
      }

      this.onDrop = this.onDrop.bind(this);
    }

  setUploadSuccess = () => {
    console.log("file uploaded successfully");
  }

componentDidMount (){
  console.log("inside mounted function")
}

componentDidUpdate(){
  console.log("inside did update ");
}

componentWillUnmount(){
  console.log("component unmount");
}

  onDrop = (acceptedFiles) => {
    this.setState({
     files: this.state.files.concat(acceptedFiles),
     fileName : acceptedFiles[0].name
    });

    const reader = new FileReader();
    reader.onerror = () => console.log('file reading has failed');

    reader.onload = (e) => {
      const result = reader.result;
      var uploadRequest = new FormData();
      var self = this;
      var file = new Blob([result], { type: 'application/json' });

      uploadRequest.append('file', file, "samplefile");

      axios.post('http://localhost:8080/uploadFile', uploadRequest)
        .then(function(response){
          console.log(response);
          self.setState({fileUploadedSuccessfully: true});
        })
        .catch(function(error){
          console.log(error);
          self.setState({fileUploadFailed: true});

        });
    }

    reader.onabort = () => {
      console.log(reader);
      console.log('file reading was aborted');
    }
    //Update reader object with filedata
    acceptedFiles.forEach(file => reader.readAsText(file));
  //  acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}));
  }

  render() {

    const maxSize = 102004;
    const minSize = 0;
    //const acceptedFileType = "text/csv";
    const acceptedFileType = "";
    const divStyle = {
      'background': 'lightgray',
      'border': 'dashed',
      'cursor': 'pointer',
      'border': '2px dashed #0087F7',
    'border-radius': '5px',
    };

    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };
const testBoolean = true;

    const FancyButton = React.forwardRef((props, ref) => (
      <div>
      <button className="FancyButton">
        {props.children}<br/>
        {ref.msg}
      </button><br/>
      {ref.divMsg}
      </div>
    ));

    // You can now get a ref directly to the DOM button:
    var ref = React.createRef();
    ref = {"msg":"its messsage printing using ref",
            "divMsg": "its message priting for parent div"};

    return (
      <div className="divStyle">
{String(testBoolean)} boolean testing
      <FancyButton ref={ref}>Click me!</FancyButton>

        <Dropzone  className = ' defaultDropzone' onDrop={this.onDrop}
            accept={acceptedFileType} onDropAccepted={this.setUploadSuccess}
            maxSize = {maxSize} minSize = {minSize} multiple={false}>
          {({getRootProps, getInputProps, isDragActive, isDropAccept, isDragRejected}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                 {isDropAccept && (<p>All files will be accepted</p>)}
                 {isDragActive && <h1> File Drag is acitve</h1>}
                 {isDragRejected && <h1> File Drag is rejected</h1>}
                 <p>Drop files here or click to upload.</p>
                <p></p>
              </div>
          </section>)}
          </Dropzone>

          {this.state.files.length > 0 &&
          <Fragment>
            {this.state.files.map((file) => (
              <img
                alt="Preview"
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
          </Fragment>
        }
        {this.state.fileName}
        {this.state.fileUploadedSuccessfully && "File have been uploaded successfully!"}
        {this.state.fileUploadFailed && "File uploaded failed!"}


      </div>
    );
    }

  }
