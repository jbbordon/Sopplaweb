//File: controllers/environment.js
const Environment = require ('../models/environment')

/* environment methods */

/* Return a list of environments stored in the DB*/
function getEnvs (req, res) {
	console.log ('GET /environment');
	Environment.find(null, 'name _id', function(err, envs) {
		if(err) {
			res.status(500).send({ message : 'Error while retrieving the environments list'});
		 } else {
		    if(!envs) {
		    	res.status(404).send({ message : 'Error there are no environments stored in the DB'});
		    } else {
				res.status(200).jsonp(envs);
		    }
		 }
	});
};

/* Find a environment in the DB */
function getEnv (req, res) {
	console.log ('GET /environment/:environmentID');
	Environment.findById(req.params.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the environment from the DB'});
	    } else {
	    	if (!environment) {
	    		res.status(404).send({ message : 'Environment does not exist in the DB'});
	    	} else {
	    		res.status(200).jsonp(environment);
	    	}
	    }
	});
};

/* Create a new environment in the DB */
function addEnv (req, res) {
	console.log ('POST /environment');
	//read input data from http body request
	let myEnv = new Environment();
	myEnv.name = req.body.name;
	// add the new Target in the DB
	myEnv.save(function (err, envStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the Environment in the DB'});
		} else {
			res.status(200).send ({Environment : envStored});
		}
	});
};

/* Add a NFZ to an existing environment in the DB */
function addNFZ (req, res) {
	console.log ('POST /environment/nfz');
	//search the ENV in the DB
	Environment.findById(req.body.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the environment from the DB'});
	    } else {
	    	if (!environment) {
	    		res.status(404).send({ message : 'Environment does not exist in the DB'});
	    	} else {
	    		// read the input data
	    		let myNFZ = {
					latitude     : req.body.latitude,
					longitude    : req.body.longitude,
					xWidth      : req.body.xWidth,
					yHeight     : req.body.yHeight,
					areaBearing : req.body.areaBearing,
	    		}
	    		environment.nfzs.push (myNFZ);
	    		// save the data
	    		environment.save (function (err, environmentSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the environment in the DB'});
					} else {
						res.status(200).send ({Environment : environmentSaved});
					}
	    		});
	    	}
	    }
	});
};

/* Add wind to an existing environment in the DB */
function addWind (req, res) {
	console.log ('POST /environment/wind');
	//search the ENV in the DB
	Environment.findById(req.body.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the environment from the DB'});
	    } else {
	    	if (!environment) {
	    		res.status(404).send({ message : 'Environment does not exist in the DB'});
	    	} else {
	    		// read the input data
	    		let myWind = {
					speed     : req.body.speed,
					direction : req.body.direction
	    		}
	    		environment.wind = myWind;
	    		// save the data
	    		environment.save (function (err, environmentSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the environment in the DB'});
					} else {
						res.status(200).send ({Environment : environmentSaved});
					};
	    		});
	    	};
	    };
	});
};

/* Update a NFZ from a given environment */
function updateNFZ (req, res) {
	console.log ('PUT /environment/nfz');
	// search for the ENV in the DB
	Environment.findById(req.body.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the environment in the DB'});
	    } else {
		    if (!environment) {
		    	res.status(404).send({ message : 'Environment does not exist in the DB'});
		    } else {
		    	// retrieve the new nfz data
		    	let myNFZ = {
					latitude     : req.body.latitude,
					longitude    : req.body.longitude,
					xWidth      : req.body.xWidth,
					yHeight     : req.body.yHeight,
					areaBearing : req.body.areaBearing,
		    	};
				// update environment nfzs array
				environment.nfzs[req.body.nfzPos] = myNFZ;
				// save the environment in the DB
				environment.save (function (err, environmentSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the environment in the DB'});
					} else {
						res.status(200).send ({Environment : environmentSaved});
					};
				});
		    };
		};
	});
};

/* Update the wind from a given environment */
function updateWind (req, res) {
	console.log ('PUT /environment/wind');
	// search for the ENV in the DB
	Environment.findById(req.body.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the environment in the DB'});
	    } else {
		    if (!environment) {
		    	res.status(404).send({ message : 'Environment does not exist in the DB'});
		    } else {
		    	// retrieve the new wind data
	    		let myWind = {
					speed     : req.body.speed,
					direction : req.body.direction
	    		}
	    		environment.wind = myWind;
				// save the environment in the DB
				environment.save (function (err, environmentSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the environment in the DB'});
					} else {
						res.status(200).send ({Environment : environmentSaved});
					};
				});
		    };
		};
	});
};

/* Delete a given environment from the DB */
function deleteEnv (req, res) {
	console.log ('DELETE /environment/:environmentID');
	// delete the target from the DB
	Environment.remove ({'_id' : req.params.environmentID}, function (err, environment) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the environment in the DB'});
		} else {
			if (!environment) {
				res.status(404).send({ message : 'Environment does not exist in the DB'});
			} else {
				res.status(200).send ({message : 'Environment successfully deleted in the DB'});
			};
		};
	});
};

/* Delete a NFZ from an existing environment */
function deleteNFZ (req, res) {
	console.log ('DELETE /environment/:environmentID/nfz/:nfzPos');
	// search for the environment in the DB
	Environment.findById(req.params.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the environment in the DB'});
	    } else {
		    if (!environment) {
		    	res.status(404).send({ message : 'Environment does not exist in the DB'});
		    } else {
				// update environment nfzs array
				for (var i = req.body.nfzPos; i < environment.nfzs.length; i++) {
					environment.nfzs[i] = environment.nfzs[i+1];
				}
				// save the environment in the DB
				environment.save (function (err, environmentSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the environment in the DB'});
					} else {
						res.status(200).send ({Environment : environmentSaved});
					};
				});
		    };
		};
	});
};

/* Delete the wind from an existing environment */
function deleteWind (req, res) {
	console.log ('DELETE /environment/:environmentID/wind');
	// search for the environment in the DB
	Environment.findById(req.params.environmentID, function(err, environment) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the environment in the DB'});
	    } else {
		    if (!environment) {
		    	res.status(404).send({ message : 'Environment does not exist in the DB'});
		    } else {
				// delete environment wind
				environment.wind = null;
				// save the environment in the DB
				environment.save (function (err, environmentSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the environment in the DB'});
					} else {
						res.status(200).send ({Environment : environmentSaved});
					};
				});
		    };
		};
	});
};

/* environment methods export */
module.exports = {
	getEnvs,
	getEnv,
	addEnv,
	addNFZ,
	addWind,
	updateNFZ,
	updateWind,
	deleteEnv,
	deleteNFZ,
	deleteWind
};
