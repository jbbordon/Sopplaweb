import React, { Component } from 'react';
import '../style/app.css';
import Scenario from '../components/Scenario.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h3> SopplaWeb </h3>
        <Scenario/>
      </div>
    );
  }
}

export default App;
