/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Styles import */
import '../../style/uav.css';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
/* Context import */
import { UavTypesContext, UavModelsContext } from './uav-panel-group.js'

class UavForm extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      _id : '',
      name : '',
      type: '',
      modelType : '',
      modelAt : '',
      initLatitude : '',
      initLongitude : '',
      initElevation : '',
  		initHeading : '',
  		initYaw : '',
  		initSpeed : '',
      initTime : '',
      finalLatitude : '',
      finalLongitude : '',
      finalElevation : '',
  		finalHeading : '',
  		finalSpeed : '',
      flightTime : ''
    }
    //binding of methods
    this.resetForm = this.resetForm.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset uav-form to default data */
  resetForm () {
    return {
      _id : '',
      name : '',
      type: '',
      modelType : '',
      modelAt : '',
      initLatitude : '',
      initLongitude : '',
      initElevation : '',
      initHeading : '',
      initYaw : '',
      initSpeed : '',
      initTime : '',
      finalLatitude : '',
      finalLongitude : '',
      finalElevation : '',
      finalHeading : '',
      finalSpeed : '',
      flightTime : ''
    }
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    // check if selected uav has changed
    if (this.props.uav !== prevProps.uav) {
      let newState = this.resetForm();
      // check if there is a UAV selected or none
      if (this.props.uav !== null) {
        // check if UAV is defined or only has been created
        if (!this.props.uav.type) {
          // if uav is not yet defined only set _id & name
          newState._id = this.props.uav._id;
          newState.name = this.props.uav.name;
        } else {
          // set the form fields to the values loaded
          newState = {
            _id : this.props.uav._id,
            name : this.props.uav.name,
            type: this.props.uav.type,
            modelType : this.props.uav.motionModel.type,
            modelAt : this.props.uav.motionModel.at,
            initLatitude : this.props.uav.initState.latitude,
            initLongitude : this.props.uav.initState.longitude,
            initElevation : this.props.uav.initState.elevation,
            initHeading : this.props.uav.initState.heading,
            initYaw : this.props.uav.initState.yaw,
            initSpeed : this.props.uav.initState.speed,
            initTime : this.props.uav.initTime,
            finalLatitude : this.props.uav.finalState.latitude,
            finalLongitude : this.props.uav.finalState.longitude,
            finalElevation : this.props.uav.finalState.elevation,
            finalHeading : this.props.uav.finalState.heading,
            finalSpeed : this.props.uav.finalState.speed,
            flightTime : this.props.uav.flightTime
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
      <UavTypesContext.Consumer>
        {uavTypes => (
          <UavModelsContext.Consumer>
            {uavModels => (
              <form className="uavForm">
                <Button onClick={this.handleSave}>Save</Button>
                <FormGroup className="uavDef" bsSize="small">
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
                      {this.renderSelect(uavTypes)}
                    </FormControl>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>Model</InputGroup.Addon>
                    <FormControl
                      componentClass="select"
                      onChange={this.handleInputChange}
                      id="modelType"
                      value={this.state.modelType}
                      placeholder="select"
                      required>
                      {this.renderSelect(uavModels)}
                    </FormControl>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>AT</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      id="modelAt"
                      value={this.state.modelAt}
                      placeholder="Milisenconds"
                      required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="uavInitState" bsSize="small">
                  <label>Initial State</label>
                  <InputGroup>
                    <InputGroup.Addon>Latitude</InputGroup.Addon>
                    <FormControl
                      type="real"
                      onChange={this.handleInputChange}
                      min="-90"
                      max="90"
                      id="initLatitude"
                      value={this.state.initLatitude}
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
                      id="initLongitude"
                      value={this.state.initLongitude}
                      placeholder="Decimal Degrees"
                      required/>
                  </InputGroup>
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
                    <InputGroup.Addon>Yaw</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      min="0"
                      max="180"
                      id="initYaw"
                      value={this.state.initYaw}
                      placeholder="Degrees"
                      required/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>Speed</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      id="initSpeed"
                      value={this.state.initSpeed}
                      placeholder="m/s"
                      required/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>Init Time</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      id="initTime"
                      value={this.state.initTime}
                      placeholder="seconds"
                      required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="uavFinalState" bsSize="small">
                  <label>Final State</label>
                  <InputGroup>
                    <InputGroup.Addon>Latitude</InputGroup.Addon>
                    <FormControl
                      type="real"
                      onChange={this.handleInputChange}
                      min="-90"
                      max="90"
                      id="finalLatitude"
                      value={this.state.finalLatitude}
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
                      id="finalLongitude"
                      value={this.state.finalLongitude}
                      placeholder="Decimal Degrees"
                      required/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>Elevation</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      id="finalElevation"
                      value={this.state.finalElevation}
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
                      id="finalHeading"
                      value={this.state.finalHeading}
                      placeholder="Degrees"
                      required/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>Speed</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      id="finalSpeed"
                      value={this.state.finalSpeed}
                      placeholder="m/s"
                      required/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Addon>Flight Time</InputGroup.Addon>
                    <FormControl
                      type="number"
                      onChange={this.handleInputChange}
                      id="flightTime"
                      value={this.state.flightTime}
                      placeholder="seconds"
                      required/>
                  </InputGroup>
                </FormGroup>
              </form>
            )}
          </UavModelsContext.Consumer>
        )}
      </UavTypesContext.Consumer>
    );
  }
}

export default UavForm;
