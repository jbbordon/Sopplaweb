/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Components import */
import SopplaNav from './navbar/soppla-bar.js'
import ScenarioHeader from './scenario/scenario-header.js'
import ScenarioForm from './scenario/scenario-form.js'
import ScenarioTabs from './scenario/scenario-tabs.js'
/* Styles import */
import 'cesium/Widgets/widgets.css';
import '../style/app.css';
/* Cesium import */
import Cesium from 'cesium/Cesium';

// cesium instance
var viewer = new Cesium.Viewer('cesiumContainer');

class App extends Component {

  /* Class contructor method */
  constructor (props) {
    super(props);
    // internal state
    this.state = {
      scenario : {
        _id : "",
        name : "Default",
        zone : {
          latitude : "",
          longitude : "",
          xWidth : "",
          yHeight: "",
          areaBearing: "",
          xCells: "",
          yCells: "",
        },
        uavs : [],
        targets : [],
        environment : {
          _id : ""
        }
      }
    }
    //binding of methods
    this.resetScenario = this.resetScenario.bind(this);
    this.handleScenarioMenu = this.handleScenarioMenu.bind(this);
    this.handleUavMenu = this.handleUavMenu.bind(this);
    this.handleTargetMenu = this.handleTargetMenu.bind(this);
    this.handleEnvMenu = this.handleEnvMenu.bind(this);
    this.handleRequestMenu = this.handleRequestMenu.bind(this);
  }

  /* reset current scenario to default data */
  resetScenario () {
    this.setState({
      scenario : {
        _id : "",
        name : "Default",
          zone : {
            latitude : "",
            longitude : "",
            xWidth : "",
            yHeight: "",
            areaBearing: "",
            xCells: "",
            yCells: "",
          },
        uavs : [],
        targets : [],
        environment : {
          _id : ""
        }
      }
    });
  }

  /* Handles Scenario menu */
  handleScenarioMenu (eventKey, param) {
    // new, load, save update scenario data
    switch (eventKey) {
      case 'new':
        this.setState({scenario : param});
        break;
      case 'load':
        this.setState({scenario : param});
        break;
      case 'save':
        this.setState({scenario : param});
        break;
      case 'delete':
        // check if scenario deleted is the current one
        if (this.state.scenario._id == param._id) {
          // reset scenario data
          this.resetScenario();
        }
        break;
      default:
        break;
    }
  }

  /* Handles UAVs menu */
  handleUavMenu (eventKey, param) {
    // add & remove update scenario UAVs
    let scenario = Object.assign({}, this.state.scenario);
    scenario.uavs = param;
    this.setState({scenario});
  }

  /* Handles Target menu */
  handleTargetMenu (eventKey, param) {
    // add, remove & delete update scenario targets
    let scenario = Object.assign({}, this.state.scenario);
    scenario.targets = param;
    this.setState({scenario});
  }

  /* Handles Environment menu */
  handleEnvMenu (eventKey, env) {
  }

  /* Handles Request menu */
  handleRequestMenu (eventKey, request) {
  }

  /* Component render method */
  render () {
    return (
      <div className='app'>
        <div className='sopplaNav'>
          <SopplaNav
            scenarioID={this.state.scenario._id}
            onScenarioAction={(eventKey, param) => this.handleScenarioMenu(eventKey, param)}
            onUavAction={(eventKey, param) => this.handleUavMenu(eventKey, param)}
            onTargetAction={(target) => this.handleTargetMenu(target)}
            onEnvAction={(env) => this.handleEnvMenu(env)}
            onRequestAction={(request) => this.handleRequestMenu(request)}
          />
        </div>
        <div className='scenario'>
          <ScenarioHeader
            scenario={this.state.scenario.name}
          />
          <ScenarioForm
            name={this.state.scenario.name}
            id={this.state.scenario._id}
            zone={this.state.scenario.zone}
            onSave={(scenario) => this.handleScenarioMenu('save', scenario)}
          />
          <ScenarioTabs
            scenarioID={this.state.scenario._id}
            scenarioUAVs={this.state.scenario.uavs}
            scenarioTargets={this.state.scenario.targets}
          />
        </div>
      </div>
    );
  }
}

export default App;
