/* Modules import */
import React, { Component } from 'react';
/* Styles import */
import '../../style/scenario.css';

class ScenarioHeader extends Component {

  constructor (props) {
    super(props);
    // internal state
    //binding of methods
  }

  render () {
    return (
      <div id="header">
        <h3> SopplaWeb </h3>
        <h4> Scenario : {this.props.scenario} </h4>
      </div>
    );
  }

}

export default ScenarioHeader;
