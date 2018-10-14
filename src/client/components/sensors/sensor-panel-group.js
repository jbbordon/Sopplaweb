/* Modules import */
import React, { Component } from 'react';
/* Components import */
import ModalNew from '../modals/modal-new.js'
import SensorPanel from './sensor-panel.js';
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
/* Styles import */
import '../../style/sensor.css';

// create sensorTypes context to share it with nested components
const SensorTypesContext = React.createContext();

/* comoponent class */
class SensorPanelGroup extends Component {

  constructor(props, context) {
    super(props, context);
    //binding of methods
    this.fetchSensorTypes = this.fetchSensorTypes.bind(this);
    this.fetchUavSensors = this.fetchUavSensors.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFaEdit = this.handleFaEdit.bind(this);
    this.handleNew = this.handleNew.bind(this);
    // internal state
    this.state = {
      showNew : false,
      sensorTypes : [],
      uavSensors : [],
      activeSensor : ''
    };
  }

  /* Get current sensor types from the server */
  fetchSensorTypes() {
    fetch('/api/sensors/types')
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // update the sensorTypes list with the data received
        this.setState({sensorTypes : data});
      })
    })
    .catch(err => console.log(err))
  }

  /* Get current uav sensors from the server */
  fetchUavSensors(uavID) {
    fetch('/api/uav/sensors/' + uavID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      }
      res.json()
      .then(data => {
        // update the uavSensors with the data received
        this.setState({uavSensors : data});
      })
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchSensorTypes();
  }

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // uavSensors must be updated & activeSensor reset
      this.setState({uavSensors : this.props.uavSensors});
    }
  }

  /* handle the selection of a uav sensor */
  handleSelect(activeKey) {
    this.setState({activeSensor : activeKey});
  }

  /* handle the press of faEdit */
  handleFaEdit() {
    this.setState({ showNew: true });
  }

  /* handle the creation of a new uav sensor */
  handleNew(sensor) {
    sensor.uavID = this.props.uavID;
    fetch('/api/sensors', {
      method: 'POST',
      body: JSON.stringify(sensor),
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
          this.setState({uavSensors : data});
          alert(`${sensor.name} created`);
        })
      }
    })
    .catch(err => console.log(err));
    this.setState({ showNew : false });
  }

  /* Render SensorPanelGroup component */
  render() {
    // build the Sensors panels
    const sensors = this.state.uavSensors.map(item => {
      return (
        <SensorTypesContext.Provider value={this.state.sensorTypes}>
          <SensorPanel
            eventKey={item._id}
            sensorName={item.name}
          />
        </SensorTypesContext.Provider>
      );
    });

    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>
              Sensors
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
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect}
              >
                {sensors}
              </PanelGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      <ModalNew
        title="New Sensor"
        show={this.state.showNew}
        onNew={(sensor) => this.handleNew(sensor)}
        onHide={() => this.setState({ showNew: false })}
      />
      </div>
    );
  }
}

export default SensorPanelGroup;
export {SensorTypesContext};
