/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { DropdownButton, MenuItem } from 'react-bootstrap';
/* Styles import */
import '../style/scenario.css';
/* Components import */
import ScenarioModals from './ScenarioModals.js'

class Scenario extends Component {
  constructor () {
    super();

    this.handleScenarioButton = this.handleScenarioButton.bind(this);

    this.state = {
      title : "default",
      newScenShow  : false,
      loadScenShow : false,
      delScenShow : false
    }
  }

  /* Create a new Scenario */
  handleScenarioButton (eventKey) {
    console.log(eventKey);

    switch (eventKey) {
      case 1: // Create a new scenario
        this.setState({ newScenShow: true });
        //newScenarioModal.handleShow();
        break;
      case 2: // Load an scenario from the database
        this.setState({ loadScenShow: true });
        break;
      case 3: // Save the existing scenario
        this.setState({ modalTitle: "New Scenario" });
        break;
      case 4: // delete the current scenario
        this.setState({ delScenShow: true });
        break;
      default:
        break;
    }
  }

  /* Close the modal */
  handleClose() {
    this.setState({ modalShow: false });
  }

  /* Show a modal */
  handleShow() {
    this.setState({ modalShow: true });
  }

  render () {

    let newScenClose = () => this.setState({ newScenShow: false });
    let loadScenClose = () => this.setState({ loadScenShow: false });

    return (
      <div className='scenario'>
        <h4>
          Scenario :
          <span>
            <DropdownButton bsStyle="default" title= { this.state.title } id="dropdown-no-caret">
              <MenuItem eventKey={1} onSelect={this.handleScenarioButton}>New</MenuItem>
              <MenuItem eventKey={2} onSelect={this.handleScenarioButton}>Load</MenuItem>
              <MenuItem eventKey={3} onSelect={this.handleScenarioButton}>Save</MenuItem>
              <MenuItem eventKey={4} onSelect={this.handleScenarioButton}>Delete</MenuItem>
            </DropdownButton>
          </span>
        </h4>
        <form className='scenarioForm'>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputLatitude">Latitude</label>
              <input type="real" min="-90" max="90" className="form-control" id="inputLatitude" placeholder="degrees"/>
            </div>
            <div className="form-group col-md-6">
              <label for="inputLongitude">Longitude</label>
              <input type="real" min="-180" max="180" className="form-control" id="inputLongitude" placeholder="degrees"/>
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputWidth">Width</label>
              <input type="number" className="form-control" id="inputWidth" placeholder="meters"/>
            </div>
            <div className="form-group col-md-6">
              <label for="inputHeigth">Height</label>
              <input type="number" className="form-control" id="inputHeigth" placeholder="meters"/>
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputXCells">X cells</label>
              <input type="number" className="form-control" id="inputXCells" placeholder="X Cells"/>
            </div>
            <div className="form-group col-md-6">
              <label for="inputYCells">Y cells</label>
              <input type="number" className="form-control" id="inputYCells" placeholder="Y Cells"/>
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputAreaBearing">Area Bearing</label>
              <input type="number" min="0" max="359" className="form-control" id="inputAreaBearing" placeholder="0 to 359"/>
            </div>
          </div>
        </form>
        <ScenarioModals title="New Scenario" show={this.state.newScenShow} onHide={newScenClose}/>
        <ScenarioModals title="Load Scenario" show={this.state.loadScenShow} onHide={loadScenClose}/>
      </div>
    );
  }
}

export default Scenario;
