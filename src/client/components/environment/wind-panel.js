/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* React-Bootstrap components import */
import { Panel, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/environment.css';

class WindPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      speed : '',
      direction : ''
    }
    //binding of methods
    this.resetForm = this.resetForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* reset wind panel form to default data */
  resetForm () {
    return {
      speed : '',
      direction : ''
    };
  }

  /* Lifecycle method called immediately after updating occurs */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // reset the form fields
      let newState = this.resetForm();
      // check if the wind is already defined or not
      if (this.props.wind.speed) {
        // wind is defined for current scenario so set the form fields
        newState = {
          speed : this.props.wind.speed,
          direction : this.props.wind.direction,
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
    // build the data to save
    var wind = this.state;
    wind._id = this.props.scenarioID;
    //send the server the PUT request with the new data
    fetch('/api/environment/wind', {
      method: 'PUT',
      body: JSON.stringify(wind),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        alert('wind saved');
      }
    })
    .catch(err => console.log(err));
  }

  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>Wind</Panel.Toggle>
            <FontAwesomeIcon
              icon={faSave}
              size="lg"
              pull="right"
              onClick={this.handleSave}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <FormGroup bsSize="small">
              <InputGroup>
                <InputGroup.Addon>Speed</InputGroup.Addon>
                <FormControl
                  type="real"
                  onChange={this.handleInputChange}
                  min="0"
                  id="speed"
                  value={this.state.speed}
                  placeholder="m/s"
                  required/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>Direction</InputGroup.Addon>
                <FormControl
                  type="real"
                  onChange={this.handleInputChange}
                  min="0"
                  max="360"
                  id="direction"
                  value={this.state.direction}
                  placeholder="Degrees"
                  required/>
              </InputGroup>
            </FormGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default WindPanel;
