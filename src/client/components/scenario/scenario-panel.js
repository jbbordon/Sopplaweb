/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
import ScenarioForm from './scenario-form.js';
/* Styles import */
import '../../style/scenario.css';

function ScenarioPanel (props) {
  /* Render ScenarioPanel component */
  return (
    <div>
      <Panel defaultExpanded>
        <Panel.Heading>
          <Panel.Title toggle>
            Zone
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <ScenarioForm
              id={props.scenarioID}
              name={props.scenarioName}
              zone={props.scenarioZone}
            />
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </div>
  );
}

export default ScenarioPanel;
