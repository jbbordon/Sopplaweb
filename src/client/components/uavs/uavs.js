import React, { Component } from 'react';
import '../style/app.css';
import Scenario from '../components/Scenario.js'

className UavsTab extends Component {

  render () {
    return (
      <div id="uavsTab" className="container"><br>
        <div className="accordion" id="uavList">
          <div className="card mt-0">
            <div className="card-header" id="uav1">
              <a className="card-link" data-toggle="collapse" href="#collapseOne">
                UAV1_example
              </a>
            </div>
            <div id="collapseOne" className="collapse show" data-parent="#accordion">
              <div className="card-body">
                <form id="uav1Form">       
                  <div className="input-group input-group-sm mb-4">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100"">Type</span>
                    </div>
                    <select className="form-control" id="uavtypeList">
                      <option>type1</option>
                      <option>type2</option>
                      <option>type3</option>
                      <option>type4</option>
                    </select>
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Model</span>
                    </div>                        
                    <select className="form-control" id="uavMMList">
                      <option>jsbsim</option>
                      <option>runge_kutta</option>
                    </select>
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Control AT</span>
                    </div>                         
                    <input type="number" min="0" className="form-control" id="controlAT" placeholder="seconds">                        
                  </div>
                  <div className="input-group input-group-sm mb-4">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Sensor</span>
                    </div>
                    <input type="text" className="form-control" id="name" placeholder="name">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100"">Type</span>
                    </div>
                    <select className="form-control" id="sensorTypeList">
                      <option>Optical</option>
                      <option>Radar</option>
                      <option>Flir</option>
                    </select>
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Control AT</span>
                    </div>
                    <input type="number" min="0" className="form-control" id="controlAT" placeholder="seconds">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Capture AT</span>
                    </div>
                    <input type="number" min="0" className="form-control" id="captureAT" placeholder="seconds">
                  </div>
                  <div className="input-group input-group-sm mb-4">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100"">Start Time</span>
                    </div>                      
                    <input type="number" min="0" className="form-control" id="startTimne" placeholder="seconds"> 
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100"">End Time</span>
                    </div>                      
                    <input type="number" min="0" className="form-control" id="endTimne" placeholder="seconds">                                               
                  </div>                      
                  <div className="input-group input-group-sm mb-4">
                    <div className="input-group-prepend w-100">
                      <span className="input-group-text center w-100">Initial State</span>
                    </div>                        
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Latitude</span>
                    </div>
                    <input type="real" min="-90" max="90" className="form-control" id="latitude" placeholder="Decimal Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Longitude</span>
                    </div>
                    <input type="real" min="-180" max="180" className="form-control" id="latitude" placeholder="Decimal Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Elevation</span>
                    </div>
                    <input type="real" min="-0" max="20000" className="form-control" id="elevation" placeholder="Meters">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Heading</span>
                    </div>
                    <input type="real" min="0" max="359" className="form-control" id="heading" placeholder="Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Yaw</span>
                    </div>
                    <input type="real" min="0" max="180" className="form-control" id="yaw" placeholder="Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Speed</span>
                    </div>
                    <input type="real" min="0" max="359" className="form-control" id="speed" placeholder="m/s">                                              
                  </div>
                  <div className="input-group input-group-sm mb-4">
                    <div className="input-group-prepend w-100">
                      <span className="input-group-text center w-100">Final State</span>
                    </div>                        
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Latitude</span>
                    </div>
                    <input type="real" min="-90" max="90" className="form-control" id="latitude" placeholder="Decimal Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Longitude</span>
                    </div>
                    <input type="real" min="-180" max="180" className="form-control" id="latitude" placeholder="Decimal Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Elevation</span>
                    </div>
                    <input type="real" min="-0" max="20000" className="form-control" id="elevation" placeholder="Meters">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Heading</span>
                    </div>
                    <input type="real" min="0" max="359" className="form-control" id="heading" placeholder="Degrees">
                    <div className="input-group-prepend w-50">
                      <span className="input-group-text w-100">Speed</span>
                    </div>
                    <input type="real" min="0" max="359" className="form-control" id="speed" placeholder="m/s">                                              
                  </div>                                                                               
                </form>         
              </div>
            </div>
          </div>                
        </div>             
      </div>      	
    );
  }
}

export default UavsTab;
