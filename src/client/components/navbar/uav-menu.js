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

class UavMenu extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      uavList : [],
      scenarioUAVs : [],
      showNew : false,
      showAdd : false,
      showRemove : false,
      showDelete : false
    };
    //binding of methods
    this.getUAVs = this.getUAVs.bind(this);
    this.getScenarioUAVs = this.getScenarioUAVs.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  /* Get the list of uavs available in the server */
  getUAVs () {
    fetch('/api/uavs')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavsList with the data received
        this.setState({ uavList: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Get the current scenario uavs  */
  getScenarioUAVs () {
    fetch('/api/scenario/uavs/' + this.props.scenario)
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavsList with the data received
        this.setState({ scenarioUAVs: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Handle new */
  handleNew (uav) {
    fetch('/api/uavs', {
      method: 'POST',
      body: JSON.stringify(uav),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        if (uav.add) {
          // the new uav must be added to the current scenario
          res.json()
          .then(data => {
            this.handleAdd(data);
          })
        } else {
          alert(`${uav.name} created`);
        }
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle add */
  handleAdd (uav) {
    // build the data to be saved
    const req = {
      scenarioID : this.props.scenario,
      uav : {
        _id: uav._id,
        name: uav.ScenarioMenu
      }
    }
    // call the server to add the selected uav to the current scenario
    fetch('api/scenario/uav', {
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
      } else {
        /* if add operation was ok the updated scenario uavList is returned
        in a json format and must be converted into a js object */
        res.json()
        .then(data => {
          // lift up the scenario uavList to be updated at the app level
          this.props.onAction(2, data);
          alert(`${uav.name} added`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showAdd : false });
  }

  /* Handle remove */
  handleRemove (uav) {
    // call the server to remove the selected uav from the current scenario
    fetch('/api/scenario/' + this.props.scenario + '/uav/' + uav._id, {
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
        /* if remove operation was ok the updated scenario uavList is returned
        in a json format and must be converted into a js object */
        res.json()
        .then(data => {
          // lift up the scenario uavList to be updated at the app level
          this.props.onAction(3, data);
        });
        alert(`${uav.name} removed`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showRemove : false });
  }

  /* Handle delete */
  handleDelete (uav) {
    // call the server to delete the selected uav
    fetch('/api/uavs/' + uav._id, {
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
        /* retrieve scenario uavList just in case the uav deleted was part
        of the scenario uavs */
        this.getScenarioUAVs();
        // lift up the uavList to be updated at the app level
        this.props.onAction(4, this.state.scenarioUAVs);
        alert(`${uav.name} deleted`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showDelete : false });
  }

  /* UAV Menu */
  handleMenu (eventKey) {
    switch (eventKey) {
      case 2.1: // New
        this.setState({ showNew: true });
        break;
      case 2.2: // Add
        this.getUAVs();
        this.setState({ showAdd: true });
        break;
      case 2.3: // Remove
        this.getScenarioUAVs();
        this.setState({ showRemove: true});
        break;
      case 2.4: // Delete
        this.getUAVs();
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <NavItem>
        <NavDropdown eventKey={2} title="UAV">
          <MenuItem eventKey={2.1} onSelect={this.handleMenu}>New</MenuItem>
          <MenuItem eventKey={2.2} onSelect={this.handleMenu}>Add</MenuItem>
          <MenuItem eventKey={2.3} onSelect={this.handleMenu}>Remove</MenuItem>
          <MenuItem eventKey={2.4} onSelect={this.handleMenu}>Delete</MenuItem>
        </NavDropdown>
        <ModalNew
          title="New UAV"
          show={this.state.showNew}
          addCheckBox={true}
          onNew={(uav) => this.handleNew(uav)}
          onHide={() => this.setState({ showNew: false })}
        />
        <ModalAdd
          title="Add UAV"
          show={this.state.showAdd}
          list={this.state.uavList}
          onAdd={(uav) => this.handleAdd(uav)}
          onHide={() => this.setState({ showAdd: false })}
        />
        <ModalRemove
          title="Remove UAV"
          show={this.state.showRemove}
          list={this.state.scenarioUAVs}
          onRemove={(uav) => this.handleRemove(uav)}
          onHide={() => this.setState({ showRemove : false })}
        />
        <ModalDelete
          title="Delete UAV"
          show={this.state.showDelete}
          list={this.state.uavList}
          onDelete={(uav) => this.handleDelete(uav)}
          onHide={() => this.setState({ showDelete : false })}
        />
      </NavItem>
    );
  }
}

export default UavMenu;
