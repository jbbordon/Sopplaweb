/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/environment.css';

class NfzPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      _id : '',
      latitude : '',
      longitude : '',
      xWidth : '',
      yHeight : '',
      bearing : ''
    }
    //binding of methods
    this.resetState = this.resetState.bind(this);
    this.fetchNFZ = this.fetchNFZ.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /* reset nfz state to default data */
  resetState () {
    return {
      _id : '',
      latitude : '',
      longitude : '',
      xWidth : '',
      yHeight : '',
      bearing : ''
    };
  }

  /* Get a NFZ from the server */
  fetchNFZ (nfzID) {
    fetch('/api/environment/nfzs/' + nfzID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          // reset the form fields
          let newState = this.resetState();
          // check if the nfz is already defined or not
          if (data.latitude) {
            // nfz is defined so set the form fields
            newState = {
              _id : data._id,
              latitude : data.latitude,
              longitude : data.longitude,
              xWidth : data.xWidth,
              yHeight : data.yHeight,
              bearing : data.bearing
            }
          } else {
            // if nfz is not yet defined only set _id
            newState._id = data._id;
          }
          this.setState(newState);
        })
      }
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchNFZ(this.props.nfzID);
  }

  /* Handle input of data into de form fields */
  handleInputChange(event) {
    const {value, id} = event.target;
    this.setState({[id]: value});
  }

  /* save a nfz in the server */
  handleSave() {
    console.log(this.state);
    //send the server the PUT request with the new data
    fetch('/api/environment/nfzs', {
      method: 'PUT',
      body: JSON.stringify(this.state),
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
          alert(`NFZ saved`);
        })
      }
    })
    .catch(err => console.log(err));
  }

  /* handle the press of faTrash */
  handleDelete() {
    // call the server to delete the selected nfz
    fetch('/api/environment/' + this.props.scenarioID  + '/nfzs/' + this.props.nfzID, {
      method: 'DELETE',
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
          // setup state with the data received
          this.props.onDelete(data);
          alert(`NFZ deleted`);
        })
      }
    })
    .catch(err => console.log(err));
  }

  /* Render NfzPanel component */
  render () {
    return (
      <Panel eventKey={this.props.nfzID}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>NFZ {this.props.nfzName + 1}</Panel.Toggle>
            <FontAwesomeIcon
              icon={faSave}
              size="lg"
              pull="right"
              onClick={this.handleSave}
            />
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              pull="right"
              onClick={this.handleDelete}
            />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
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
                  placeholder="Decimal Degrees"
                  required/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>Longitude</InputGroup.Addon>
                <FormControl
                  type="real"
                  onChange={this.handleInputChange}
                  min="-180"
                  max="180"
                  id="longitude"
                  value={this.state.longitude}
                  placeholder="Decimal Degrees"
                  required/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>xWidth</InputGroup.Addon>
                <FormControl
                  type="number"
                  onChange={this.handleInputChange}
                  min="0"
                  id="xWidth"
                  value={this.state.xWidth}
                  placeholder="Meters"
                  required/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>yHeight</InputGroup.Addon>
                <FormControl
                  type="number"
                  onChange={this.handleInputChange}
                  min="0"
                  id="yHeight"
                  value={this.state.yHeight}
                  placeholder="Meters"
                  required/>
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>Bearing</InputGroup.Addon>
                <FormControl
                  type="number"
                  onChange={this.handleInputChange}
                  min="0"
                  max="360"
                  id="bearing"
                  value={this.state.bearing}
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

export default NfzPanel;
