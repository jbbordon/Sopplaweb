/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { PanelGroup } from 'react-bootstrap';
/* Components import */
import ScenarioHeader from '../scenario/scenario-header.js';
import ScenarioPanel from '../scenario/scenario-panel.js'
import UavPanelGroup from '../uavs/uav-panel-group.js';
import TargetPanelGroup from '../targets/target-panel-group.js';
import EnvPanel from '../environment/environment-panel.js';
import RequestPanel from '../request/request-panel.js';
/* Styles import */
import '../../style/sidebar.css';

// create uavTypes, uavModels & sensorTypes context to share it with nested components
const UavTypesContext = React.createContext();
const UavModelsContext = React.createContext();
const SensorTypesContext = React.createContext();

class SideBar extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      uavTypes : [],
      uavModels : [],
      sensorTypes : []
    }
    //binding of methods
    this.fetchUAVTypes = this.fetchUAVTypes.bind(this);
    this.fetchUAVModels = this.fetchUAVModels.bind(this);
    this.fetchSensorTypes = this.fetchSensorTypes.bind(this);
  }

  /* Get available uav types from the server */
  fetchUAVTypes() {
    fetch('/api/uavs/types')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // update the uavTypes list with the data received
        this.setState({uavTypes : data});
      })
    })
    .catch(err => console.log(err))
  }

  /* Get available uav models from the server */
  fetchUAVModels() {
    fetch('/api/uavs/models')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // update the uavModels list with the data received
        this.setState({uavModels : data});
      })
    })
    .catch(err => console.log(err))
  }

  /* Get available sensor types from the server */
  fetchSensorTypes() {
    fetch('/api/sensors/types')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // update the sensorTypes list with the data received
        this.setState({sensorTypes : data});
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchUAVTypes();
    this.fetchUAVModels();
    this.fetchSensorTypes();
  }

  /* Render SideBar component */
  render() {
    return (
      <div className="sidebar">
        <ScenarioHeader
          scenarioName={this.props.scenario.name}
        />
        <PanelGroup>
          <ScenarioPanel
            scenarioID={this.props.scenario._id}
            scenarioName={this.props.scenario.name}
            scenarioZone={this.props.scenario.zone}
          />
          <UavTypesContext.Provider value={this.state.uavTypes}>
            <UavModelsContext.Provider value={this.state.uavModels}>
              <SensorTypesContext.Provider value={this.state.sensorTypes}>
                <UavPanelGroup
                  key={this.props.scenario._id}
                  scenarioID={this.props.scenario._id}
                />
              </SensorTypesContext.Provider>
            </UavModelsContext.Provider>
          </UavTypesContext.Provider>
          <TargetPanelGroup
            key={this.props.scenario._id}
            scenarioID={this.props.scenario._id}
          />
          <EnvPanel
            scenarioID={this.props.scenario._id}
            wind={this.props.scenario.environment.wind}
            nfzs={this.props.scenario.environment.nfzs}
          />
          <RequestPanel
            scenarioID={this.props.scenario._id}
            merit={this.props.scenario.request.merit}
          />
        </PanelGroup>
      </div>
    );
  }

}

export default SideBar;
export { UavTypesContext, UavModelsContext, SensorTypesContext };
