/* Cesium import */
import Cesium from 'cesium/Cesium';
import viewer from './cesium-main.js';

/* Paint a UAV on Cesium map */
function paintUAV (uav) {
  // make sure previous representations of the uav are deleted from the map
  deletetUAV(uav._id)
  // paint the uav
  viewer.entities.add({
    id : uav._id,
    name : uav.name,
    position : Cesium.Cartesian3.fromDegrees(
      uav.initState.longitude, uav.initState.latitude, uav.initState.elevation),
    point : {
        pixelSize : 5,
        color : Cesium.Color.RED,
        outlineColor : Cesium.Color.WHITE,
        outlineWidth : 2
    },
    label : {
        text : uav.name,
        font : '14pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffset : new Cesium.Cartesian2(0, -9)
    }
  });
}

/* Delete an UAV on Cesium map */
function deletetUAV (uavID) {
    viewer.entities.removeById(uavID);
}

/* Cesium uav methods export */
module.exports = {
	paintUAV,
  deletetUAV
};
