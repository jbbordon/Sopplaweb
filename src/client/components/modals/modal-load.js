/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Bootstrap components import */
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class ModalLoad extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _id : "",
      name : ""
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.props.onLoad(this.state);
  }

  handleSelect (item) {
    this.setState(item);
  }

  render () {

    const list = this.props.list.map(item => {
      return (
        <ListGroupItem onClick={() => this.handleSelect(item)}>{item.name}</ListGroupItem>
      );
    });

    return (
      <div id='modalLoad'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {list}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleLoad}>Load</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalLoad;
