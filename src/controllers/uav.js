//File: controllers/uav.js
const Scenario = require ('../models/scenario');
const UAV = require ('../models/uav');
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

/* Return a list of uav sensors defined in the DB*/
function getUAVSensors (req, res) {
	console.log ('GET /uavs/sensors');
	res.status(200).jsonp(config.uavSensors);
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

/* Create a new UAV in the DB */
function addUAV (req, res) {
	console.log ('POST /uavs');
	//read input data from http body request
	let myUAV = new UAV();
	myUAV.name = req.body.name;
	myUAV.type = req.body.type;	
	myUAV.motionModel = {
		model : req.body.modelType,
		at   : req.body.modelAt
	};	
	// store the new UAV in the DB
	myUAV.save (function (err, uavStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the uav in the DB'});
		} else {
			res.status(200).send ({UAV : uavStored});
		};
	});
};

/* add a new sensor to an existing UAV in the DB */
function addUAVSensor (req, res) {
	console.log ('POST /uavs/sensor');
	// search for the UAV in the DB
	UAV.findById(req.params.uavID, function(err, uav) {
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
					control_at : req.body.control_at,
					capture_at : req.body.capture_at,
					init_state : {
						elevation : req.body.elevation,
						azimuth   : req.body.azimuth, 
						params    : JSON.parse(req.body.params)
					}
				};
				uav.sensors.push (mySensor);
				// save the UAV in the DB
				uav.save (function (err, uavStored) {
					if (err) {
						res.status(500).send({ message : 'Error while adding the sensor to the UAV'});
					} else {
						res.status(200).send ({UAV : uavStored});
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
		{'_id' : req.body.id}, 
		{ $set : {
			name: req.body.name,
			type: req.body.type,
			model : {
				type : req.body.modelType,
				at   : req.body.modelAt
			},			
			init_time : req.body.init_time,
			init_state : {
				latitude         : req.body.i_latitude,
				longitude        : req.body.i_longitude,
				elevation        : req.body.i_elevation,
				heading          : req.body.i_heading,
				yaw              : req.body.i_yaw,
				speed            : req.body.i_speed
			},
			flight_time : req.body.flight_time,
			final_state : {
				latitude         : req.body.f_latitude,
				longitude        : req.body.f_longitude,
				elevation        : req.body.f_elevation,
				heading          : req.body.f_heading,
				speed            : req.body.f_speed
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
					res.status(200).send ({UAV : uavUpdated});
				};
			};
		}
	);
};

// update a UAV sensor
function updateUAVSensor (req, res) {
	console.log ('PUT /uavs/sensor/');
	// search for the UAV in the DB
	UAV.findById(req.params.uavID, function(err, uav) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the UAV in the DB'});
	    } else {
		    if (!uav) {
		    	res.status(404).send({ message : 'UAV does not exist in the DB'});
		    } else {
		    	// prepare the sensor data updated
				let mySensor = {
					name : req.body.name,
					type : req.body.type,
					control_at : req.body.control_at,
					capture_at : req.body.capture_at,
					init_state : {
						elevation : req.body.elevation,
						azimuth   : req.body.azimuth, 
						params    : req.body.params
					}
				};
				//
				uav.sensors[req.body.sensorPos] = mySensor;
				// save the UAV in the DB
				uav.save (function (err, uavStored) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the uav in the DB'});
					} else {
						res.status(200).send ({UAV : uavStored});
					};
				});
		    };
		};
	});	
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
	console.log ('DELETE /uavs/:uavID/sensor/:sensorPos');
	// search for the UAV in the DB
	UAV.findById(req.params.uavID, function(err, uav) {
	    if (err) { 
	    	res.status(500).send({ message : 'Error while searching the UAV in the DB'});
	    } else {
		    if (!uav) {
		    	res.status(404).send({ message : 'UAV does not exist in the DB'});
		    } else {
		    	// update the sensors array	
				for (var i = req.body.sensorPos; i < uav.sensors.length; i++) {
					uav.sensors[i] = uav.sensors[i+1];
				}
				// save the UAV in the DB
				uav.save (function (err, uavStored) {
					if (err) { 
						res.status(500).send({ message : 'Error while saving the uav in the DB'});
					} else {
						res.status(200).send ({UAV : uavStored});
					};
				});
		    };
		};
	});	
};

/* UAV methods export */
module.exports = {
	getUAVTypes,	
	getUAVModels,
	getUAVSensors,
	getUAV,		
	getUAVs,		
	addUAV,
	addUAVSensor,
	updateUAV,
	updateUAVSensor,
	deleteUAV,
	deleteUAVSensor
};