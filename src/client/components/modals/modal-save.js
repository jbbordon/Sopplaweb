/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button } from 'react-bootstrap';

class ModalSave extends Component {

  handleSave() {
    this.props.onSave();
  }


  render () {

    return (
      <div id='modalSave'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to save? 
              <span>
                {this.props.scenario}
              </span>
            </p>  
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSave}>Save</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalSave;