/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class ModalDelete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _id : "",
      name : ""
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    this.props.onDelete(this.state);
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
      <div id='modalDelete'>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup componentClass="ul">
              {list}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <p>{this.state.name}</p>
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalDelete;
