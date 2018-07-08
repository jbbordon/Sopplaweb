/* Modules import */
import React, { Component } from 'react';
/* Components import */
import UavDef from './uav-def.js'
/* Bootstrap components import */
import { PanelGroup, Panel } from 'react-bootstrap';

class UavsList extends Component {

  constructor(props) {
    super(props);
    //binding of methods
    this.handleSelect = this.handleSelect.bind(this);
    this.renderUAV = this.renderUAV.bind(this);    
    // internal state
    this.state = {
      activeKey: ''
    };
  }

  /* handle active UAV */
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  /* builds the UAV panel content body */
  renderUAV(uav) {
    return (
    	<Uav/>
   	)
  }  

  render () {

    const uavList = this.props.list.map(uav => {
      return (
        <Panel eventKey={uav._id}>
          <Panel.Heading>
            <Panel.Title toggle>{uav.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>{this.renderUAV(uav)}</Panel.Body>
        </Panel>      	
      );
    });  	

    return (
      <PanelGroup
        accordion
        id="uavList"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
      	{uavList}
      </PanelGroup>
    );
  }
}

export default UavsList;