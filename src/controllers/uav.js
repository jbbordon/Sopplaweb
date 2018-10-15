//File: controllers/uav.js
const Scenario = require ('../models/scenario');
const UAV = require ('../models/uav');
const Sensor  = require ('../models/sensor');
const config = require ('../models/config');

///////////////////* UAV Menu methods */////////////////////////

/* Return a list of uav types defined in the DB*/
function getUAVTypes (req, res) {
	console.log ('GET /uavs/types');
	res.status(200).jsonp(config.uavTypes);
};

/* Return a list of uav dynamic models defined in the DB*/
function getUAVModels (req, res) {
	console.log ('GET /uavs/models');
	res.status(200).jsonp(config.uavMotionModels);
};

/* Return the list of UAVs of the DB */
function getUAVs (req, res) {
	console.log ('GET /uavs');
	UAV.find(null, 'name _id', function(err, uavs) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the uav list'});
	    } else {
		    if(!uavs) {
		    	res.status(404).send({ message : 'Error there are no uavs stored in the DB'});
		    } else {
				res.status(200).jsonp(uavs);
		    };
		};
	});
};

/* Return an UAV from the DB */
function getUAV (req, res) {
	console.log ('GET /uavs/:uavID');
	UAV.findById(req.params.uavID, function(err, uav) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the uav from the DB'});
	    } else {
		    if (!uav) {
		    	res.status(404).send({ message : 'UAV does not exist in the DB'});
		    } else {
		    	res.status(200).jsonp(uav);
		    };
		};
	});
};

/* Return the list of sensors defined for a given UAV*/
function getUAVSensors (req, res) {
	console.log ('GET /uavs/sensors/:uavID');
	UAV.findOne({"_id": req.params.uavID}).
	populate('sensor', 'name _id').
	exec(function(err, list) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the uav sensor list from the DB'});
	    } else {
	    	if (!list) {
	    		res.status(404).send({ message : 'Error there are no sensors defined for the given UAV'});
	    	} else {
				res.status(200).jsonp(list.sensor);
	    	}
	   	}
	});
};

/* Create a new UAV in the DB */
function addUAV (req, res) {
	console.log ('POST /uavs');
	//read input data from http body request
	let myUAV = new UAV();
	myUAV.name = req.body.name;
	// store the new UAV in the DB
	myUAV.save (function (err, uavStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the uav in the DB'});
		} else {
			res.status(200).send({UAV : uavStored});
		};
	});
};

/* add a new sensor to an existing UAV in the DB */
function addUAVSensor (req, res) {
	console.log ('POST /uavs/sensor');
	// search for the UAV in the DB
	UAV.findById(req.body.uavID, function(err, uav) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the UAV in the DB'});
	    } else {
		    if (!uav) {
		    	res.status(404).send({ message : 'UAV does not exist in the DB'});
		    } else {
		    	// prepare the new sensor to be added
					let mySensor = {
						name : req.body.name,
						type : req.body.type,
						controlAt : req.body.controlAt,
						captureAt : req.body.captureAt,
						initState : {
							elevation : req.body.initElevation,
							heading   : req.body.initHeading,
							azimuth   : req.body.initAzimuth
						}
				};
				// push it into the uav sensors array
				uav.sensor.push (mySensor);
				// save the UAV in the DB
				uav.save (function (err, uavStored) {
					if (err) {
						res.status(500).send({ message : 'Error while adding the sensor to the UAV'});
					} else {
						// return the uav sensors
						res.status(200).jsonp(uavStored.sensor);
					};
				});
		    };
		};
	});
};

/* Update a given UAV from the DB */
function updateUAV (req, res) {
	console.log ('PUT /uav');
	// seach the DB for the UAV and update it
	UAV.findOneAndUpdate (
		{'_id' : req.body._id},
		{ $set : {
			name: req.body.name,
			type: req.body.type,
			motionModel : {
				type : req.body.modelType,
				at   : req.body.modelAt
			},
			initTime : req.body.initTime,
			initState : {
				latitude         : req.body.initLatitude,
				longitude        : req.body.initLongitude,
				elevation        : req.body.initElevation,
				heading          : req.body.initHeading,
				yaw              : req.body.initYaw,
				speed            : req.body.initSpeed
			},
			flightTime : req.body.flightTime,
			finalState : {
				latitude         : req.body.finalLatitude,
				longitude        : req.body.finalLongitude,
				elevation        : req.body.finalElevation,
				heading          : req.body.finalHeading,
				speed            : req.body.finalSpeed
			}
		}},
		{new : true},
		function (err, uavUpdated) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the UAV in the DB'});
			} else {
				if (!uavUpdated) {
					res.status(404).send({ message : 'UAV does not exist in the DB'});
				} else {
					res.status(200).jsonp(uavUpdated);
				};
			};
		}
	);
};

// update a UAV sensor
function updateUAVSensor (req, res) {
	console.log ('PUT /uavs/sensor/');
	UAV.findOneAndUpdate (
		{'_id' : req.body.uavID},
		{ $pull : {
			'sensors': req.body._id}
		},
		{new : true}).
		exec(function (err, uav) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the sensor in the DB'});
			} else {
				if (!uav) {
					res.status(404).send({ message : 'Error while updating the sensor in the DB'});
				} else {
					res.status(200).jsonp(uav.sensors);
				}
			}
		}
	);
};

/* Delete a given uav from the DB */
function deleteUAV (req, res) {
	console.log ('DELETE /uavs/:uavID');
	// delete the uav from the DB
	UAV.remove ({'_id' : req.params.uavID}, function (err, uav) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the uav in the DB'});
		} else {
			if (uav.n == 0) {
				res.status(404).send({ message : 'UAV does not exist in the DB'});
			} else {
				// now remove the uav _id from every scenario with a reference to it
				Scenario.findOneAndUpdate (
					null,
					{ $pull :
						{ uavs : req.params.uavID }
					},
					{new : true},
					function (err, scenario) {
						if (err) {
							res.status(500).send({ message : 'Error while deleting the uav from every Scenario'});
						};
					}
				);
				res.status(200).send ({message : 'UAV successfully deleted in the DB'});
			};
		};
	});
};

// delete a UAV sensor
function deleteUAVSensor (req, res) {
	console.log ('DELETE /uavs/sensor');
	// search for the UAV in the DB and remove the required sensor
	UAV.findOneAndUpdate (
		{'_id' : req.body.uavID},
		{ $pull : {
			'sensors': req.body._id}
		},
		{new : true}).
		exec(function (err, uav) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the sensor in the DB'});
			} else {
				if (!uav) {
					res.status(404).send({ message : 'Error while updating the sensor in the DB'});
				} else {
					res.status(200).jsonp(uav.sensors);
				}
			}
		}
	);
};

/* UAV methods export */
module.exports = {
	getUAVTypes,
	getUAVModels,
	getUAV,
	getUAVSensors,
	getUAVs,
	addUAV,
	addUAVSensor,
	updateUAV,
	updateUAVSensor,
	deleteUAV,
	deleteUAVSensor
};
