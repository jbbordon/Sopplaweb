/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Tabs, Tab } from 'react-bootstrap';

function ScenarioTabs(props) {
  return (
    <Tabs defaultActiveKey={1}>
      <Tab eventKey={1} title="UAVS">
        UAVS Content
      </Tab>
      <Tab eventKey={2} title="Targets">
        Targets Content
      </Tab>
      <Tab eventKey={3} title="Environment">
        Environment Content
      </Tab>
    </Tabs>
  );
}

export default ScenarioTabs;