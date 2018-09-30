/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Bootstrap components import */
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class ModalAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _id : "",
      name : ""
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      // reset internal state
      this.setState ({
        _id : "",
        name : ""
      })
    }
  }

  handleAdd() {
    this.props.onAdd(this.state);
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
      <div id='modalAdd'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {list}
          </Modal.Body>
          <Modal.Footer>
            <p>{this.state.name}</p>
            <Button onClick={this.handleAdd}>Add</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalAdd;
