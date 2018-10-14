/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
/* Styles import */
import '../../style/scenario.css';
/* Scenario cesium scripts import */
import CesiumScenario from '../../scripts/cesium-scenario.js';

class ScenarioForm extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      latitude : '',
      longitude : '',
      xWidth : '',
      yHeight: '',
      xCells: '',
      yCells: '',
      areaBearing: ''
    }
    //binding of methods
    this.resetForm = this.resetForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset scenario-form to default data */
  resetForm () {
    return {
      latitude : '',
      longitude : '',
      xWidth : '',
      yHeight: '',
      xCells: '',
      yCells: '',
      areaBearing: ''
    };
  }

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // reset the form fields
      let newState = this.resetForm();
      // check if the scenario area is already defined or not
      if (this.props.zone.latitude) {
        // area is defined for current scenario so set the form fields
        newState = {
          latitude : this.props.zone.latitude,
          longitude : this.props.zone.longitude,
          xWidth : this.props.zone.xWidth,
          yHeight: this.props.zone.yHeight,
          xCells: this.props.zone.xCells,
          yCells: this.props.zone.yCells,
          areaBearing: this.props.zone.areaBearing
        }
      }
      this.setState(newState);
    }
  }

  getValidationState() {
    return null;
  }

  /* Handle input of data into de form fields */
  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* Handle save button */
  handleSave(event) {
    event.preventDefault();
    // build the data to save
    var zone = this.state;
    zone._id = this.props.id;
    //send the server the PUT request with the new data
    fetch('/api/scenario', {
      method: 'PUT',
      body: JSON.stringify(zone),
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
          CesiumScenario.paintZone(data, this.props.name);
          alert(`${this.props.name} saved`);
        })
      }
    })
    .catch(err => console.log(err));
  }

  render () {
    return (
      <div className='scenarioForm'>
        <form onSubmit={this.handleSave}>
          <FormGroup bsSize="small" validationState={this.getValidationState()}>
            <InputGroup>
              <InputGroup.Addon>Latitude</InputGroup.Addon>
              <FormControl
                type="real"
                onChange={this.handleInputChange}
                min="-90"
                max="90"
                id="latitude"
                value={this.state.latitude}
                placeholder="Decimal Degrees"
                required/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Longitude</InputGroup.Addon>
              <FormControl
                type="real"
                onChange={this.handleInputChange}
                min="-180"
                max="180"
                id="longitude"
                value={this.state.longitude}
                placeholder="Decimal Degrees"
                required/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Width</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="xWidth"
                value={this.state.xWidth}
                placeholder="Meters"
                required/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Height</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="yHeight"
                value={this.state.yHeight}
                placeholder="Meters"
                required/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>X Cells</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="xCells"
                value={this.state.xCells}
                placeholder="number"
                required/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Y cells</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="yCells"
                value={this.state.yCells}
                placeholder="number"
                required/>
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Bearing</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                max="360"
                id="areaBearing"
                value={this.state.areaBearing}
                placeholder="Degrees"
                required/>
            </InputGroup>
          </FormGroup>
          <Button type="submit">Save</Button>
        </form>
      </div>
    );
  }
}

export default ScenarioForm;
