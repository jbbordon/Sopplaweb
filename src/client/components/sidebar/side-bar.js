/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { PanelGroup } from 'react-bootstrap';
/* Components import */
import ScenarioHeader from '../scenario/scenario-header.js';
import ScenarioPanel from '../scenario/scenario-panel.js'
import UavPanelGroup from '../uavs/uav-panel-group.js';
import TargetPanel from '../targets/target-panel.js';
import EnvironmentPanel from '../environment/environment-panel.js';
import RequestPanel from '../request/request-panel.js';
/* Styles import */
import '../../style/sidebar.css';

function SideBar (props) {
  /* Render SideBar component */
  return (
    <div>
      <ScenarioHeader
        scenarioName={props.scenario.name}
      />
      <PanelGroup>
        <ScenarioPanel
          scenarioID={props.scenario._id}
          scenarioName={props.scenario.name}
          scenarioZone={props.scenario.zone}
        />
        <UavPanelGroup
          scenarioID={props.scenario._id}
          scenarioUAVs={props.scenario.uavs}
          onAction={(eventKey, param)=>this.props.onComponentAction('uavs', eventKey, param)}
        />
        <TargetPanel
          scenarioID={props.scenario._id}
        />
        <EnvironmentPanel
          scenarioID={props.scenario._id}
        />
        <RequestPanel
          scenarioID={props.scenario._id}
        />
      </PanelGroup>
    </div>
  );
}

export default SideBar;
