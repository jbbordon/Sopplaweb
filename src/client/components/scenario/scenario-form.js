/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Styles import */
import '../../style/scenario.css';
/* React-Bootstrap components import */
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class ScenarioForm extends Component {

  constructor (props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      latitude : '',
      longitude : '',
      x_width : '',
      y_height: '',
      x_cells: '',
      y_cells: '',
      area_bearing: ''
    }

  }

  componentDidMount() {
    // Subscribe to changes
    //DataSource.addChangeListener(this.handleLoad);
  }

  componentWillUnmount() {
    // Clean up listener
    //DataSource.removeChangeListener(this.handleLoad);
  }

  /* when the user loads an scenario update the form with the values loaded */
  handleLoad () {
    //const zone = DataSource.getZone();
    //this.setState({ zone });
  }

  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  handleSave(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }

  render () {
    return (
      <div className='scenarioForm'>
        <form onSubmit={this.handleSave}>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>Latitude</InputGroup.Addon>
              <FormControl
                type="real"
                onChange={this.handleInputChange}
                min="-90"
                max="90"
                id="latitude"
                value={this.state.latitude}
                placeholder="Decimal Degrees"/>
            </InputGroup>
          </FormGroup>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>Longitude</InputGroup.Addon>
              <FormControl
                type="real"
                onChange={this.handleInputChange}
                min="-180"
                max="180"
                id="longitude"
                value={this.state.longitude}
                placeholder="Decimal Degrees"/>
            </InputGroup>
          </FormGroup>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>Width</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="x_width"
                value={this.state.x_width}
                placeholder="Meters"/>
            </InputGroup>
          </FormGroup>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>Height</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="y_height"
                value={this.state.y_height}
                placeholder="Meters"/>
            </InputGroup>
          </FormGroup>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>X Cells</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="x_cells"
                value={this.state.x_cells}
                placeholder="number"/>
            </InputGroup>
          </FormGroup>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>Y cells</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                id="y_cells"
                value={this.state.y_cells}
                placeholder="number"/>
            </InputGroup>
          </FormGroup>
          <FormGroup bsSize="small">
            <InputGroup>
              <InputGroup.Addon>Bearing</InputGroup.Addon>
              <FormControl
                type="number"
                onChange={this.handleInputChange}
                min="0"
                max="360"
                id="area_bearing"
                value={this.state.area_bearing}
                placeholder="Degrees"/>
            </InputGroup>
          </FormGroup>
          <Button type="submit">Save</Button>
        </form>
      </div>
    );
  }
}

export default ScenarioForm;
