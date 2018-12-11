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

/* Create a new UAV in the DB
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
}; */

/* Create a new UAV in the DB */
function addUAV (req, res) {
	console.log ('POST /uav');
	//read input data from http body request
	let myUAV = new UAV();
	myUAV.name = req.body.name;
	// store the new UAV in the DB
	myUAV.save (function (err, uavStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the uav in the DB'});
		} else {
			//add the new uav to the given scenario
			Scenario.findOneAndUpdate (
				{'_id' : req.body.scenarioID},
				{ $push : {
					'uavs': uavStored}
				},
				{new : true}).
				populate('uavs', 'name _id').
				exec(function (err, scenario) {
					if (err) {
						res.status(500).send({ message : 'Error while adding the UAV to the scenario'});
					} else {
						if (!scenario) {
							res.status(404).send({ message : 'Scenario does not exist in the DB'});
						} else {
							res.status(200).jsonp(scenario.uavs);
						}
					}
				}
			);
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


/* Delete a given uav from the DB */
function deleteUAV (req, res) {
	console.log ('DELETE /uavs/:uavID');
	// delete the UAV from the DB
	UAV.remove ({'_id' : req.params.uavID}, function (err, uav) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the uav in the DB'});
		} else {
			if (!uav) {
				res.status(404).send({ message : 'UAV does not exist in the DB'});
			} else {
				//remove the deleted uav from the given scenario
				Scenario.findOneAndUpdate (
					{'_id' :req.params.scenarioID},
					{ $pull : {
						'uavs': req.params.uavID}
					},
					{new : true}).
					populate('uavs', 'name _id').
					exec(function (err, scenario) {
						if (err) {
							res.status(500).send({ message : 'Error while removing the UAV from the scenario'});
						} else {
							if (!scenario) {
								res.status(404).send({ message : 'Scenario does not exist in the DB'});
							} else {
								res.status(200).jsonp(scenario.uavs);
							}
						}
					}
				);
			}
    	}
	});
};

/* UAV methods export */
module.exports = {
	getUAVTypes,
	getUAVModels,
	getUAV,
	getUAVSensors,
	getUAVs,
	addUAV,
	updateUAV,
	deleteUAV
};
