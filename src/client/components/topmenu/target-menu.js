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
    this.fetchTargets = this.fetchTargets.bind(this);
    this.fetchScenarioTargets = this.fetchScenarioTargets.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  /* Get the list of targets available in the server */
  fetchTargets () {
    fetch('/api/targets')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        //update the targetsList with the data received
        this.setState({ targetList: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Get the current scenario targets */
  fetchScenarioTargets () {
    fetch('/api/scenario/targets/' + this.props.scenarioID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        //update the scenarioTargets with the data received
        this.setState({ scenarioTargets: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchTargets();
  }

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props.scenarioID !== prevProps.scenarioID) {
      // scenario has changed or reloded
      this.fetchScenarioTargets();
    }
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
        this.fetchTargets();
        alert(`${target.name} created`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle add */
  handleAdd (target) {
    // build the data to be saved
    const req = {
      scenarioID : this.props.scenarioID,
      target : {
        _id: target._id
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
      } else {
        res.json()
        .then(data => {
          // update scenarioTargets with the data received
          this.setState({scenarioTargets : data});
          // lift up the add operation
          this.props.onAction('add', data);
          alert(`${target.name} added`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showAdd : false });
  }

  /* Handle remove */
  handleRemove (target) {
    // call the server to remove the selected target from the current scenario
    fetch('/api/scenario/' + this.props.scenarioID + '/target/' + target._id, {
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
          // update scenarioTargets with the data received
          this.setState({scenarioTargets : data});
          // lift up the remove operation
          this.props.onAction('remove', data);
          alert(`${target.name} removed`);
        });
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
        alert(`${res.statusText}`);
      } else {
        this.fetchTargets();
        if (this.props.scenarioID !== "") {
          this.fetchScenarioTargets();
        }
        // lift up the remove operation
        this.props.onAction('delete');
        alert(`${target.name} deleted`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showDelete : false });
  }

  /* Target Menu */
  handleMenu (eventKey) {
    switch (eventKey) {
      case 3.1: // New
        this.setState({ showNew: true });
        break;
      case 3.2: // Add
        this.setState({ showAdd: true });
        break;
      case 3.3: // Remove
        this.setState({ showRemove: true});
        break;
      case 3.4: // Delete
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
        <NavDropdown eventKey={3} title="Target" id="targetMenu">
          <MenuItem eventKey={3.1} onSelect={this.handleMenu}>New</MenuItem>
          <MenuItem disabled={disable} eventKey={3.2} onSelect={this.handleMenu}>Add</MenuItem>
          <MenuItem disabled={disable} eventKey={3.3} onSelect={this.handleMenu}>Remove</MenuItem>
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
