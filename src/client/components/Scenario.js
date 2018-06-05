import React, { Component } from 'react';
import Fontawesome from 'react-fontawesome';
import '../style/scenario.css';

class Scenario extends Component {
  constructor () {
    super();
    this.state = {
      title : "default"
    }
  }
  render () {
    return (
      <div className='scenario'>
        <h4>
          Scenario : { this.state.title }
          <span><Fontawesome name='bars'/></span>
        </h4>
        <form className='scenarioForm'>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputLatitude">Latitude</label>
              <input type="real" min="-90" max="90" className="form-control" id="inputLatitude" placeholder="degrees"/>
            </div>
            <div className="form-group col-md-6">
              <label for="inputLongitude">Longitude</label>
              <input type="real" min="-180" max="180" className="form-control" id="inputLongitude" placeholder="degrees"/>
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputWidth">Width</label>
              <input type="number" className="form-control" id="inputWidth" placeholder="meters"/>
            </div>
            <div className="form-group col-md-6">
              <label for="inputHeigth">Height</label>
              <input type="number" className="form-control" id="inputHeigth" placeholder="meters"/>
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputXCells">X cells</label>
              <input type="number" className="form-control" id="inputXCells" placeholder="X Cells"/>
            </div>
            <div className="form-group col-md-6">
              <label for="inputYCells">Y cells</label>
              <input type="number" className="form-control" id="inputYCells" placeholder="Y Cells"/>
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group col-md-6">
              <label for="inputAreaBearing">Area Bearing</label>
              <input type="number" min="0" max="359" className="form-control" id="inputAreaBearing" placeholder="0 to 359"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Scenario;
