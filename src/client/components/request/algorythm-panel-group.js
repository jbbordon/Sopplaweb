/* Modules import */
import React, { Component } from 'react';
/* Components import */
import ModalNew from '../modals/modal-new.js'
import AlgorythmPanel from './algorythm-panel.js';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* Styles import */
import '../../style/request.css';

/* comoponent class */
class AlgorythmPanelGroup extends Component {

  constructor(props, context) {
    super(props, context);
    //binding of methods
    this.fetchScenarioAlgorythms = this.fetchScenarioAlgorythms.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFaEdit = this.handleFaEdit.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);    
    // internal state
    this.state = {
      showNew : false,
      scenarioAlgorythms : [],
      activeAlgorythm : ''
    };
  }

  /* Get current scenario request algorythms from the server */
  fetchScenarioAlgorythms(scenarioID) {
    fetch('/api/request/algorythms/' + scenarioID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // update the scenarioAlgorythms with the data received
          this.setState({scenarioAlgorythms : data});
        })
      }
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    if (this.props.algorythms) {
      this.setState({scenarioAlgorythms : this.props.algorythms});
    }
  }

  /* handle which scenario uav panel is active */
  handleSelect(activeKey) {
    this.setState({activeAlgorythm : activeKey});
  }

  /* handle the press of faEdit */
  handleFaEdit() {
    this.setState({ showNew: true });
  }

  /* handle the creation of a new algorythm */
  handleNew(algorythm) {
    algorythm.scenarioID = this.props.scenarioID;
    fetch('/api/uavs', {
      method: 'POST',
      body: JSON.stringify(algorythm),
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
          // update request algorythms with the data received
          this.setState({scenarioAlgorythms : data});
          alert(`${algorythm.name} created`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });    
  }

  handleDelete (algorythms) {
    // scenarioAlgorythms must be updated
    this.setState({ scenarioAlgorythms : algorythms });
  }

  /* Render AlgorythmPanelGroup component */
  render() {
    // build the algorythm panels
    const algorythmPanels = this.state.scenarioAlgorythms.map(item => {
      return (
        <AlgorythmPanel
          scenarioID={this.props.scenarioID}        
          key={item._id}
          algorythmID={item._id}
          algorythmName={item.name}          
          onDelete={(algorythms) => this.handleDelete(algorythms)}
        />
      );
    });

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>Algorythms</Panel.Toggle>
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
              activeKey={this.state.activeAlgorythm}
              onSelect={this.handleSelect}
            >
              {algorythmPanels}
            </PanelGroup>
          </Panel.Body>
        </Panel.Collapse>
        <ModalNew
          title="New Algorythm"
          show={this.state.showNew}
          onNew={(algorythm) => this.handleNew(algorythm)}
          onHide={() => this.setState({ showNew: false })}
        />
      </Panel>
    );
  }
}

export default AlgorythmPanelGroup;
