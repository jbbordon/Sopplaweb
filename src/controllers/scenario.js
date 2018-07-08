'use strict'

//File: controllers/scenario.js
const Scenario = require ('../models/scenario');

/* Scenario methods */

/* Find an scenario in the DB */
function getScenario (req, res) {
	console.log ('GET /scenario/:scenarioID');
	Scenario.findById(req.params.scenarioID, function(err, scenario) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the Scenario from the DB'})
	    } else {
	    	if (!scenario) {
	    		res.status(404).send({ message : 'Scenario does not exist in the DB'});
	    	} else {
	    		res.status(200).jsonp(scenario);
	    	}
	    }
	});
};

/* Return a list of scenarios stored in the DB */
function getScenarios (req, res) {
	console.log ('GET /scenario');
	Scenario.find(null, 'name _id', function(err, scenarios) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the Scenario list from the DB'});
	    }else {
	    	if(!scenarios) {
	    		res.status(404).send({ message : 'There are no scenarios in the DB'});
	    	} else {
	    		res.status(200).jsonp(scenarios);
	    	}
	    }
	});
};

/* Return a list of targets defined in a given Scenario*/
function getScenarioTargets (req, res) {
	console.log ('GET /scenario/targets/:scenarioID');
	Scenario.findOne({"_id": req.params.scenarioID}, 'targets', function(err, targets) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the scenario target list from the DB'});
	    } else {
	    	if (!targets) {
	    		res.status(404).send({ message : 'Error there are no targets defined for the given scenario'});
	    	} else {
				res.status(200).jsonp(targets);
	    	}
	    }
	});
};

/* Return the list of UAVs of the Scenario */
function getScenarioUAVs (req, res) {
	console.log ('GET /scenario/uavs/:scenarioID');
	Scenario.findOne({"_id": req.params.scenarioID}, 'uavs', function(err, uavs) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the scenario uav list from the DB'});
	    } else {
	    	if (!uavs) {
	    		res.status(404).send({ message : 'Error there are no uavs defined for the given scenario'});
	    	} else {
				res.status(200).jsonp(uavs);
	    	}
	   	}
	});
};

/* Return the environment of a given Scenario */
function getScenarioEnvironment (req, res) {
	console.log ('GET /scenario/environment/:scenarioID');
	Scenario.findOne({"_id": req.params.scenarioID}, 'environment', function(err, environment) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the scenario uav list from the DB'});
	    } else {
	    	if (!environment) {
	    		res.status(404).send({ message : 'Error there is no environment defined for the given scenario'});
	    	} else {
				res.status(200).jsonp(environment);
	    	}
	   	}
	});
};

/* Return the request of a given Scenario */
function getScenarioRequest (req, res) {
	console.log ('GET /scenario/request/:scenarioID');
	Scenario.findOne({"_id": req.params.scenarioID}, 'request', function(err, request) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the scenario uav list from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Error there is no request defined for the given scenario'});
	    	} else {
				res.status(200).jsonp(request);
	    	}
	   	}
	});
};

/* Create a new scenario in the DB */
function addScenario (req, res) {
	console.log ('POST /scenario');
	//read input data from http body request
	let myScenario = new Scenario();
	myScenario.name              = req.body.name;
	myScenario.zone.latitude     = req.body.latitude;
	myScenario.zone.longitude    = req.body.longitude;
	myScenario.zone.x_width      = req.body.x_width;
	myScenario.zone.y_height     = req.body.y_height;
	myScenario.zone.area_bearing = req.body.area_bearing;
	myScenario.zone.x_cells      = req.body.x_cells;
	myScenario.zone.y_cells      = req.body.y_cells;
	// ad a new Scenario in the DB
	myScenario.save(function (err, scenarioStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the Scenario in the DB'})
		} else {
			res.status(200).send ({Scenario : scenarioStored});
		}
	});
};

