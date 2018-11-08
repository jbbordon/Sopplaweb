'use strict'

// api declarations
const express = require('express')
const api     = express.Router();
// models controllers
const ScenarioCtrl = require ('../controllers/scenario');
const TargetCtrl   = require ('../controllers/target');
const UAVCtrl      = require ('../controllers/uav');
const SensorCtrl   = require ('../controllers/sensor');
const EnvCtrl      = require ('../controllers/environment');
//const ReqCtrl      = require ('../controllers/request');

// Scenarios Routing
api.get('/scenario/:scenarioID', ScenarioCtrl.getScenario);
api.get('/scenario/zone/:scenarioID', ScenarioCtrl.getScenarioZone);
api.get('/scenario', ScenarioCtrl.getScenarios);
api.get('/scenario/targets/:scenarioID', ScenarioCtrl.getScenarioTargets);
api.get('/scenario/uavs/:scenarioID', ScenarioCtrl.getScenarioUAVs);
api.get('/scenario/environment/:scenarioID', ScenarioCtrl.getScenarioEnvironment);
api.get('/scenario/request/:scenarioID', ScenarioCtrl.getScenarioRequest);
api.post('/scenario', ScenarioCtrl.addScenario);
api.post('/scenario/target', ScenarioCtrl.addScenarioTarget);
api.post('/scenario/uav', ScenarioCtrl.addScenarioUAV);
api.put('/scenario/', ScenarioCtrl.updateScenario);
api.delete('/scenario/:scenarioID', ScenarioCtrl.deleteScenario);
api.delete('/scenario/:scenarioID/target/:targetID', ScenarioCtrl.deleteScenarioTarget);
api.delete('/scenario/:scenarioID/uav/:uavID', ScenarioCtrl.deleteScenarioUAV);
api.delete('/scenario/:scenarioID/environment', ScenarioCtrl.deleteScenarioEnvironment);
api.delete('/scenario/:scenarioID/request', ScenarioCtrl.deleteScenarioRequest);

// Targets Routing
api.get('/targets/modeltypes', TargetCtrl.getModelTypes);
api.get('/targets/layertypes', TargetCtrl.getLayerTypes);
api.get('/targets/:targetID', TargetCtrl.getTarget);
api.get('/targets', TargetCtrl.getTargets);
api.post('/targets/', TargetCtrl.addTarget);
api.post('/targets/motionmodel/point', TargetCtrl.addTargetMotionModelPoint);
api.post('/targets/motionmodel/', TargetCtrl.addTargetMotionModel);
api.post('/targets/belief/', TargetCtrl.addTargetBelief);
api.put('/targets/motionmodel/point', TargetCtrl.updateTargetMotionModelPoint);
api.put('/targets/motionmodel/', TargetCtrl.updateTargetMotionModel);
api.put('/targets/belief/', TargetCtrl.updateTargetBelief);
api.delete('/targets/:targetID/scenario/:scenarioID', TargetCtrl.deleteTarget);
api.delete('/targets/:targetID/motionmodel/:pointID', TargetCtrl.deleteTargetMotionModelPoint);
api.delete('/targets/:targetID/motionModel', TargetCtrl.deleteTargetMotionModel);
api.delete('/targets/:targetID/belief/:layerID', TargetCtrl.deleteTargetBelief);

// UAVs Routing
api.get('/uavs/types', UAVCtrl.getUAVTypes);
api.get('/uavs/models', UAVCtrl.getUAVModels);
api.get('/uavs', UAVCtrl.getUAVs);
api.get('/uavs/:uavID', UAVCtrl.getUAV);
api.get('/uavs/sensors/:uavID', UAVCtrl.getUAVSensors);
api.post('/uavs', UAVCtrl.addUAV);
api.put('/uavs', UAVCtrl.updateUAV);
api.delete('/uavs/:uavID/scenario/:scenarioID', UAVCtrl.deleteUAV);

// Sensors Routing
api.get('/sensors/types', SensorCtrl.getSensorTypes);
api.get('/sensors', SensorCtrl.getSensors);
api.get('/sensors/:sensorID', SensorCtrl.getSensor);
api.post('/sensors', SensorCtrl.addSensor);
api.put('/sensors', SensorCtrl.updateSensor);
api.delete('/sensors/:sensorID/uavs/:uavID', SensorCtrl.deleteSensor);

// Environment Routing
api.get('/environment/nfzs/:nfzID', EnvCtrl.getEnvNFZ);
api.post('/environment/nfzs', EnvCtrl.addEnvNFZ);
api.put('/environment/nfzs', EnvCtrl.updateEnvNFZ);
api.put('/environment/wind', EnvCtrl.updateEnvWind);
api.delete('/environment/:scenarioID/nfzs/:nfzID', EnvCtrl.deleteEnvNFZ);

// Requests Routing
/*api.get('/requests/algorithmtypes', ReqCtrl.getAlgorithmTypes);
api.get('/requests', ReqCtrl.getRequests);
api.get('/requests/algorithms/:requestID', ReqCtrl.getRequestAlgorithms);
api.get('/requests/:requestID', ReqCtrl.getRequest);
api.post('/requests', ReqCtrl.addRequest);
api.post('/requests/merit', ReqCtrl.addMerit);
api.post('/requests/control', ReqCtrl.addControl);
api.post('/requests/algorithm', ReqCtrl.addAlgorithm);
api.put('/requests', ReqCtrl.addRequest);
api.put('/requests/merit', ReqCtrl.addMerit);
api.put('/requests/control', ReqCtrl.addControl);
api.put('/requests/algorithm', ReqCtrl.addAlgorithm);
api.delete('/requests/:requestID', ReqCtrl.deleteRequest);
api.delete('/requests/:requestID/algorithm/:algorithmPos', ReqCtrl.deleteAlgorithm);*/

// export the api
module.exports = api;
