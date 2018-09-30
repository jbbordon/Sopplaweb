/* Modules import */
import React, { Component } from 'react';
/* Bootstrap components import */
import { Panel } from 'react-bootstrap';
/* Components import */
import TargetSelector from './target-selector.js';
/* Styles import */
import '../../style/target.css';

class TargetPanel extends Component {

  constructor (props) {
    super(props);
    // internal state
    this.state = {
      layerTypes : [],
      targetModels : [],
      selectedValue : 0,
      selectedTarget : null,
    }
    //binding of methods
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /* Class method called when component is mounted */
  componentDidMount() {
    /* Call the server to get the target model types available */
    fetch('/api/targets/modeltypes')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the targetModels list with the data received
        this.setState({ targetModels: data })
      })
    })
    .catch(err => console.log(err))
    /* Call the server to get the target belief layers available */
    fetch('/api/targets/layertypes')
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the layerTypes list with the data received
        this.setState({ layerTypes: data })
      })
    })
    .catch(err => console.log(err))
  }

  /* Class method called when props have changed */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps)  {
      // check if scenario has at least 1 target
      if (this.props.scenarioTargets.length !== 0) {
        // select the first target in the list
        this.setState ({
          selectedValue : 0,
          selectedTarget : this.props.scenarioTargets[0],
        })
      } else {
        // reset state
        this.setState ({
          selectedValue : 0,
          selectedTarget : null,
        })
      }
    }
  }

  handleSelect(value) {
    // get selected target from the scenario target list
    const target = this.props.scenarioTargets[value];
    // update internal state with the required target
    this.setState({
      selectedValue : value,
      selectedtarget : target
    });
  }

  handleSave (target) {
    const param = {
      pos : this.state.selectedValue,
      target : target
    }
    Cesiumtargets.painttarget(target, this.props.viewer);
    this.props.ontargetSave(param);
  }

  /* Render TargetPanel component */
  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            Targets
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <TargetSelector
              selectedValue={this.state.selectedValue}
              scenarioTargets={this.props.scenarioTargets}
              onSelect={(value) => this.handleSelect(value)}
            />
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default TargetPanel;
