/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
/* Components import */
import ModalNew from '../modals/modal-new.js'
import ModalAdd from '../modals/modal-add.js'
import ModalRemove from '../modals/modal-remove.js'
import ModalDelete from '../modals/modal-delete.js'

class TargetMenu extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      targetList : [],
      scenarioTargets : [],
      showNew : false,
      showAdd : false,
      showRemove : false,
      showDelete : false
    };
    //binding of methods
    this.getTargets = this.getTargets.bind(this);
    this.getScenarioTargets = this.getScenarioTargets.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  /* Get the list of targets available in the server */
  getTargets () {
    fetch('/api/targets')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the targetsList with the data received
        this.setState({ targetList: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Get the current scenario targets  */
  getScenarioTargets () {
    fetch('/api/scenario/targets/' + this.props.scenario)
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        console.log(data);
        //update the targetsList with the data received
        this.setState({ scenarioTargets: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Handle new */
  handleNew (target) {
    fetch('/api/targets', {
      method: 'POST',
      body: JSON.stringify(target),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        if (target.add) {
          // the new target must be added to the current scenario
          res.json()
          .then(data => {
            this.handleAdd(data);
          })
        } else {
          alert(`${target.name} created`);
        }
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle add */
  handleAdd (target) {
    // build the data to be saved
    const req = {
      scenarioID : this.props.scenario,
      target : {
        _id: target._id,
        name: target.ScenarioMenu
      }
    }
    // call the server to add the selected target to the current scenario
    fetch('api/scenario/target', {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // lift up the scenario targetList to be updated at the app level
        this.props.onAction(data);
        alert(`${target.name} added`);
      })
    })
    .catch(err => console.log(err));
    this.setState({ showAdd : false });
  }

  /* Handle remove */
  handleRemove (target) {
    // call the server to remove the selected target from the current scenario
    fetch('/api/scenario/' + this.props.scenario + '/target/' + target._id, {
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
        res.json()
        .then(data => {
          // lift up the scenario targetList to be updated at the app level
          this.props.onAction(data);
        });
        alert(`${target.name} removed`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showRemove : false });
  }

  /* Handle delete */
  handleDelete (target) {
    // call the server to delete the selected target
    fetch('/api/targets/' + target._id, {
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
        // retrieve scenario targetList
        getScenarioTargets();
        // lift up the targetList to be updated at the app level
        this.props.onAction(target);
        alert(`${target.name} deleted`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showDelete : false });
  }

  /* Target Menu */
  handleMenu (eventKey) {
    switch (eventKey) {
      case 2.1: // New
        this.setState({ showNew: true });
        break;
      case 2.2: // Add
        this.getTargets();
        this.setState({ showAdd: true });
        break;
      case 2.3: // Remove
        this.getScenarioTargets();
        this.setState({ showRemove: true});
        break;
      case 2.4: // Delete
        this.getTargets();
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <NavItem>
        <NavDropdown eventKey={3} title="Target">
          <MenuItem eventKey={3.1} onSelect={this.handleMenu}>New</MenuItem>
          <MenuItem eventKey={3.2} onSelect={this.handleMenu}>Add</MenuItem>
          <MenuItem eventKey={3.3} onSelect={this.handleMenu}>Remove</MenuItem>
          <MenuItem eventKey={3.4} onSelect={this.handleMenu}>Delete</MenuItem>
        </NavDropdown>
        <ModalNew
          title="New Target"
          show={this.state.showNew}
          addCheckBox={true}
          onNew={(target) => this.handleNew(target)}
          onHide={() => this.setState({ showNew: false })}
        />
        <ModalAdd
          title="Add Target"
          show={this.state.showAdd}
          list={this.state.targetList}
          onAdd={(target) => this.handleAdd(target)}
          onHide={() => this.setState({ showAdd: false })}
        />
        <ModalRemove
          title="Remove Target"
          show={this.state.showRemove}
          list={this.state.scenarioTargets}
          onRemove={(target) => this.handleRemove(target)}
          onHide={() => this.setState({ showRemove : false })}
        />
        <ModalDelete
          title="Delete Target"
          show={this.state.showDelete}
          list={this.state.targetList}
          onDelete={(target) => this.handleDelete(target)}
          onHide={() => this.setState({ showDelete : false })}
        />
      </NavItem>
    );
  }
}

export default TargetMenu;