/* Add an existing target to a given Scenario in the DB */
function addScenarioTarget (req, res) {
	console.log ('POST /scenario/target');
	//read input data from http body request
	Scenario.findOneAndUpdate (
		{'_id' : req.body.scenarioID},
		{ $push : {
			'targets': req.body.targetID}
		},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while adding the target to the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Add an existing uav to a given Scenario in the DB */
function addScenarioUAV (req, res) {
	console.log ('POST /scenario/uav');
	//read input data from http body request
	Scenario.findOneAndUpdate (
		{'_id' : req.body.scenarioID},
		{ $push : {
			'uavs': req.body.uavID}
		},
		{new : true},
		function (err, scenario) {
			if (err){
				res.status(500).send({ message : 'Error while adding the uav to the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Add an environment to a given Scenario in the DB */
function addScenarioEnvironment (req, res) {
	console.log ('POST /scenario/environment');
	//read input data from http body request
	Scenario.findOneAndUpdate (
		{'_id' : req.body.scenarioID},
		{'environment': req.body.environmentID},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while saving the environment to the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Add a request to a given Scenario in the DB */
function addScenarioRequest (req, res) {
	console.log ('POST /scenario/request');
	//read input data from http body request
	Scenario.findOneAndUpdate (
		{'_id' : req.body.scenarioID},
		{'request': req.body.requestID},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while saving the request to the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Update a given scenario from the DB */
function updateScenario (req, res) {
	console.log ('PUT /scenario');
	// seach the DB for the Scenario and update it
	Scenario.findOneAndUpdate (
		{'_id' : req.body._id},
		{ $set : {
			'name' : req.body.name,
			'zone.latitude': req.body.zone.latitude,
			'zone.longitude': req.body.zone.longitude,
			'zone.x_width': req.body.zone.x_width,
			'zone.y_height': req.body.zone.y_height,
			'zone.area_bearing': req.body.zone.area_bearing,
			'zone.x_cells': req.body.zone.x_cells,
			'zone.y_cells': req.body.zone.y_cells}
		},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send(scenario);
				}
			}
		}
	);
};

/* Delete a given target from the DB */
function deleteScenario (req, res) {
	console.log ('DELETE /scenario/:scenarioID');
	// delete an Scenario from the DB
	Scenario.remove	({'_id' : req.params.scenarioID}, function (err, scenario) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the Scenario in the DB'});
		} else {
			if (scenario.n == 0) {
				res.status(404).send({ message : 'Scenario does not exist in the DB'});
			} else {
				res.status(200).send ({Scenario : scenario});
			}
		}
	});
};

/* Delete a given target from a given Scenario */
function deleteScenarioTarget (req, res) {
	console.log ('DELETE /scenario/:scenarioID/target/:targetID');
	// remove the target from the given Scenario
	Scenario.findOneAndUpdate (
		{ '_id' : req.params.scenarioID},
		{ $pull :
			{ targets : req.params.targetID }
		},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while deleting the target from the scenario'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Delete a given uav from the current Scenario */
function deleteScenarioUAV (req, res) {
	console.log ('DELETE /scenario/:scenarioID/uav/:uavID');
	// remove the uav from the given Scenario
	Scenario.findOneAndUpdate (
		{ '_id' : req.params.scenarioID},
		{ $pull :
			{ uavs: req.params.uavID }
		},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while deleting the uav from the scenario'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Delete a given environment from the current Scenario */
function deleteScenarioEnvironment (req, res) {
	console.log ('DELETE /scenario/:scenarioID/environment');
	//read input data from http body request
	Scenario.findOneAndUpdate (
		{'_id' : req.params.scenarioID},
		{'environment': null},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while deleting the environment from the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

/* Add a request to a given Scenario in the DB */
function deleteScenarioRequest (req, res) {
	console.log ('DELETE /scenario/:scenarioID/request');
	//read input data from http body request
	Scenario.findOneAndUpdate (
		{'_id' : req.params.scenarioID},
		{'request': null},
		{new : true},
		function (err, scenario) {
			if (err) {
				res.status(500).send({ message : 'Error while deleting the request from the Scenario in the DB'});
			} else {
				if (!scenario) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send ({Scenario : scenario});
				}
			}
		}
	);
};

module.exports = {
	getScenario,
	getScenarios,
	getScenarioTargets,
	getScenarioUAVs,
	getScenarioEnvironment,
	getScenarioRequest,
	addScenario,
	addScenarioTarget,
	addScenarioUAV,
	addScenarioEnvironment,
	addScenarioRequest,
	updateScenario,
	deleteScenario,
	deleteScenarioTarget,
	deleteScenarioUAV,
	deleteScenarioEnvironment,
	deleteScenarioRequest
};
