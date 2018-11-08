/* Modules import */
import React, { Component } from 'react';
/* Components import */
import SensorPanelGroup from '../sensors/sensor-panel-group.js';
/* Bootstrap components import */
import { PanelGroup, Panel, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/uav.css';
/* UAV cesium scripts import */
import CesiumUavs from '../../scripts/cesium-uavs.js';
/* Context import */
import { UavTypesContext, UavModelsContext } from '../sidebar/side-bar.js'

class UavPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      _id : '',
      name : '',
      type: 0,
      modelType : 0,
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
    this.resetState = this.resetState.bind(this);
    this.fetchUAV = this.fetchUAV.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset uav-state to default data */
  resetState () {
    return {
      _id : '',
      name : '',
      type: 0,
      modelType : 0,
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

  /* Get a uav from the server */
  fetchUAV (uavID) {
    fetch('/api/uavs/' + uavID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          let newState = this.resetState();
          // check if UAV is defined or only has been created
          if (!data.type) {
            // if uav is not yet defined only set _id & name
            newState._id = data._id;
            newState.name = data.name;
          } else {
            CesiumUavs.paintUAV(data);
            // set the form fields to the values loaded
            newState = {
              _id : data._id,
              name : data.name,
              type: data.type,
              modelType : data.motionModel.type,
              modelAt : data.motionModel.at,
              initLatitude : data.initState.latitude,
              initLongitude : data.initState.longitude,
              initElevation : data.initState.elevation,
              initHeading : data.initState.heading,
              initYaw : data.initState.yaw,
              initSpeed : data.initState.speed,
              initTime : data.initTime,
              finalLatitude : data.finalState.latitude,
              finalLongitude : data.finalState.longitude,
              finalElevation : data.finalState.elevation,
              finalHeading : data.finalState.heading,
              finalSpeed : data.finalState.speed,
              flightTime : data.flightTime
            };
          }
          this.setState(newState);
        })
      }
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchUAV(this.props.uavID);
  }

  /* Render a "select input" with the list of options passed as a parameter */
  renderSelect(options) {
    const list = options.map((item, index) => {
      return (
        <option value={index}>{item}</option>
      );
    });
    return list;
  }

  /* Handle input of data into de form fields */
  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* handle the press of faTrash */
  handleDelete() {
    // call the server to delete the selected uav
    fetch('/api/uavs/' + this.props.uavID  + '/scenario/' + this.props.scenarioID, {
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
          // setup state with the data received
          this.props.onDelete(data);
          alert(`${this.state.name} deleted`);
        })
      }
    })
    .catch(err => console.log(err));
  }

  /* Save a uav in the server */
  handleSave() {
    //send the server the PUT request with the new data
    fetch('/api/uavs', {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        alert(`${data.name} saved`);
        // paint the UAV on Cesium
        CesiumUavs.paintUAV(data);
      })
    })
    .catch(err => console.log(err));
  }

  /* Render UavPanel component */
  render () {
    return (
      <Panel eventKey={this.props.uavID}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>{this.props.uavName}</Panel.Toggle>
            <FontAwesomeIcon
              icon={faSave}
              size="lg"
              pull="right"
              onClick={this.handleSave}
            />
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              pull="right"
              onClick={this.handleDelete}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <UavTypesContext.Consumer>
              {uavTypes => (
                <UavModelsContext.Consumer>
                  {uavModels => (
                    <form className="uavForm">
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
            <PanelGroup>
              <SensorPanelGroup
                key={this.props.uavID}
                uavID={this.props.uavID}
              />
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default UavPanel;
