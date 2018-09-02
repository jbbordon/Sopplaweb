/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* Components import */
import UavForm from './uav-form.js';
/* Styles import */
import '../../style/uav.css';

class UavTab extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      uavTypes : [],
      uavModels : [],
      uavSensors : [],
      selectValue : 'none',
      selectedUAV : null
    }
    //binding of methods
    this.renderSelect = this.renderSelect.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* Class method called when component is mounted */
  componentDidMount() {
    /* Call the server to get the uav types available */
    fetch('/api/uavs/types')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavTypes list with the data received
        this.setState({ uavTypes: data })
      })
    })
    .catch(err => console.log(err))
    /* Call the server to get the uav models available */
    fetch('/api/uavs/models')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavModels list with the data received
        this.setState({ uavModels: data })
      })
    })
    .catch(err => console.log(err))
    /* Call the server to get the uav sensors available */
    fetch('/api/uavs/sensors')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the uavSensors list with the data received
        this.setState({ uavSensors: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // check if current scenario has changed
      if (this.props.scenarioID !== prevProps.scenarioID) {
        // check if no UAVs are defined for the current scenario
        if (this.props.scenarioUAVs.length == 0) {
          // reset selectedUAV to default
          this.setState({
            selectValue : 'none',
            selectedUAV : null
          });
        } else {
          // reset selectedUAV to the first one in the list
          this.setState({
            selectValue : 0,
            selectedUAV : this.props.scenarioUAVs[0]
          });
        }
      } else {
        // this.props.scenarioUAVs has changed
        if (this.props.scenarioUAVs.length == 0) {
          // no UAVs defined so reset selectedUAV to default
          this.setState({
            selectValue : 'none',
            selectedUAV : null
          });
        } else {
          //check if it wasn't a save operation
          if (this.props.scenarioUAVs.length !== prevProps.scenarioUAVs.length) {
            // add & delete operations reset selectedUAV to the first one
            this.setState({
              selectValue : 0,
              selectedUAV : this.props.scenarioUAVs[0]
            });
          }
        } // save operations do not need to update selectedUAV
      }
    }
  }

  /* Render a "select input" with the list of uavs of the current scenario */
  renderSelect() {
    const list = this.props.scenarioUAVs.map((item, index) => {
      return (
        <option value={index}>{item.name}</option>
      );
    });
    return list;
  }

  handleSelectChange(event) {
    // read selected value and get it from scenarioUAVs
    const value = event.target.value;
    console.log(value);
    const uav = this.props.scenarioUAVs[value];
    // update internal state with the required UAV
    this.setState({
      selectValue : value,
      selectedUAV : uav
    });
  }

  handleSave (uav) {
    console.log(uav);
  }

  /* Render UavTab component */
  render () {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>UAV</InputGroup.Addon>
            <FormControl
              componentClass="select"
              onChange={this.handleSelectChange}
              id="uav"
              value={this.state.selectValue}>
                {this.renderSelect()}
            </FormControl>
          </InputGroup>
        </FormGroup>
        <UavForm
          uavTypes={this.state.uavTypes}
          uavModels={this.state.uavModels}
          uavSensors={this.state.uavSensors}
          selectedUAV={this.state.selectedUAV}
          onSave={(uav) => this.handleSave(uav)}
        />
      </form>
    );
  }
}

export default UavTab;
