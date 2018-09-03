/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Tabs, Tab } from 'react-bootstrap';
/* Components import */
import UavTab from '../uavs/uav-tab.js';
import TargetTab from '../targets/target-tab.js';
/* Styles import */
import '../../style/tabs.css';

class ScenarioTabs extends Component {

  constructor (props) {
    super(props);
    // internal state
    //binding of methods
  }

  render () {
    return (
      <Tabs className="tabs" defaultActiveKey={1}>
        <Tab className="tab" eventKey={1} title="UAVS">
          <UavTab
            scenarioID={this.props.scenarioID}
            scenarioUAVs={this.props.scenarioUAVs}
            onUavSave={(param) => this.props.onUavAction('save', param)}
          />
        </Tab>
        <Tab className="tab" eventKey={2} title="Targets">
          <TargetTab
            scenarioID={this.props.scenarioID}
            scenarioTargets={this.props.scenarioTargets}
          />
        </Tab>
        <Tab className="tab" eventKey={3} title="Environment">
          Environment Content
        </Tab>
        <Tab className="tab" eventKey={4} title="Request">
          Request Content
        </Tab>
      </Tabs>
    );
  }

}

export default ScenarioTabs;
