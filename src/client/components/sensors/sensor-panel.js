/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
/* Context import */
import { SensorTypesContext } from '../sidebar/side-bar.js'
/* Styles import */
import '../../style/sensor.css';

class SensorPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      _id : '',
      name : '',
      type: 0,
      controlAt : '',
      captureAt : '',
      initElevation : '',
      initAzimuth : ''
    }
    //binding of methods
    this.resetState = this.resetState.bind(this);
    this.fetchSensor = this.fetchSensor.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset sensor-state to default data */
  resetState () {
    return {
      _id : '',
      name : '',
      type: 0,
      controlAt : '',
      captureAt : '',
      initElevation : '',
  		initAzimuth : ''
    }
  }

  /* Get a Sensor from the server */
  fetchSensor (sensorID) {
    fetch('/api/sensors/' + sensorID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        let newState = this.resetState();
        // check if Sensor is defined or only has been created
        if (!data.type) {
          // if sensor is not yet defined only set _id & name
          newState._id = data._id;
          newState.name = data.name;
        } else {
          // set the form fields to the values loaded
          newState = {
            _id : data._id,
            name : data.name,
            type: data.type,
            controlAt : data.controlAt,
            captureAt : data.captureAt,
            initElevation : data.initState.elevation,
            initAzimuth : data.initState.azimuth,
          };
        }
        this.setState(newState);
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchSensor(this.props.sensorID);
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
    // call the server to delete the selected sensor
    fetch('/api/sensors/' + this.props.sensorID  + '/uavs/' + this.props.uavID, {
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

  /* save a sensor in the server */
  handleSave() {
    //send the server the PUT request with the new data
    fetch('/api/sensors', {
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
      })
    })
    .catch(err => console.log(err));
  }

  /* Render SensorPanel component */
  render () {
    return (
      <Panel eventKey={this.props.sensorID}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>{this.props.sensorName}</Panel.Toggle>
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              pull="right"
              onClick={this.handleDelete}
            />
            <FontAwesomeIcon
              icon={faSave}
              size="lg"
              pull="right"
              onClick={this.handleSave}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <SensorTypesContext.Consumer>
              {sensorTypes => (
                <form className="sensorForm">
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
                        defaultValue={ 0 }
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
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default SensorPanel;
