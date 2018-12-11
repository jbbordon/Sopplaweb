/* Cesium import */
import Cesium from 'cesium/Cesium';
/* Styles import */
import 'cesium/Widgets/widgets.css';

// cesium instance
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZTNiMmNjNy1hN2QzLTQzNWMtOGQxMS1kNjc4NDZlM2U5NDciLCJpZCI6NDkzMiwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MjA1ODI1OX0.hXIxFKv8ZjYlJGvQyoUoOFlGq0rHrOWvOyz6Yl0gDMk';
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

export default viewer;
