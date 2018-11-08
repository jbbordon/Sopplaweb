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

function TopMenu (props) {
  /* Render TopMenu component */
  return (
    <Navbar staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          SopplaWeb
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <ScenarioMenu
          onAction={(eventKey, param) => props.onMenuAction('scenario', eventKey, param)}
        />
        <UavMenu
          scenarioID={props.scenario._id}
          onAction={(eventKey, param) => props.onMenuAction('uavs', eventKey, param)}
        />
        <TargetMenu
          scenarioID={props.scenario._id}
          onAction={(eventKey, param) => props.onMenuAction('targets', eventKey, param)}
        />
        <EnvMenu
          scenarioID={props.scenario._id}
          onAction={(eventKey, param) => props.onMenuAction('environment', eventKey, param)}
        />
        <RequestMenu
          scenarioID={props.scenario._id}
          onAction={(eventKey, param) => props.onMenuAction('request', eventKey, param)}
        />
      </Nav>
    </Navbar>
  );
}

export default TopMenu;
