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
        // draw scenario on cesium map
        CesiumScenario.drawScenario(param);
        break;
      case 'save':
        // get internal state
        let scenario = Object.assign({}, this.state.scenario);
        scenario.zone = param;
        // save it
        this.setState({scenario});
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
    // get internal state
    let scenario = Object.assign({}, this.state.scenario);
    // UAV operations
    switch (eventKey) {
      case 'add':
        scenario.uavs = param;
        break;
      case 'save':
        scenario.uavs[param.pos] = param.uav;
        break;
      case 'remove':
        scenario.uavs = param;
        break;
      case 'delete':
        scenario.uavs = param;
        break;
      default:
        break;
    }
    // set state with the modified data
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
        <TopMenu
          scenario={this.state.scenario}
          onScenarioAction={(eventKey, param) => this.handleScenarioMenu(eventKey, param)}
          onUavAction={(eventKey, param) => this.handleUavMenu(eventKey, param)}
          onTargetAction={(target) => this.handleTargetMenu(target)}
          onEnvAction={(env) => this.handleEnvMenu(env)}
          onRequestAction={(request) => this.handleRequestMenu(request)}
        />
        <SideBar
          scenario={this.state.scenario}
          onScenarioAction={(eventKey, param) => this.handleScenarioMenu(eventKey, param)}
          onUavAction={(eventKey, param) => this.handleUavMenu(eventKey, param)}
        />
      </div>
    );
  }
}

export default App;
