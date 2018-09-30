/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { Navbar, Nav } from 'react-bootstrap';
/* Styles import */
import '../../style/topmenu.css';
/* Components import */
import ScenarioMenu from './scenario-menu.js';
import TargetMenu from './target-menu.js';
import UavMenu from './uav-menu.js';
import EnvMenu from './env-menu.js';
import RequestMenu from './request-menu.js';

class TopMenu extends Component {

  constructor (props) {
    super(props);
    // internal state
    //binding of methods
  }

  render () {
    return (
      <Navbar>
        <Nav pullRight>
          <ScenarioMenu
            onAction={(eventKey, param) => this.props.onScenarioAction(eventKey, param)}
          />
          <UavMenu
            scenario={this.props.scenario._id}
            scenarioUAVs={this.props.scenario.uavs}
            onAction={(eventKey, param) => this.props.onUavAction(eventKey, param)}
          />
          <TargetMenu
            onAction={(eventKey, target) => this.props.onTargetAction(eventKey, target)}
          />
          <EnvMenu
            onAction={(eventKey, env) => this.props.onEnvAction(eventKey, env)}
          />
          <RequestMenu
            onAction={(eventKey, request) => this.props.onRequestAction(eventKey, request)}
          />
        </Nav>
      </Navbar>
    );
  }
}

export default TopMenu;
