/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class ModalDelete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id : ""
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.state);
  }

  handleSelect (item) {
    this.setState({ id : item._id });
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
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalDelete;
