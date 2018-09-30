/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
/* Styles import */
import '../../style/request.css';

function EnvironmentPanel (props) {
  /* Render EnvironmentPanel component */
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            Environment
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            Environment Content
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </div>
  );
}

export default EnvironmentPanel;
