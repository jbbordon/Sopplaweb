/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Components import */
import TopMenu from './topmenu/top-menu.js'
import SideBar from './sidebar/side-bar.js'
/* Styles import */
import '../style/app.css';
/* Scenario cesium scripts import */
import CesiumScenario from '../scripts/cesium-scenario.js';

class App extends Component {

  /* Class contructor method */
  constructor (props) {
    super(props);
    // internal state
    this.state = {
      scenario : {
        _id : "",
        name : "Default",
        zone : "",
        uavs : [],
        targets : [],
        environment : {
          wind : "",
          nfzs : []
        },
        request : {
          merit : {
            constraints : [],
      			paretos     : [],
      			sorting     : []
          }
        }
      }
    }
    //binding of methods
    this.resetScenario = this.resetScenario.bind(this);
    this.handleTopMenu = this.handleTopMenu.bind(this);
    this.handleScenarioMenu = this.handleScenarioMenu.bind(this);
    this.handleUavMenu = this.handleUavMenu.bind(this);
    this.handleTargetMenu = this.handleTargetMenu.bind(this);
    this.handleEnvMenu = this.handleEnvMenu.bind(this);
    this.handleRequestMenu = this.handleRequestMenu.bind(this);
    this.handleSideBar = this.handleSideBar.bind(this);
    this.handleScenarioComp = this.handleScenarioComp.bind(this);
    this.handleUavComp = this.handleUavComp.bind(this);
    this.handleTargetComp = this.handleTargetComp.bind(this);
    this.handleEnvComp = this.handleEnvComp.bind(this);
    this.handleRequestComp = this.handleRequestComp.bind(this);
  }

  /* reset current scenario to default data */
  resetScenario () {
    this.setState({
      scenario : {
        _id : "",
        name : "Default",
        zone : "",
        uavs : [],
        targets : [],
        environment : {
          wind : "",
          nfzs : []
        }
      }
    });
  }

  /* Handles Top menu */
  handleTopMenu (menu, eventKey, param) {
    switch (menu) {
      case 'scenario':
        this.handleScenarioMenu(eventKey, param);
        break;
      case 'uavs':
        this.handleUavMenu(eventKey, param);
        break;
      case 'targets':
        this.handleTargetMenu(eventKey, param);
        break;
      case 'environment':
        this.handleEnvMenu(eventKey, param);
        break;
      case 'request':
        this.handleRequestMenu(eventKey, param);
        break;
      default:
        break;
    }
  }

  /* Handles Scenario menu */
  handleScenarioMenu (eventKey, param) {
    if (eventKey == 'delete') {
      // reset scenario data
      this.resetScenario();
    } else {
      let newScenario = Object.assign({}, this.state.scenario, param);
      this.setState({scenario : newScenario});
    }
  }

  /* Handles UAVs menu */
  handleUavMenu (eventKey, param) {
    let newScenario = Object.assign({}, this.state.scenario);
    newScenario.uavs = param;
    this.setState({scenario : newScenario});
  }

  /* Handles Target menu */
  handleTargetMenu (eventKey, param) {
  }

  /* Handles Environment menu */
  handleEnvMenu (eventKey, env) {
  }

  /* Handles Request menu */
  handleRequestMenu (eventKey, request) {
  }

  /* Handles ring back of a component that has been requested to update */
  handleSideBar (component, eventKey, param) {
    switch (component) {
      case 'scenario':
        this.handleScenarioComp(eventKey, param);
        break;
      case 'uavs':
        this.handleUavComp(eventKey, param);
        break;
      case 'targets':
        this.handleTargetComp(eventKey, param);
        break;
      case 'environment':
        this.handleEnvComp(eventKey, param);
        break;
      case 'request':
        this.handleRequestComp(eventKey, param);
        break;
      default:
        break;
    }
  }

  /* Handles Scenario sidebar component */
  handleScenarioComp (eventKey, param) {
  }

  /* Handles UAVs sidebar component */
  handleUavComp (eventKey, param) {
    let newScenario = Object.assign({}, this.state.scenario);
    newScenario.uavs = param;
    this.setState({scenario : newScenario});
  }

  /* Handles Target sidebar component */
  handleTargetComp (eventKey, param) {
    let newScenario = Object.assign({}, this.state.scenario);
    newScenario.targets = param;
    this.setState({scenario : newScenario});
  }

  /* Handles Environment sidebar component */
  handleEnvComp (eventKey, env) {
  }

  /* Handles Request sidebar component */
  handleRequestComp (eventKey, request) {
  }

  /* Component render method */
  render () {
    return (
      <div className='app'>
        <TopMenu
          scenario={this.state.scenario}
          onMenuAction={(menu, eventKey, param) => this.handleTopMenu(menu, eventKey, param)}
        />
        <SideBar
          scenario={this.state.scenario}
          onComponentAction={(component, eventKey, param) => this.handleSideBar(component, eventKey, param)}
        />
      </div>
    );
  }
}

export default App;
