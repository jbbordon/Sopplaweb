/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

class ModalNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name : ""
    }

    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleNew() {
    this.props.onNew(this.state);
  }

  handleChange (event) {
    const { name , value } = event.target;
    this.setState({ name : value });
  }


  render () {
    return (
      <div id='modalNew'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form inline>
            <FormGroup controlId="inputName">
              <FormControl type="text" placeholder="name" onChange={this.handleChange}/>
            </FormGroup>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleNew}>New</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalNew;
