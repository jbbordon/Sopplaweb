/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { PanelGroup } from 'react-bootstrap';
/* Components import */
import ScenarioHeader from '../scenario/scenario-header.js';
import ScenarioPanel from '../scenario/scenario-panel.js'
import UavPanel from '../uavs/uav-panel.js';
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
        scenario={props.scenario.name}
      />
      <PanelGroup>
        <ScenarioPanel
          scenarioID={props.scenario._id}
          scenarioName={props.scenario.name}
          scenarioZone={props.scenario.zone}
          onScenarioAction={(zone) => {props.onScenarioAction('save', zone)}}
        />
        <UavPanel
          scenarioID={props.scenario._id}
          scenarioUAVs={props.scenario.uavs}
          onUavSave={(param) => props.onUavAction('save', param)}
        />
        <TargetPanel
          scenarioID={props.scenario._id}
          scenarioTargets={props.scenario.targets}
        />
        <EnvironmentPanel
          scenarioID={props.scenario._id}
          scenarioEnv={props.scenario.environment}
        />
        <RequestPanel
          scenarioID={props.scenario._id}
          scenarioRqst={props.scenario.request}
        />
      </PanelGroup>
    </div>
  );
}

export default SideBar;
