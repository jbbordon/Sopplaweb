/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
import TargetSelector from './target-selector.js';
/* Styles import */
import '../../style/target.css';

function TargetPanel (props) {
  /* Render RequestPanel component */
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            Targets
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            Targets Content
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </div>
  );
}

export default TargetPanel;
