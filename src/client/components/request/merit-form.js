/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { Panel, FormGroup, Checkbox } from 'react-bootstrap';
/* Styles import */
import '../../style/request.css';

class MeritForm extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      constraints : [],
      paretos : [],
      sorting : []
    }
    //binding of methods
    this.resetForm = this.resetForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset scenario-form to default data */
  resetForm () {
    return {
      constraints : [],
      paretos : [],
      sorting : []
    };
  }

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // reset the form fields
      let newState = this.resetForm();
      // check if the scenario area is already defined or not
      if (this.props.merit.constraints) {
        // area is defined for current scenario so set the form fields
        newState = {
          constraints : this.props.merit.constraints,
          paretos : this.props.merit.paretos,
          sorting : this.props.merit.sorting
        }
      }
      this.setState(newState);
    }
  }

  /* Handle input of data into de form fields */
  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* Handle save button */
  handleSave() {
  }

  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            Merit Function
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <FormGroup bsSize="small">
            <label>Constraints</label>
            <Checkbox inline>ET</Checkbox>
            <Checkbox inline>VAR</Checkbox>
            <Checkbox inline>STD</Checkbox>
            <Checkbox inline>ET+STD</Checkbox>
            <Checkbox inline>HEUR</Checkbox>
            <Checkbox inline>Pd</Checkbox>
            <Checkbox inline>Fuel</Checkbox>
            <Checkbox inline>Smooth</Checkbox>
            <Checkbox inline>NFZ</Checkbox>
            <Checkbox inline>Collision</Checkbox>
          </FormGroup>
          <FormGroup bsSize="small">
            <label>Paretos</label>
            <Checkbox inline>ET</Checkbox>
            <Checkbox inline>VAR</Checkbox>
            <Checkbox inline>STD</Checkbox>
            <Checkbox inline>ET+STD</Checkbox>
            <Checkbox inline>HEUR</Checkbox>
            <Checkbox inline>Pd</Checkbox>
            <Checkbox inline>Fuel</Checkbox>
            <Checkbox inline>Smooth</Checkbox>
            <Checkbox inline>NFZ</Checkbox>
            <Checkbox inline>Collision</Checkbox>
          </FormGroup>
          <FormGroup bsSize="small">
            <label>Sortings</label>
            <Checkbox inline>ET</Checkbox>
            <Checkbox inline>VAR</Checkbox>
            <Checkbox inline>STD</Checkbox>
            <Checkbox inline>ET+STD</Checkbox>
            <Checkbox inline>HEUR</Checkbox>
            <Checkbox inline>Pd</Checkbox>
            <Checkbox inline>Fuel</Checkbox>
            <Checkbox inline>Smooth</Checkbox>
            <Checkbox inline>NFZ</Checkbox>
            <Checkbox inline>Collision</Checkbox>
          </FormGroup>
        </Panel.Body>
      </Panel>
    );
  }
}

export default MeritForm;
