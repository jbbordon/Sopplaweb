/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class TargetTab extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      selectedTarget : 'none'
    }
    //binding of methods
    this.renderSelect = this.renderSelect.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.scenarioID !== prevProps.scenarioID) {
      /* current scenario or targets have changed, therefore the list of scenario
      targets must be updtaed */
      this.setState({selectedTarget : 'none'});
    }
  }

  /* Render a "select input" with the list of uavs of the current scenario */
  renderSelect(options) {
    const list = options.map((item, index) => {
      return (
        <option value={index}>{item.name}</option>
      );
    });
    return list;
  }

  handleSelectChange(event) {
    const value = event.target.value;
    this.setState({ selectedTarget : value });
  }

  handleSave (target) {
    console.log(target);
  }

  render () {

    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>Target</InputGroup.Addon>
            <FormControl
              componentClass="select"
              onChange={this.handleSelectChange}
              id="target">
                <option value="none">Select</option>
                {this.renderSelect(this.props.scenarioTargets)}
            </FormControl>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default TargetTab;
