// import React & ReactDOM
import React from 'react';
import { render } from 'react-dom';
// import Cesium
import Cesium from 'cesium/Cesium';
// css imports
import './style/main.css';
import 'cesium/Widgets/widgets.css';
// import App
import App from './components/App';

// cesium instance
var viewer = new Cesium.Viewer('cesiumContainer');

render(
  <App/>,
  document.getElementById('root')
)
