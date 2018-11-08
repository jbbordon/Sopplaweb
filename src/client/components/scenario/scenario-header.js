/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Styles import */
import '../../style/scenario.css';

function ScenarioHeader (props) {
  return (
    <Panel.Heading>
      <h4> Scenario : {props.scenarioName} </h4>
    </Panel.Heading>
  );
}

export default ScenarioHeader;
