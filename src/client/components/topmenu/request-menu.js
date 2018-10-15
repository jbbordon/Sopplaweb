/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/* Components import */
import ModalNew from '../modals/modal-new.js'
import ModalLoad from '../modals/modal-load.js'
import ModalDelete from '../modals/modal-delete.js'
import ModalSave from '../modals/modal-save.js'

class RequestMenu extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      requestsList : [],
      showNew : false,
      showAdd : false,
      showRemove : false,
      showDelete : false
    };
    //binding of methods
    this.getRequests = this.getRequests.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  /* Get the list of requests available in the server */
  getRequests () {
    fetch('/api/requests')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the requestsList with the data received
        this.setState({ requestsList: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Handle new */
  handleNew (request) {
    fetch('/api/requests', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      } else {
        this.props.onAction(1, request);
        alert(`${request.name} created`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle add */
  handleAdd (request) {
    this.props.onAction(2, request);
    this.setState({ showLoad : false });
  }

  /* Handle remove */
  handleRemove (request) {
    this.props.onAction(3, request);
    this.setState({ showDelete : false });
  }

  /* Handle delete */
  handleDelete (request) {
    fetch('/api/requests/' + request._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      } else {
        this.props.onAction(4, request);
        alert(`${request.name} deleted`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showDelete : false });
  }

  /* request Menu */
  handleMenu (eventKey) {
    switch (eventKey) {
      case 5.1: // New
        this.setState({ showNew: true });
        break;
      case 5.2: // Add
        this.getRequests();
        this.setState({ showLoad: true });
        break;
      case 5.3: // Remove
        this.setState({ showSave: true});
        break;
      case 5.4: // Delete
        this.getRequests();
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }


  render () {
    return (
      <NavItem>
        <NavDropdown eventKey={5} title="Request" id="requestMenu">
          <MenuItem eventKey={5.1} onSelect={this.handleMenu}>New</MenuItem>
          <MenuItem eventKey={5.2} onSelect={this.handleMenu}>Add</MenuItem>
          <MenuItem eventKey={5.3} onSelect={this.handleMenu}>Remove</MenuItem>
          <MenuItem eventKey={5.4} onSelect={this.handleMenu}>Delete</MenuItem>
        </NavDropdown>
        <ModalNew
          title="New Request"
          show={this.state.showNew}
          onNew={(request) => this.handleNew(request)}
          onHide={() => this.setState({ showNew: false })}
        />
        <ModalDelete
          title="Delete Request"
          show={this.state.showDelete}
          list={this.state.requestsList}
          onDelete={(request) => this.handleDelete(request)}
          onHide={() => this.setState({ showDelete : false })}
        />
      </NavItem>
    );
  }
}

export default RequestMenu;
