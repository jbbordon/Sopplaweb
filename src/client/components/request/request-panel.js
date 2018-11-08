/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
import MeritForm from './merit-form.js';
/* Styles import */
import '../../style/request.css';

function RequestPanel (props) {
  /* Render RequestPanel component */
  return (
    <Panel>
      <Panel.Heading>
        <Panel.Title toggle>
          Request
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <MeritForm
            merit={props.merit}
          />
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  );
}

export default RequestPanel;
