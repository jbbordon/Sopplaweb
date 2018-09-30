/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* Styles import */
import '../../style/uav.css';

class UavSelector extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      selectedUAV: 0,
    }
    //binding of methods
    this.renderSelect = this.renderSelect.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // check if selected value should be updated
      if (this.props.selectedValue !== this.state.selectedUAV) {
        // update state
        this.setState({
          selectedUAV : this.props.selectedValue,
        })
      }
    }
  }

  /* Render a "select input" with the list of uavs of the current uav */
  renderSelect() {
    const list = this.props.scenarioUAVs.map((item, index) => {
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
      selectedUAV : value
    });
    this.props.onSelect(value);
  }

  /* Render UavTab component */
  render () {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>UAV</InputGroup.Addon>
          <FormControl
            componentClass="select"
            onChange={this.handleSelectChange}
            id="uav"
            value={this.state.selectedUAV}>
              {this.renderSelect()}
          </FormControl>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default UavSelector;
