/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { DropdownButton, MenuItem } from 'react-bootstrap';
/* Styles import */
import '../../style/scenario.css';
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
      list : [],
      showNew : false,
      showLoad : false,
      showDelete : false,
      showSave : false
    };
    //binding of methods
    this.getScenarios = this.getScenarios.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleScenarioButton = this.handleScenarioButton.bind(this);
  }

  /* Get the list of scenarios available in the server */
  getScenarios () {
    fetch('/api/scenario')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the scenarioList with the data received
        this.setState({ list: data })
      })
    })
    .catch(err => console.error(err))
  }

  /* Handle new */
  handleNew (scenario) {
    this.props.onNew(scenario);
    this.setState({ showNew : false });
  }

  /* Handle load */
  handleLoad (scenario) {
    this.props.onLoad(scenario);
    this.setState({ showLoad : false });
  }

  /* Handle delete */
  handleDelete (scenario) {
    this.props.onDelete(scenario);
    this.setState({ showDelete : false });
  }

  /* Handle save */
  handleSave () {
    this.props.onSave();
    this.setState({ showDelete : false });
  }

  /* Scenario Menu */
  handleScenarioButton (eventKey) {
    switch (eventKey) {
      case 1: // New
        this.setState({ showNew: true });
        break;
      case 2: // Load
        this.getScenarios();
        this.setState({ showLoad: true });
        break;
      case 3: // Save
        this.setState({ showSave: true});
        break;
      case 4: // Delete
        this.getScenarios();
        this.setState({ showDelete: true });
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <div className="scenarioMenu">
        <h4>Scenario:
          <span>
            <DropdownButton id="scenarioButton" bsStyle="secondary" bsSize="small" title={this.props.name}>
              <MenuItem eventKey={1} onSelect={this.handleScenarioButton}>New</MenuItem>
              <MenuItem eventKey={2} onSelect={this.handleScenarioButton}>Load</MenuItem>
              <MenuItem eventKey={3} onSelect={this.handleScenarioButton}>Save</MenuItem>
              <MenuItem eventKey={4} onSelect={this.handleScenarioButton}>Delete</MenuItem>
            </DropdownButton>
          </span>
        </h4>
        <ModalNew
          title="New Scenario"
          show={this.state.showNew}
          onNew={(scenario) => this.handleNew(scenario)}
          onHide={() => this.setState({ showNew: false })}
        />
        <ModalLoad
          title="Load Scenario"
          show={this.state.showLoad}
          list={this.state.list}
          onLoad={(scenario) => this.handleLoad(scenario)}
          onHide={() => this.setState({ showLoad : false })}
        />
        <ModalDelete
          title="Delete Scenario"
          show={this.state.showDelete}
          list={this.state.list}
          onDelete={(scenario) => this.handleDelete(scenario)}
          onHide={() => this.setState({ showDelete : false })}
        />
        <ModalSave
          title="Save Scenario"
          show={this.state.showSave}
          onSave={() => this.handleSave()}
          onHide={() => this.setState({ showSave : false })}
        />
      </div>
    );
  }
}

export default ScenarioMenu;
