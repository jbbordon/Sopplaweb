/* Modules import */
import React, { Component } from 'react';
/* Components import */
import ModalNew from '../modals/modal-new.js'
import UavPanel from './uav-panel.js';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/uav.css';

/* comoponent class */
class UavPanelGroup extends Component {

  constructor(props, context) {
    super(props, context);
    //binding of methods
    this.fetchScenarioUAVs = this.fetchScenarioUAVs.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFaEdit = this.handleFaEdit.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // internal state
    this.state = {
      showNew : false,
      scenarioUAVs : [],
      activeUAV : ''
    };
  }

  /* Get current scenario uavs from the server */
  fetchScenarioUAVs(scenarioID) {
    fetch('/api/scenario/uavs/' + scenarioID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // update the scenarioUAVs with the data received
          this.setState({scenarioUAVs : data});
        })
      }
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    if (this.props.scenarioID !== "") {
      this.fetchScenarioUAVs(this.props.scenarioID);
    }
  }

  /* handle which scenario uav panel is active */
  handleSelect(activeKey) {
    this.setState({activeUAV : activeKey});
  }

  /* handle the press of faEdit */
  handleFaEdit() {
    this.setState({ showNew: true });
  }

  /* handle the creation of a new uav */
  handleNew(uav) {
    uav.scenarioID = this.props.scenarioID;
    fetch('/api/uavs', {
      method: 'POST',
      body: JSON.stringify(uav),
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
          // update scenario uavs with the data received
          this.setState({scenarioUAVs : data});
          alert(`${uav.name} created`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  handleDelete (uavs) {
    // scenarioUAVs must be updated
    this.setState({ scenarioUAVs : uavs });
  }

  /* Render UavPanelGroup component */
  render() {
    // build the UAVs panels
    const uavPanels = this.state.scenarioUAVs.map(item => {
      return (
        <UavPanel
          scenarioID={this.props.scenarioID}
          key={item._id}
          uavID={item._id}
          uavName={item.name}
          onDelete={(uavs) => this.handleDelete(uavs)}
        />
      );
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>UAVs</Panel.Toggle>
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
              activeKey={this.state.activeUAV}
              onSelect={this.handleSelect}
            >
              {uavPanels}
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
        <ModalNew
          title="New UAV"
          show={this.state.showNew}
          onNew={(uav) => this.handleNew(uav)}
          onHide={() => this.setState({ showNew: false })}
        />
      </Panel>
    );
  }
}

export default UavPanelGroup;
