/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel, PanelGroup } from 'react-bootstrap';
/* Components import */
import WindPanel from './wind-panel.js';
import NfzPanelGroup from './nfz-panel-group.js';
/* Styles import */
import '../../style/environment.css';

function EnvPanel (props) {
  /* Render EnvironmentPanel component */
  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title toggle>
          Environment
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <PanelGroup>
            <WindPanel
              className="windPanel"
              scenarioID={props.scenarioID}
              wind={props.wind}
              />
            <NfzPanelGroup
              key={props.scenarioID}
              scenarioID={props.scenarioID}
              nfzs={props.nfzs}
            />
          </PanelGroup>
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  );
}

export default EnvPanel;
