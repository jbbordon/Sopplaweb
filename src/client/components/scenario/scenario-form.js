/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
/* Styles import */
import '../../style/scenario.css';

class ScenarioForm extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      name : '',
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
    this.setState({
      name : this.props.name,
      latitude : '',
      longitude : '',
      xWidth : '',
      yHeight: '',
      xCells: '',
      yCells: '',
      areaBearing: ''
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // check if the scenario area is already defined or not
      if (!this.props.zone.latitude) {
        // if scenario area is not yet defined then reset the form fields
        this.resetForm();
      } else {
        // area is defined for current scenario so set the form fields
        this.setState ({
          name : this.props.name,
          latitude : this.props.zone.latitude,
          longitude : this.props.zone.longitude,
          xWidth : this.props.zone.xWidth,
          yHeight: this.props.zone.yHeight,
          xCells: this.props.zone.xCells,
          yCells: this.props.zone.yCells,
          areaBearing: this.props.zone.areaBearing
        })
      }
    }
  }

  getValidationState() {
    return null;
  }

  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  handleSave(event) {
    event.preventDefault();
    // build the data to save
    var scenario = this.state;
    scenario._id = this.props.id;
    //send the server the PUT request with the new data
    fetch('/api/scenario', {
      method: 'PUT',
      body: JSON.stringify(scenario),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        // if data is saved lift up the scenario area to be updated at app lvl
        this.props.onSave(data);
        alert(`${this.state.name} saved`);
      })
    })
    .catch(err => console.log(err));
  }

  render () {
    return (
      <div className='scenarioForm'>
        <form onSubmit={this.handleSave}>
          <FormGroup bsSize="small" validationState={this.getValidationState()}>
            <InputGroup>
              <InputGroup.Addon>Name</InputGroup.Addon>
              <FormControl
                type="text"
                onChange={this.handleInputChange}
                id="name"
                value={this.state.name}
                placeholder="Text"
                required/>
            </InputGroup>
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
