/* Modules import */
import React, { Component } from 'react';
import { render } from 'react-dom';
/* Styles import */
import '../style/app.css';
/* Components import */
import ScenarioMenu from './scenario/scenario-menu.js'
import ScenarioForm from './scenario/scenario-form.js'
import ScenarioTabs from './scenario/scenario-tabs.js'

class App extends Component {

  /* Class contructor method */
  constructor (props) {
    super(props);
    // internal state
    this.state = {
      scenario : {
        _id : "",
        name : "Default",
        zone   : {
          latitude : 0.0,
          longitude : 0.0,
          x_width : 0,
          y_height: 0,
          area_bearing: 0,
          x_cells: 0,
          y_cells: 0,
        }
      }
    }
    //binding of methods
    this.addScenario = this.addScenario.bind(this);
    this.loadScenario = this.loadScenario.bind(this);
    this.deleteScenario = this.deleteScenario.bind(this);
    this.saveScenario = this.saveScenario.bind(this);
    this.saveZone = this.saveZone.bind(this);
  }

  componentDidMount() {
    this.setState({
      scenario : {
        name : "Default"}
    });
  }

/* Create a new Scenario */
  addScenario (input) {
    fetch('/api/scenario', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        //update the scenario data
        this.setState({ scenario : data.Scenario});
      })
    })
    .catch(err => console.log(err));
  }

  /* Load an existing Scenario */
  loadScenario (input) {
    // get the scenario list fron the server
    fetch('/api/scenario/' + input.id)
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        console.log(data);
        //update the scenario data
        this.setState({ scenario: data});
        console.log(this.state.scenario);
      })
    })
    .catch(err => console.log(err));
  }

  /* Delete an existing Scenario */
  deleteScenario (input) {
    console.log(input);
    fetch('/api/scenario/' + input.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
    })
    .catch(err => console.log(err));
  }

  /* Save current Scenario */
  saveScenario () {
    fetch('/api/scenario', {
      method: 'PUT',
      body: JSON.stringify(this.state.scenario),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()})
    .then(data => {
      this.setState({ scenario : data });
    })
    .catch(err => console.error(err));
  }

  /* Handle the inputs from ScenarioForm for setting up the scenario zone*/
  saveZone (inputZone) {
    // build the data to save
    const scenario = this.state.scenario;
    scenario.zone = inputZone;
    //send the server the PUT request with the new data
    fetch('/api/scenario', {
      method: 'PUT',
      body: JSON.stringify(scenario),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw error (res.statusText);
      }
      res.json()
      .then(data => {
        // if data is updated ok then setState to force render of components
        this.setState(data);
      })
    })
    .catch(err => console.error(err));
  }

  /* Component render method */
  render () {
    return (
      <div className='app'>
        <h3> SopplaWeb </h3>
        <div id='scenario'>
          <ScenarioMenu
            name={this.state.scenario.name}
            onNew={(input) => this.addScenario(input)}
            onLoad={(input) => this.loadScenario(input)}
            onDelete={(input) => this.deleteScenario(input)}
            onSave={() => this.saveScenario()}
          />
          <ScenarioForm
            onSave={(inputZone) => this.saveZone(inputZone)}
          />
          <ScenarioTabs
          />
        </div>
      </div>
    );
  }
}

export default App;
