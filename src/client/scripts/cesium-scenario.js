/* Cesium import */
import Cesium from 'cesium/Cesium';
import viewer from './cesium-main.js';
import CesiumUavs from './cesium-uavs.js';

/* Draw the whole scenario on Cesium map */
function drawScenario (scenario) {
  // remove all possible entities from other scenarios
  viewer.entities.removeAll();
  // check scenario area is defined before painting
  if (scenario.zone.latitude) {
    paintZone (scenario.zone, scenario.name);
  }
  // paint each UAV
  if (scenario.uavs.length !== 0) {
    scenario.uavs.forEach(function (uav) {
      // check uav is defined before painting
      if (uav.type) {
        CesiumUavs.paintUAV(uav);
      }
    })
  }
}

/* Paint the scenario Zone on Cesium map */
function paintZone (zone, scenarioName) {
  const earthR = 6378137;
	const east  = zone.xWidth/(earthR * Math.acos(Math.PI*zone.latitude/180));
	const north = zone.yHeight/earthR;
	// create the Cesium entity
	var searchArea = {
	 	name      : scenarioName,
    id        : scenarioName,
	 	rectangle : {
			coordinates : {
				west : Math.PI * zone.longitude / 180,
				south : Math.PI * zone.latitude / 180,
				east : east + (Math.PI * zone.longitude / 180),
				north : north + (Math.PI * zone.latitude / 180)
			},
	 		material : Cesium.Color.RED.withAlpha(0.5),
        lineCount : new Cesium.Cartesian2(zone.xCells, zone.yCells),
        lineThickness : new Cesium.Cartesian2(2.0, 2.0),
    		outline : true,
    		outlineColor : Cesium.Color.BLACK
	  }
	};
  // make sure previous representations of scenario zone are deleted from the map
  deletetZone(scenarioName);
  // add the entity to cesium viewer
  viewer.entities.add(searchArea);
}

/* Delete scenario Zone from Cesium map */
function deletetZone (scenarioName) {
  viewer.entities.removeById(scenarioName);
}

/* Cesium uav methods export */
module.exports = {
  drawScenario,
	paintZone,
  deletetZone
};
