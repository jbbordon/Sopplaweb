/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Styles import */
import '../../style/sensor.css';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
/* Context import */
import { SensorTypesContext } from '../uavs/uav-panel-group.js'

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
  		initAzimuth : ''
    }
    //binding of methods
    this.resetForm = this.resetForm.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset sensor-form to default data */
  resetForm () {
    return {
      _id : '',
      name : '',
      type: '',
      controlAt : '',
      captureAt : '',
      initElevation : '',
  		initAzimuth : ''
    }
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    // check if selected sensor has changed
    if (this.props.sensor !== prevProps.sensor) {
      let newState = this.resetForm();
      // check if there is a Sensor selected or none
      if (this.props.sensor !== null) {
        // check if Sensor is defined or only has been created
        if (!this.props.sensor.type) {
          // if sensor is not yet defined only set _id & name
          newState._id = this.props.sensor._id;
          newState.name = this.props.sensor.name;
        } else {
          // set the form fields to the values loaded
          newState = {
            _id : this.props.sensor._id,
            name : this.props.sensor.name,
            type: this.props.sensor.type,
            controlAt : this.props.sensor.controlAt,
            captureAt : this.props.sensor.captureAt,
            initElevation : this.props.sensor.initState.latitude,
            initAzimuth : this.props.sensor.initState.longitude,
            initElevation : this.props.sensor.initState.elevation,
          };
        }
      }
      this.setState(newState);
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

  /* Handle input of data into de form fields */
  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* Handle save button */
  handleSave() {
  // lift up the form data to be saved
    this.props.onSave(this.state);
  }

  render () {
    return (
      <SensorTypesContext.Consumer>
        {sensorTypes => (
          <form className="sensorForm">
            <Button onClick={this.handleSave}>Save</Button>
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
                  placeholder="select"
                  required>
                  {this.renderSelect(sensorTypes)}
                </FormControl>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>controlAt</InputGroup.Addon>
                <FormControl
                  type="number"
                  onChange={this.handleInputChange}
                  min="0"
                  id="controlAt"
                  value={this.state.controlAt}
                  placeholder="Milisenconds"
                  required>
                </FormControl>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>captureAt</InputGroup.Addon>
                <FormControl
                  type="number"
                  onChange={this.handleInputChange}
                  min="0"
                  id="captureAt"
                  value={this.state.captureAt}
                  placeholder="Milisenconds"
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
                  min="0"
                  max="90"
                  id="initElevation"
                  value={this.state.initElevation}
                  placeholder="Degrees"
                  required/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>Azimuth</InputGroup.Addon>
                <FormControl
                  type="number"
                  onChange={this.handleInputChange}
                  min="0"
                  max="360"
                  id="initAzimuth"
                  value={this.state.initAzimuth}
                  placeholder="Degrees"
                  required/>
              </InputGroup>
            </FormGroup>
          </form>
        )}
      </SensorTypesContext.Consumer>
    );
  }
}

export default SensorForm;
