/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* Styles import */
import '../../style/target.css';

class TargetSelector extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      selectedTarget: 0,
    }
    //binding of methods
    this.renderSelect = this.renderSelect.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // check if selected value should be updated
      if (this.props.selectedValue !== this.state.selectedTarget) {
        // update state
        this.setState({
          selectedTarget : this.props.selectedValue,
        })
      }
    }
  }

  /* Render a "select input" with the list of targets of the current target */
  renderSelect() {
    const list = this.props.scenarioTargets.map((item, index) => {
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
      selectedTarget : value
    });
    this.props.onSelect(value);
  }

  /* Render TargetSelector component */
  render () {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>Target</InputGroup.Addon>
          <FormControl
            componentClass="select"
            onChange={this.handleSelectChange}
            id="target"
            value={this.state.selectedTarget}>
              {this.renderSelect()}
          </FormControl>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default TargetSelector;
