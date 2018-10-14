/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';

class ModalNew extends Component {

  constructor(props) {
    super(props);
    // internal state
    this.state = {
      name : "",
      add : false
    }
    //binding of methods
    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* Handles the button press */
  handleNew() {
    this.props.onNew(this.state);
  }

  /* Handle form inputs */
  handleChange (event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* Render component */
  render () {
    return (
      <div id='modalNew'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form inline>
            <FormGroup>
              <FormControl type="text" id="name" placeholder="name" onChange={this.handleChange}/>
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
