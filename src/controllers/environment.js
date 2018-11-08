//File: controllers/environment.js
const NFZ = require ('../models/nfz');
const Scenario = require ('../models/scenario');

/* environment methods */

/* Return a NFZ from the DB */
function getEnvNFZ (req, res) {
	console.log ('GET /environment/nfz/:nfzID');
	NFZ.findById(req.params.nfzID, function(err, nfz) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the NFZ from the DB'});
	    } else {
		    if (!nfz) {
		    	res.status(404).send({ message : 'NFZ does not exist in the DB'});
		    } else {
		    	res.status(200).jsonp(nfz);
		    };
		};
	});
};

/* Update a NFZ from a given environment */
function updateEnvNFZ (req, res) {
	console.log ('PUT /environment/nfz');
	// seach the DB for the nfz and update it
	NFZ.findOneAndUpdate (
		{'_id' : req.body._id},
		{ $set : {
			latitude  : req.body.latitude,
			longitude : req.body.longitude,
			xWidth    : req.body.xWidth,
			yHeight   : req.body.yHeight,
			bearing   : req.body.bearing
		}},
		{new : true},
		function (err, nfzUpdated) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the nfz in the DB'});
			} else {
				if (!nfzUpdated) {
					res.status(404).send({ message : 'NFZ does not exist in the DB'});
				} else {
					res.status(200).jsonp(nfzUpdated);
				};
			};
		}
	);
}

/* Add a NFZ to an existing environment in the DB */
function addEnvNFZ (req, res) {
	console.log ('POST /environment/nfz');
	//read input data from http body request
	let myNFZ = new NFZ();
	// store the new NFZ in the DB
	myNFZ.save (function (err, nfzStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the NFZ in the DB'});
		} else {
			//add the new nfz to the given uav
			Scenario.findOneAndUpdate (
				{'_id' : req.body.scenarioID},
				{ $push : {
					'environment.nfzs': nfzStored }
				},
				{new : true}).
				exec(function (err, scenario) {
					if (err) {
						res.status(500).send({ message : 'Error while adding the NFZ to the scenario'});
					} else {
						if (!scenario) {
							res.status(404).send({ message : 'Scenario does not exist in the DB'});
						} else {
							res.status(200).jsonp(scenario.environment.nfzs);
						}
					}
				}
			);
		};
	});
};

/* Update wind environment from a given scenario */
function updateEnvWind (req, res) {
	console.log ('PUT /environment/wind');
	// seach the DB for the Scenario and update it
	Scenario.findOneAndUpdate (
		{'_id' : req.body._id},
		{ $set : {
			environment : {
				wind : {
					speed : req.body.speed,
					direction : req.body.direction
				}
			}
		}},
		{new : true},
		function (err, scenarioUpdated) {
			if (err) {
				res.status(500).send({ message : 'Error while updating the scenario in the DB'});
			} else {
				if (!scenarioUpdated) {
					res.status(404).send({ message : 'Scenario does not exist in the DB'});
				} else {
					res.status(200).send({ message : 'O'});
				}
			}
		}
	);
};

/* Delete a NFZ from an existing environment */
function deleteEnvNFZ (req, res) {
	console.log ('DELETE /environment/:scenarioID/nfzs/:nfzID');
	// delete the NFZ from the DB
	NFZ.remove ({'_id' : req.params.nfzID}, function (err, nfz) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the NFZ in the DB'});
		} else {
			if (!nfz) {
				res.status(404).send({ message : 'NFZ does not exist in the DB'});
			} else {
				//remove the deleted sensor from the given UAV
				Scenario.findOneAndUpdate (
					{'_id' :req.params.scenarioID},
					{ $pull : {
						'environment.nfzs': req.params.nfzID}
					},
					{new : true}).
					exec(function (err, scenario) {
						if (err) {
							res.status(500).send({ message : 'Error while deleting the NFZ of the scenario'});
						} else {
							if (!scenario) {
								res.status(404).send({ message : 'Scenario does not exist in the DB'});
							} else {
								res.status(200).jsonp(scenario.environment.nfzs);
							}
						}
					}
				);
			}
    	}
	});
};

/* environment methods export */
module.exports = {
	getEnvNFZ,
	addEnvNFZ,
	updateEnvNFZ,
	updateEnvWind,
	deleteEnvNFZ
};
