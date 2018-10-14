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
    this.fetchUAVs = this.fetchUAVs.bind(this);
    this.fetchScenarioUAVs = this.fetchScenarioUAVs.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  /* Get the list of uavs available in the server */
  fetchUAVs () {
    fetch('/api/uavs')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        //update the uavsList with the data received
        this.setState({ uavList: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Get the current scenario uavs */
  fetchScenarioUAVs () {
    fetch('/api/scenario/uavs/' + this.props.scenarioID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        //update the scenarioUAVs with the data received
        this.setState({ scenarioUAVs: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchUAVs();
  }

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props.scenarioID !== prevProps.scenarioID) {
      // scenario has changed or reloded
      this.fetchScenarioUAVs();
    }
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
        this.fetchUAVs();
        alert(`${uav.name} created`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle add */
  handleAdd (uav) {
    // build the data to be saved
    const req = {
      scenarioID : this.props.scenarioID,
      uav : {
        _id: uav._id
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
        res.json()
        .then(data => {
          // update scenarioUAVs with the data received
          this.setState({scenarioUAVs : data});
          // lift up the add operation
          this.props.onAction('add', data);
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
    fetch('/api/scenario/' + this.props.scenarioID + '/uav/' + uav._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // update scenarioUAVs with the data received
          this.setState({scenarioUAVs : data});
          // lift up the remove operation
          this.props.onAction('remove', data);
          alert(`${uav.name} removed`);
        });
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
        alert(`${res.statusText}`);
      } else {
        this.fetchUAVs();
        if (this.props.scenarioID !== "") {
          this.fetchScenarioUAVs();
        }
        // lift up the remove operation
        this.props.onAction('delete');
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
        this.setState({ showAdd: true });
        break;
      case 2.3: // Remove
        this.setState({ showRemove: true});
        break;
      case 2.4: // Delete
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }

  render () {

    /*check there is a current scenario to enable remove & add operations */
    let disable = true;
    if (this.props.scenarioID !== "") {
      disable = false;
    }

    return (
      <NavItem>
        <NavDropdown eventKey={2} title="UAV">
          <MenuItem eventKey={2.1} onSelect={this.handleMenu}>New</MenuItem>
          <MenuItem disabled={disable} eventKey={2.2} onSelect={this.handleMenu}>Add</MenuItem>
          <MenuItem disabled={disable} eventKey={2.3} onSelect={this.handleMenu}>Remove</MenuItem>
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
