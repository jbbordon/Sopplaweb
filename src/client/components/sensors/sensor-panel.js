/* Modules import */
import React, { Component } from 'react';
/* Components import */
import SensorForm from './Sensor-form.js';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
/* Styles import */
import '../../style/Sensor.css';

class SensorPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      sensor : null
    }
    //binding of methods
    this.fetchSensor = this.fetchSensor.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFaTrash = this.handleFaTrash.bind(this);
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
        // setup state with the data received
        this.setState({sensor : data});
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchSensor(this.props.eventKey);
  }

  /* Save a Sensor in the server */
  handleSave(sensor) {
    //send the server the PUT request with the new data
    fetch('/api/sensors', {
      method: 'PUT',
      body: JSON.stringify(Sensor),
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

  /* handle the press of faTrash */
  handleFaTrash() {
  }

  /* Render SensorPanel component */
  render () {
    return (
      <Panel eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.sensorName}
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              pull="right"
              onClick={this.handleFaTrash}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            Aquí iría el formulario de los sensores
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default SensorPanel;
