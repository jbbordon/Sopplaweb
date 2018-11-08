/* Modules import */
import React, { Component } from 'react';
/* Components import */
import ModalNew from '../modals/modal-new.js'
import TargetPanel from './target-panel.js';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/target.css';

/* comoponent class */
class TargetPanelGroup extends Component {

  constructor(props, context) {
    super(props, context);
    //binding of methods
    this.fetchScenarioTargets = this.fetchScenarioTargets.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFaEdit = this.handleFaEdit.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // internal state
    this.state = {
      showNew : false,
      scenarioTargets : [],
      activeTarget : ''
    };
  }

  /* Get current scenario targets from the server */
  fetchScenarioTargets(scenarioID) {
    fetch('/api/scenario/targets/' + scenarioID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // update the scenarioTargets with the data received
          this.setState({scenarioTargets : data});
        })
      }
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    if (this.props.scenarioID !== "") {
      this.fetchScenarioTargets(this.props.scenarioID);
    }
  }

  /* handle which scenario target panel is active */
  handleSelect(activeKey) {
    this.setState({activeTarget : activeKey});
  }

  /* handle the press of faEdit */
  handleFaEdit() {
    this.setState({ showNew: true });
  }

  /* handle the creation of a new target */
  handleNew(target) {
    target.scenarioID = this.props.scenarioID;
    fetch('/api/targets', {
      method: 'POST',
      body: JSON.stringify(target),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // update scenario targets with the data received
          this.setState({scenarioTargets : data});
          alert(`${target.name} created`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  handleDelete (targets) {
    // scenarioTargets must be updated
    this.setState({ scenarioTargets : targets });
  }

  /* Render TargetPanelGroup component */
  render() {
    // build the Targets panels
    const targetPanels = this.state.scenarioTargets.map(item => {
      return (
        <TargetPanel
          scenarioID={this.props.scenarioID}
          key={item._id}
          targetID={item._id}
          targetName={item.name}
          onDelete={(targets) => this.handleDelete(targets)}
        />
      );
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>Targets</Panel.Toggle>
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              pull="right"
              onClick={this.handleFaEdit}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <PanelGroup accordion
              activeKey={this.state.activeTarget}
              onSelect={this.handleSelect}
            >
              {targetPanels}
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
        <ModalNew
          title="New Target"
          show={this.state.showNew}
          onNew={(target) => this.handleNew(target)}
          onHide={() => this.setState({ showNew: false })}
        />
      </Panel>
    );
  }
}

export default TargetPanelGroup;
