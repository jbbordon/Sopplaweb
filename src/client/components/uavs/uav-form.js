/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Styles import */
import '../../style/uav.css';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

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
    this.setState({
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
    });
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props.selectedUAV !== prevProps.selectedUAV) {
      // reset UAV form
      this.resetForm();
      // check if there is a UAV selected or none
      if (this.props.selectedUAV !== null) {
        // check if UAV is defined or only has been created
        if (!this.props.selectedUAV.type) {
          // if uav is not yet defined only set _id & name
          this.setState ({
            _id : this.props.selectedUAV._id,
            name : this.props.selectedUAV.name,
          });
        } else {
          // set the form fields to the values loaded
          this.setState ({
            _id : this.props.selectedUAV._id,
            name : this.props.selectedUAV.name,
            type: this.props.selectedUAV.type,
            modelType : this.props.selectedUAV.motionModel.model,
            modelAt : this.props.selectedUAV.motionModel.at,
            initLatitude : this.props.selectedUAV.initState.latitude,
            initLongitude : this.props.selectedUAV.initState.longitude,
            initElevation : this.props.selectedUAV.initState.elevation,
        		initHeading : this.props.selectedUAV.initState.heading,
        		initYaw : this.props.selectedUAV.initState.yaw,
        		initSpeed : this.props.selectedUAV.initState.speed,
            initTime : this.props.selectedUAV.initTime,
            finalLatitude : this.props.selectedUAV.finalState.latitude,
            finalLongitude : this.props.selectedUAV.finalState.longitude,
            finalElevation : this.props.selectedUAV.finalState.elevation,
        		finalHeading : this.props.selectedUAV.finalState.heading,
        		finalSpeed : this.props.selectedUAV.finalState.speed,
            flightTime : this.props.selectedUAV.flightTime
          });
        }
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

  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  handleSave(event) {
    event.preventDefault();
    // build the data to save
    const uav = this.state;
    //send the server the PUT request with the new data
    fetch('/api/uavs', {
      method: 'PUT',
      body: JSON.stringify(uav),
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
        // if data is updated ok then lift up the UAV to be stored at app level
        this.props.onSave(data);
      })
    })
    .catch(err => console.log(err));
  }

  render () {
    return (
      <form className="uavForm" onSubmit={this.handleSave}>
        <Button type="submit">Save</Button>
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
              required>
              <option value="none">Select</option>
              {this.renderSelect(this.props.uavTypes)}
            </FormControl>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Model</InputGroup.Addon>
            <FormControl
              componentClass="select"
              onChange={this.handleInputChange}
              id="modelType"
              value={this.state.modelType}
              required>
              <option value="none">Select</option>
              {this.renderSelect(this.props.uavModels)}
            </FormControl>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>AT</InputGroup.Addon>
            <FormControl
              type="number"
              onChange={this.handleInputChange}
              id="modelAt"
              value={this.state.modelAt}
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
    );
  }
}

export default UavForm;
