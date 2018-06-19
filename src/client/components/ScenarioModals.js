/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button } from 'react-bootstrap';
/* Styles import */
import '../style/modal.css';

class ScenarioModals extends Component {

  render () {
    return (
      <div className='scenarioModals'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ScenarioModals;
