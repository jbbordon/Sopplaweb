/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
import SensorSelector from './sensor-selector.js';
import SensorForm from './sensor-form.js';
/* Styles import */
import '../../style/sensor.css';

class SensorPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      sensorTypes : [],
      sensorArray : [],
      selectedValue : 0,
      selectedSensor : null
    }
    //binding of methods
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* Class method called when component is mounted */
  componentDidMount() {
    /* Call the server to get the uav sensor types available */
    fetch('/api/uavs/sensors')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavSensors list with the data received
        this.setState({ sensorTypes: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // check if the uav has at least 1 Sensor
      if (this.props.uavSensors.length !== 0) {
        // select the first uav in the list
        this.setState ({
          selectedValue : 0,
          selectedSensor : this.props.uavSensors[0]
        })
      } else {
        // reset state
        this.setState ({
          selectedValue : 0,
          selectedSensor : null
        })
      }
    }
  }

  handleSelect (value) {
    // get sensor selected from the uav sensor list
    const sensor = this.props.uavSensors[value];
    // set state with the sensor selected
    this.setState ({
      selectedValue : value,
      selectedSensor : sensor
    })
  }

  handleSave (sensor) {
    const param = {
      pos : this.state.selectedValue,
      sensor : jsonp(sensor)
    }
    this.props.onSave(param)
  }

  /* Render SensorTab component */
  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            Sensors
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <SensorSelector
              uavSensors={this.props.uavSensors}
              selectedValue={this.state.selectedValue}
              onSelect={(value) => this.handleSelect(value)}
            />
            <SensorForm
              sensorTypes={this.state.sensorTypes}
              selectedUAV={this.props.selectedUAV}
              selectedSensor={this.state.selectedSensor}
              onSave={(sensor) => this.handleSave(sensor)}
            />
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default SensorPanel;
