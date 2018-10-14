/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class ModalRemove extends Component {

  constructor(props) {
    super(props);
    // internal state
    this.state = {
      _id : "",
      name : ""
    }
    //binding of methods
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      // reset internal state
      this.setState ({
        _id : "",
        name : ""
      })
    }
  }

  /* Handles the button press */
  handleRemove() {
    this.props.onRemove(this.state);
  }

  /* Handle select input */
  handleSelect (item) {
    this.setState(item);
  }

  /* Render component */
  render () {
    const list = this.props.list.map(item => {
      return (
        <ListGroupItem
          onClick={() => this.handleSelect(item)}
          key={item._id}>
            {item.name}
        </ListGroupItem>
      );
    });
    return (
      <div id='modalRemove'>
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
            <Button onClick={this.handleRemove}>Remove</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalRemove;
