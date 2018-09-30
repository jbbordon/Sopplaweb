/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';

class ModalNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name : "",
      add : false
    }

    this.handleNew = this.handleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleNew() {
    this.props.onNew(this.state);
  }


  handleChange (event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }


  render () {

    let checkBox;
    // check if there is a need to include a checbox or not
    if (this.props.addCheckBox) {
      checkBox =
        <Checkbox id="add" onChange={this.handleChange}>
          Add to current Scenario
        </Checkbox>
    }
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
              {checkBox}
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
