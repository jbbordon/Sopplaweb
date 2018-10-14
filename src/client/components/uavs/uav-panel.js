/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* Components import */
import UavForm from './uav-form.js';
import SensorPanelGroup from '../sensors/sensor-panel-group.js';
/* Styles import */
import '../../style/uav.css';
/* UAV cesium scripts import */
import CesiumUavs from '../../scripts/cesium-uavs.js';

class UavPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      uav : null,
    }
    //binding of methods
    this.fetchUAV = this.fetchUAV.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* Get a uav from the server */
  fetchUAV (uavID) {
    fetch('/api/uavs/' + uavID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // setup state with the data received
        this.setState({uav : data});
        // paint the UAV on Cesium if it's already defined
        if (data.type) {
          CesiumUavs.paintUAV(data);
        }
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchUAV(this.props.eventKey);
  }

  /* Lifecycle method called immediately after updating occurs
  componentDidUpdate(prevProps) {
    console.log("llamado");
    console.log(this.props.eventKey);
    console.log(prevProps.eventKey);
    if (this.props.eventKey !== prevProps.eventKey) {
      // scenario has changed or reloded
      this.fetchUAV(this.props.eventKey);
    }
  } */

  /* Save a uav in the server */
  handleSave(uav) {
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

    let sensorArray = [];
    if (this.state.uav !== null) {
      sensorArray = this.state.uav.sensor;
    }

    return (
      <Panel eventKey={this.props.eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.uavName}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <UavForm
              uav={this.state.uav}
              onSave={(uav) => this.handleSave(uav)}
            />
            <PanelGroup>
              <SensorPanelGroup
                uavID={this.props.eventKey}
                uavSensors={sensorArray}
              />
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default UavPanel;
