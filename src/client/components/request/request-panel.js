/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
/* Styles import */
import '../../style/request.css';

function RequestPanel (props) {
  /* Render RequestPanel component */
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            Request
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            Request Content
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </div>
  );
}

export default RequestPanel;
