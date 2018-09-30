/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
import UavSelector from './uav-selector.js';
import UavForm from './uav-form.js';
import SensorPanel from '../sensors/sensor-panel.js'
/* Styles import */
import '../../style/uav.css';
/* UAV cesium scripts import */
import CesiumUavs from '../../scripts/cesium-uavs.js';

class UavPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      uavTypes : [],
      uavModels : [],
      selectedValue : 0,
      selectedUAV : null,
      uavSensors : []
    }
    //binding of methods
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSa = this.handleSave.bind(this);
  }

  /* Class method called when component is mounted */
  componentDidMount() {
    /* Call the server to get the uav types available */
    fetch('/api/uavs/types')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavTypes list with the data received
        this.setState({ uavTypes: data })
      })
    })
    .catch(err => console.log(err))
    /* Call the server to get the uav models available */
    fetch('/api/uavs/models')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavModels list with the data received
        this.setState({ uavModels: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps)  {
      // check if scenario has at least 1 UAV
      if (this.props.scenarioUAVs.length !== 0) {
        // select the first uav in the list
        this.setState ({
          selectedValue : 0,
          selectedUAV : this.props.scenarioUAVs[0],
          uavSensors : this.props.scenarioUAVs[0].sensor
        })
      } else {
        // reset state
        this.setState ({
          selectedValue : 0,
          selectedUAV : null,
          uavSensors :[]
        })
      }
    }
  }

  handleSelect(value) {
    // get selected uav from the scenario uavs list
    const uav = this.props.scenarioUAVs[value];
    const sensors = this.props.scenarioUAVs[value].sensor;
    // update internal state with the required UAV
    this.setState({
      selectedValue : value,
      selectedUAV : uav,
      uavSensors : sensors
    });
  }

  handleSave (uav) {
    const param = {
      pos : this.state.selectedValue,
      uav : uav
    }
    CesiumUavs.paintUAV(uav);
    this.props.onUavSave(param);
  }

  handleSensorAction (eventKey, param) {
    switch (eventKey) {
      case 'new':
        this.setState({uavSensors : param});
        break;
      case 'save':
        let sensorsArray = Object.assign({}, this.state.uavSensors);
        sensorsArray[param.selectedSensor] = param.sensor;
        this.setState({uavSensors : sensorsArray});
        break;
      case 'remove':
        this.setState({uavSensors : param});
        break;
      default:
        break;
    }
  }

  /* Render UavPanel component */
  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            UAVs
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <UavSelector
              selectedValue={this.state.selectedValue}
              scenarioUAVs={this.props.scenarioUAVs}
              onSelect={(value) => this.handleSelect(value)}
            />
            <UavForm
              uavTypes={this.state.uavTypes}
              uavModels={this.state.uavModels}
              selectedUAV={this.state.selectedUAV}
              onSave={(uav) => this.handleSave(uav)}
            />
            <SensorPanel
              selectedUAV={this.state.selectedUAV}
              uavSensors={this.state.uavSensors}
              onAction={(eventKey, param) => this.handleSensorAction(eventKey, param)}
            />
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default UavPanel;
