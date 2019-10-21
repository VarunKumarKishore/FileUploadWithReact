import React, { Component } from 'react';
import UploadFileHeader from './components/UploadFileHeader'
import UploadFileFooter from './components/UploadFileFooter'
import ErrorHandler from './components/ErrorHandler'
import UploadFile from './components/UploadFile'

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

class App extends Component {

  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }

  render() {

    return (
      <Container>
        <ErrorHandler>
        <Row className="justify-content-md-center">
          <UploadFileHeader />
        </Row>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                File Upload
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row className="justify-content-md-center">
                    <UploadFile />
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Get content
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Get content from service
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
            </Card>
          </Accordion>
          <Row className="justify-content-md-center">
            <UploadFileFooter />
          </Row>
        </ErrorHandler>
      </Container>
    );
  }
}

export default App;
