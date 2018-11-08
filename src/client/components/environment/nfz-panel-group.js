/* Modules import */
import React, { Component } from 'react';
/* Components import */
import NfzPanel from './nfz-panel.js';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/environment.css';

/* comoponent class */
class NfzPanelGroup extends Component {

  constructor(props, context) {
    super(props, context);
    //binding of methods
    this.handleSelect = this.handleSelect.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // internal state
    this.state = {
      envNFZs : [],
      activeNFZ : ''
    };
  }

  /* Lifecycle method called immediately after component is mount */
  componentDidMount() {
    if (this.props.nfzs) {
      this.setState({envNFZs : this.props.nfzs});
    }
  }

  /* handle which environment nfz panel is active */
  handleSelect(activeKey) {
    this.setState({activeNFZ : activeKey});
  }

  /* handle the creation of a new nfz */
  handleNew() {
    fetch('/api/environment/nfzs', {
      method: 'POST',
      body: JSON.stringify({scenarioID : this.props.scenarioID}),
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
          // update uav sensors with the data received
          this.setState({envNFZs : data});
          alert(`NFZ created`);
        })
      }
    })
    .catch(err => console.log(err));
  }

  handleDelete (nfzs) {
    // envNFZs must be updated
    this.setState({ envNFZs : nfzs });
  }

  /* Render NfzPanelGroup component */
  render() {
    // build the NFZs panels
    const nfzPanels = this.state.envNFZs.map((item, index) => {
      return (
        <NfzPanel
          scenarioID={this.props.scenarioID}
          nfzID={item}
          key={item}
          nfzName={index}
          onDelete={(nfzs) => this.handleDelete(nfzs)}
        />
      );
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>NFZs</Panel.Toggle>
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              pull="right"
              onClick={this.handleNew}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <PanelGroup accordion
              activeKey={this.state.activeNFZ}
              onSelect={this.handleSelect}
            >
              {nfzPanels}
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default NfzPanelGroup;
