/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel, PanelGroup } from 'react-bootstrap';
/* FontAwesome components import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
/* Styles import */
import '../../style/target.css';

class TargetPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      _id : '',
      name : '',
    }
    //binding of methods
    this.fetchTarget = this.fetchTarget.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* Get a target from the server */
  fetchTarget (targetID) {
    fetch('/api/targets/' + targetID)
    .then(res => {
      if (!res.ok) {
        alert(`${res.statusText}`);
      } else {
        res.json()
        .then(data => {
          this.setState({
            _id : data._id,
            name : data.name
          });
        })
      }
    })
    .catch(err => console.log(err))
  }

  /* Lifecycle method called immediately after mount occurs */
  componentDidMount() {
    this.fetchTarget(this.props.targetID);
  }

  /* Delete a target in the server */
  handleDelete() {
    // call the server to delete the selected target
    fetch('/api/targets/' + this.props.targetID  + '/scenario/' + this.props.scenarioID, {
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
          alert(`${this.state.name} deleted`);
        })
      }
    })
    .catch(err => console.log(err));
  }

  /* Save a target in the server */
  handleSave() {
  }

  /* Render Target Panel component */
  render () {
    return (
      <Panel eventKey={this.props.targetID}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle>{this.props.targetName}</Panel.Toggle>
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
            Target Content
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }

}

export default TargetPanel;
