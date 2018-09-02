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

class EnvMenu extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      envList : [],
      showNew : false,
      showAdd : false,
      showRemove : false,
      showDelete : false
    };
    //binding of methods
    this.getEnvs = this.getEnvs.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  /* Get the list of environments available in the server */
  getEnvs () {
    fetch('/api/environment')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the environmentsList with the data received
        this.setState({ envList: data })
      })
    })
    .catch(error => console.log(error))
  }

  /* Handle new */
  handleNew (env) {
    fetch('/api/environment', {
      method: 'POST',
      body: JSON.stringify(env),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      } else {
        this.props.onAction(1, env);
        alert(`${env.name} created`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle add */
  handleAdd (env) {
    this.props.onAction(2, env);
    this.setState({ showLoad : false });
  }

  /* Handle remove */
  handleRemove (env) {
    this.props.onAction(3, env);
    this.setState({ showDelete : false });
  }

  /* Handle delete */
  handleDelete (env) {
    fetch('/api/env/' + env._id, {
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
        this.props.onAction(4, env);
        alert(`${env.name} deleted`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showDelete : false });
  }

  /* env Menu */
  handleMenu (eventKey) {
    switch (eventKey) {
      case 4.1: // New
        this.setState({ showNew: true });
        break;
      case 4.2: // Add
        this.getEnvs();
        this.setState({ showLoad: true });
        break;
      case 4.3: // Remove
        this.setState({ showSave: true});
        break;
      case 4.4: // Delete
        this.getEnvs();
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <NavItem>
        <NavDropdown eventKey={4} title="Env">
          <MenuItem eventKey={4.1} onSelect={this.handleMenu}>New</MenuItem>
          <MenuItem eventKey={4.2} onSelect={this.handleMenu}>Add</MenuItem>
          <MenuItem eventKey={4.3} onSelect={this.handleMenu}>Remove</MenuItem>
          <MenuItem eventKey={4.4} onSelect={this.handleMenu}>Delete</MenuItem>
        </NavDropdown>
        <ModalNew
          title="New Environment"
          show={this.state.showNew}
          onNew={(env) => this.handleNew(env)}
          onHide={() => this.setState({ showNew: false })}
        />
        <ModalDelete
          title="Delete Environment"
          show={this.state.showDelete}
          list={this.state.envList}
          onDelete={(env) => this.handleDelete(env)}
          onHide={() => this.setState({ showDelete : false })}
        />
      </NavItem>
    );
  }
}

export default EnvMenu;
