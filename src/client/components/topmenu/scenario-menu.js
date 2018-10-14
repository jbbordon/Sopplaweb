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

class ScenarioMenu extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      scenarioList : [],
      showNew : false,
      showLoad : false,
      showDelete : false,
      showSave : false
    };
    //binding of methods
    this.fetchScenarios = this.fetchScenarios.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleScenarioMenu = this.handleScenarioMenu.bind(this);
  }

  /* Get the scenarioList of scenarios available in the server */
  fetchScenarios () {
    fetch('/api/scenario')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        //update the scenarioList with the data received
        this.setState({ scenarioList: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchScenarios();
  }

  /* Create a new scenario in the server */
  handleNew (scenario) {
    fetch('/api/scenario', {
      method: 'POST',
      body: JSON.stringify(scenario),
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
          this.fetchScenarios();          
          this.props.onAction('new', data);
          alert(`${data.name} created`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Handle load */
  handleLoad (scenario) {
    fetch('/api/scenario/' + scenario._id)
    .then(res => {
      if (!res.ok) {
        // show an alert as the response was not ok
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // populate the scenario loaded
          this.props.onAction('load', data);
          alert(`${data.name} loaded`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showLoad : false });
  }

  /* Handle delete */
  handleDelete (scenario) {
    fetch('/api/scenario/' + scenario._id, {
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
        this.fetchScenarios();        
        this.props.onAction('delete', scenario);
        alert(`${scenario.name} deleted`);
      }
    })
    .catch(err => console.log(err));
    this.setState({ showDelete : false });
  }

  /* Scenario Menu */
  handleScenarioMenu (eventKey) {
    switch (eventKey) {
      case 1: // New
        this.setState({ showNew: true });
        break;
      case 2: // Load
        this.setState({ showLoad: true });
        break;
      case 3: // Delete
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <NavItem>
        <NavDropdown title="Scenario">
          <MenuItem eventKey={1} onSelect={this.handleScenarioMenu}>New</MenuItem>
          <MenuItem eventKey={2} onSelect={this.handleScenarioMenu}>Load</MenuItem>
          <MenuItem eventKey={3} onSelect={this.handleScenarioMenu}>Delete</MenuItem>
        </NavDropdown>
        <ModalNew
          title="New Scenario"
          show={this.state.showNew}
          onNew={(scenario) => this.handleNew(scenario)}
          onHide={() => this.setState({ showNew: false })}
        />
        <ModalLoad
          title="Load Scenario"
          show={this.state.showLoad}
          list={this.state.scenarioList}
          onLoad={(scenario) => this.handleLoad(scenario)}
          onHide={() => this.setState({ showLoad : false })}
        />
        <ModalDelete
          title="Delete Scenario"
          show={this.state.showDelete}
          list={this.state.scenarioList}
          onDelete={(scenario) => this.handleDelete(scenario)}
          onHide={() => this.setState({ showDelete : false })}
        />
      </NavItem>
    );
  }
}

export default ScenarioMenu;
