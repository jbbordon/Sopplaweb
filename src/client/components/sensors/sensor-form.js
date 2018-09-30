/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Styles import */
import '../../style/sensor.css';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class SensorForm extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      _id : '',
      name : '',
      type: '',
      controlAt : '',
      captureAt : '',
      initElevation : '',
      initHeading : '',
  		initAzimuth : '',
    }
    //binding of methods
    this.resetForm = this.resetForm.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  /* reset sensor-form to default data */
  resetForm () {
    this.setState({
      _id : '',
      name : '',
      type: '',
      controlAt : '',
      captureAt : '',
      initElevation : '',
  		initHeading : '',
  		initAzimuth : '',
    });
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props.selectedSensor !== prevProps.selectedSensor) {
      // reset Sensor form
      this.resetForm();
      // check if there is a Sensor selected or none
      if (this.props.selectedSensor !== null) {
        // set the form fields to the values loaded
        this.setState ({
          _id : this.props.selectedSensor._id,
          name : this.props.selectedSensor.name,
          type: this.props.selectedSensor.type,
          controlAt : this.props.selectedSensor.controlAt,
          captureAt : this.props.selectedSensor.captureAt,
          initElevation : this.props.selectedSensor.initState.elevation,
          initHeading : this.props.selectedSensor.initState.heading,
          initAzimuth : this.props.selectedSensor.initState.azimuth,
        });
      }
    }
  }

  /* Render a "select input" with the list of options passed as a parameter */
  renderSelect(options) {
    const list = options.map(item => {
      return (
        <option value={item}>{item}</option>
      );
    });
    return list;
  }

  /* handle input forms */
  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* handele new button */
  handleNew() {
    // build the data to save
    let sensor = this.state;
    sensor.uavID = this.props.selectedUAV._id;
     //send the server the POST request with the new data
     fetch('api/uavs/sensor', {
       method: 'POST',
       body: JSON.stringify(sensor),
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
           alert(`${this.state.name} created`);
           // if data is updated ok then lift up the UAV to be stored at app level
           this.props.onAction('new', data);
         })
       }
     })
     .catch(err => console.log(err));
  }

  /* handele save button */
  handleSave() {
    // build the data to save
    let sensor = this.state;
    sensor.uavID = this.props.selectedUAV._id;
     //send the server the POST request with the new data
     fetch('api/uavs/sensor', {
       method: 'PUT',
       body: JSON.stringify(sensor),
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
           console.log(data);
           alert(`${this.state.name} saved`);
           // if data is updated ok then lift up the UAV to be stored at app level
           this.props.onAction('save', data);
         })
       }
     })
     .catch(err => console.log(err));
  }

  /* handele remove button */
  handleRemove() {
    // build the data to save
    let sensor = this.state;
    sensor.uavID = this.props.selectedUAV._id;
     //send the server the POST request with the new data
     fetch('api/uavs/sensor', {
       method: 'DELETE',
       body: JSON.stringify(sensor),
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
           console.log(data);
           alert(`${this.state.name} removed`);
           // if data is updated ok then lift up the UAV to be stored at app level
           this.props.onAction('remove', data);
         })
       }
     })
     .catch(err => console.log(err));
  }

  render () {
    return (
      <form className="sensorForm" onSubmit={this.handleSave}>
        <Button onClick={this.handleNew}>New</Button>
        <Button onClick={this.handleSave}>Save</Button>
        <Button onClick={this.handleRemove}>Remove</Button>
        <FormGroup className="sensorDef" bsSize="small">
          <label>Definition</label>
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
            <InputGroup.Addon>Type</InputGroup.Addon>
            <FormControl
              componentClass="select"
              onChange={this.handleInputChange}
              id="type"
              value={this.state.type}
              required>
              {this.renderSelect(this.props.sensorTypes)}
            </FormControl>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Control AT</InputGroup.Addon>
            <FormControl
              type="number"
              onChange={this.handleInputChange}
              id="controlAt"
              value={this.state.controlAt}
              placeholder="miliseconds"
              required/>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Capture AT</InputGroup.Addon>
            <FormControl
              type="number"
              onChange={this.handleInputChange}
              id="captureAt"
              value={this.state.captureAt}
              placeholder="miliseconds"
              required/>
          </InputGroup>
        </FormGroup>
        <FormGroup className="sensorInitState" bsSize="small">
          <label>Initial State</label>
          <InputGroup>
            <InputGroup.Addon>Elevation</InputGroup.Addon>
            <FormControl
              type="number"
              onChange={this.handleInputChange}
              id="initElevation"
              value={this.state.initElevation}
              placeholder="Meters"
              required/>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Heading</InputGroup.Addon>
            <FormControl
              type="number"
              onChange={this.handleInputChange}
              min="0"
              max="360"
              id="initHeading"
              value={this.state.initHeading}
              placeholder="Degrees"
              required/>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Azimuth</InputGroup.Addon>
            <FormControl
              type="number"
              onChange={this.handleInputChange}
              min="0"
              max="90"
              id="initAzimuth"
              value={this.state.initAzimuth}
              placeholder="Degrees"
              required/>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default SensorForm;
