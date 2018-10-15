/* Modules import */
import React, { Component } from 'react';
/* Components import */
import UavPanel from './uav-panel.js';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* Styles import */
import '../../style/uav.css';

// create uavTypes, uavModels & sensorTypes context to share it with nested components
const UavTypesContext = React.createContext();
const UavModelsContext = React.createContext();
const SensorTypesContext = React.createContext();

/* comoponent class */
class UavPanelGroup extends Component {

  constructor(props, context) {
    super(props, context);
    //binding of methods
    this.fetchUAVTypes = this.fetchUAVTypes.bind(this);
    this.fetchUAVModels = this.fetchUAVModels.bind(this);
    this.fetchSensorTypes = this.fetchSensorTypes.bind(this);
    this.fetchScenarioUAVs = this.fetchScenarioUAVs.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // internal state
    this.state = {
      uavTypes : [],
      uavModels : [],
      sensorTypes : [],
      scenarioUAVs : [],
      activeUAV : ''
    };
  }

  /* Get current uav types from the server */
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

  /* Get current uav models from the server */
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

  /* Get current sensor types from the server */
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

  /* Get current scenario uavs from the server */
  fetchScenarioUAVs(scenarioID) {
    fetch('/api/scenario/uavs/' + scenarioID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // update the scenarioUAVs with the data received
        this.setState({scenarioUAVs : data});
        // lift up scenarioUAVs have been updated
        this.props.onUpdate();
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

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // scenarioUAVs must be updated & activeUAV reset
      this.setState({scenarioUAVs : this.props.scenarioUAVs});
    }
  }

  /* handle the selection of scenario UAVs */
  handleSelect(activeKey) {
    this.setState({activeUAV : activeKey});
  }

  /* Render UavPanelGroup component */
  render() {
    // build the UAVs panels
    const uavs = this.state.scenarioUAVs.map(item => {
      return (
        <UavTypesContext.Provider value={this.state.uavTypes}>
          <UavModelsContext.Provider value={this.state.uavModels}>
            <SensorTypesContext.Provider value={this.state.sensorTypes}>
              <UavPanel
                eventKey={item._id}
                uavName={item.name}
              />
            </SensorTypesContext.Provider>               
          </UavModelsContext.Provider>
        </UavTypesContext.Provider>
      );
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            UAVs
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <PanelGroup accordion
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
            >
              {uavs}
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default UavPanelGroup;
export { UavTypesContext, UavModelsContext, SensorTypesContext };
