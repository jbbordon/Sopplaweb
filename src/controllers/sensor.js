//File: controllers/sensor.js
const UAV = require ('../models/uav');
const Sensor = require ('../models/sensor');
const config = require ('../models/config');

///////////////////* Sensor API methods */////////////////////////

/* Return a list of sensor types defined in the DB*/
function getSensorTypes (req, res) {
	console.log ('GET /sensors/types');
	res.status(200).jsonp(config.sensorTypes);
};

/* Return the list of sensors of the DB */
function getSensors (req, res) {
	console.log ('GET /sensors');
	Sensor.find(null, 'name _id', function(err, sensors) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the sensor list'});
	    } else {
		    if(!sensors) {
		    	res.status(404).send({ message : 'Error there are no sensors stored in the DB'});
		    } else {
				res.status(200).jsonp(sensors);
		    };
		};
	});
};

/* Return a sensor from the DB */
function getSensor (req, res) {
	console.log ('GET /sensors/:sensorID');
	Sensor.findById(req.params.sensorID, function(err, sensor) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the sensor from the DB'});
	    } else {
		    if (!sensor) {
		    	res.status(404).send({ message : 'Sensor does not exist in the DB'});
		    } else {
		    	res.status(200).jsonp(sensor);
		    };
		};
	});
};

/* Create a new Sensor in the DB */
function addSensor (req, res) {
	console.log ('POST /sensors');
	//read input data from http body request
	let mySensor = new Sensor();
	mySensor.name = req.body.name;
	// store the new Sensor in the DB
	mySensor.save (function (err, sensorStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the sensor in the DB'});
		} else {
			//add the new sensor to the given uav
			UAV.findOneAndUpdate (
				{'_id' : req.body.uavID},
				{ $push : {
					'sensor': sensorStored}
				},
				{new : true}).
				populate('sensor', 'name _id').
				exec(function (err, uav) {
					if (err) {
						res.status(500).send({ message : 'Error while adding the sensor to the UAV'});
					} else {
						if (!uav) {
							res.status(404).send({ message : 'UAV does not exist in the DB'});
						} else {
							res.status(200).jsonp(uav.sensor);
						}
					}
				}
			);
		};
	});
};

/* Update a given Sensor from the DB */
function updateSensor (req, res) {
	console.log ('PUT /sensor');
	// seach the DB for the Sensor and update it
	Sensor.findOneAndUpdate (
		{'_id' : req.body._id},
		{ $set : {
      	name : req.body.name,
    		type : req.body.type,
    		controlAt : req.body.controlAt,
    		captureAt : req.body.captureAt,
    		initState : {
    			elevation : req.body.initElevation,
    			azimuth   : req.body.initAzimuth
    		}
		}},
		{new : true},
		function (err, sensorUpdated) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the Sensor in the DB'});
			} else {
				if (!sensorUpdated) {
					res.status(404).send({ message : 'Sensor does not exist in the DB'});
				} else {
					res.status(200).jsonp(sensorUpdated);
				};
			};
		}
	);
};

/* Delete a given sensor from the DB */
function deleteSensor (req, res) {
	console.log ('DELETE /sensors/:sensorID/uavs/:uavID');
	// delete the sensor from the DB
	Sensor.remove ({'_id' : req.params.sensorID}, function (err, sensor) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the sensor in the DB'});
		} else {
			if (!sensor) {
				res.status(404).send({ message : 'Sensor does not exist in the DB'});
			} else {
				//remove the deleted sensor from the given UAV
				UAV.findOneAndUpdate (
					{'_id' :req.params.uavID},
					{ $pull : {
						'sensor': req.params.sensorID}
					},
					{new : true}).
					populate('sensor', 'name _id').
					exec(function (err, uav) {
						if (err) {
							res.status(500).send({ message : 'Error while deleting the sensor of the UAV'});
						} else {
							if (!uav) {
								res.status(404).send({ message : 'UAV does not exist in the DB'});
							} else {
								res.status(200).jsonp(uav.sensor);
							}
						}
					}
				);
			}
    	}
	});
};

/* Sensor methods export */
module.exports = {
	getSensorTypes,
	getSensors,
	getSensor,
	addSensor,
	updateSensor,
	deleteSensor
};
