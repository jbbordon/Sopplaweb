/* Modules import */
import React, { Component } from 'react';
/* Styles import */
import '../../style/scenario.css';

function ScenarioHeader (props) {
  return (
    <div id="header">
      <h3> SopplaWeb </h3>
      <h4> Scenario : {props.scenario} </h4>
    </div>
  );
}

export default ScenarioHeader;
