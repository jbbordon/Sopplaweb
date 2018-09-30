/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* Styles import */
import '../../style/sensor.css';

class SensorSelector extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      selectedSensor: 0,
    }
    //binding of methods
    this.renderSelect = this.renderSelect.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // check if selected value should be updated
      if (this.props.selectedValue !== this.state.selectedSensor) {
        // update state
        this.setState({
          selectedSensor : this.props.selectedValue,
        })
      }
    }
  }

  /* Render a "select input" with the list of sensors of the current uav */
  renderSelect() {
    const list = this.props.uavSensors.map((item, index) => {
      return (
        <option value={index}>{item.name}</option>
      );
    });
    return list;
  }

  handleSelectChange(event) {
    // read selected value
    const value = event.target.value;
    // set state and lift it up
    this.setState({
      selectedSensor : value
    });
    this.props.onSelect(value);
  }

  /* Render SensorTab component */
  render () {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>Sensor</InputGroup.Addon>
          <FormControl
            componentClass="select"
            onChange={this.handleSelectChange}
            id="sensor"
            value={this.state.selectedSensor}>
              {this.renderSelect()}
          </FormControl>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default SensorSelector;
