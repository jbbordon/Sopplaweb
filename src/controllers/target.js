'use strict'

//File: controllers/target.js
const Scenario = require ('../models/scenario');
const Target   = require ('../models/target');
const config   = require('../models/config');

///////////////////* Target Menu methods */////////////////////////

/* Return a list of target dynamic models defined in the DB*/
function getModelTypes (req, res) {
	console.log ('GET /targets/models');
	res.status(200).jsonp(config.tgtMotionModels);
};

/* Return a list of target layer types defined in the DB*/
function getLayerTypes (req, res) {
	console.log ('GET /targets/layers');
	res.status(200).jsonp(config.beliefLayers);
};

/* Return a list of targets stored in the DB*/
function getTargets (req, res) {
	console.log ('GET /targets');
	Target.find(null, 'name _id', function(err, targets) {
		if(err) {
			res.status(500).send({ message : 'Error while retrieving the targets list'});
	    } else {
	    	if(!targets) {
	    		res.status(404).send({ message : 'Error there are no targets stored in the DB'});
	    	} else {
				res.status(200).jsonp(targets);
	    	}
	    }
	});
};

/* Find a target in the DB */
function getTarget (req, res) {
	console.log ('GET /targets/:targetID');
	Target.findById(req.params.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the target from the DB'});
	    } else {
	    	if (!target) {
	    		res.status(404).send({ message : 'Target does not exist in the DB'});
	    	} else {
	    		res.status(200).jsonp(target);
	    	}
	    }
	});
};

/* Create a new target in the DB */
function addTarget (req, res) {
	console.log ('POST /targets/');
	//read input data from http body request
	let myTarget = new Target();
	myTarget.name  = req.body.name;
	// add the new Target to the DB
	myTarget.save(function (err, targetStored) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the Target in the DB'});
		} else {
			res.status(200).send ({Target : targetStored});
		}
	});
};

/* Add a motion model point to a target in the DB */
function addTargetMotionModelPoint (req, res) {
	console.log ('POST /targets/motionmodel/point');
	// search for the Target in the DB
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the target in the DB'});
	    } else {
		    if (!target) {
		    	res.status(404).send({ message : 'Target does not exist in the DB'});
		    } else {
		    	// retrieve the new point data
				let myPoint = {
					point  : JSON.parse(req.body.point),
					x : req.body.x,
					y : req.body.y
				};
				// update target motion model array
				target.motionModel.points.push(myPoint);
				// save the target in the DB
				target.save (function (err, targetStored) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the target in the DB'});
					} else {
						res.status(200).send ({Target : targetStored});
					};
				});
		    };
		};
	});
};

/* Add a motion model to a target in the DB */
function addTargetMotionModel (req, res) {
	console.log ('POST /targets/motionmodel');
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the target from the DB'});
	    } else {
	    	if (!target) {
	    		res.status(404).send({ message : 'Target does not exist in the DB'});
	    	} else {
	    		// read the input data
	    		target.motionModel.method = req.body.method;
	    		// save the data
	    		target.save (function (err, targetSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the Target in the DB'});
					} else {
						res.status(200).send ({Target : targetSaved});
					}
	    		});
	    	}
	    }
	});
};

/* Add a belief layer to a given target */
function addTargetBelief (req, res) {
	console.log ('POST /targets/belief');
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the target from the DB'});
	    } else {
	    	if (!target) {
	    		res.status(404).send({ message : 'Target does not exist in the DB'});
	    	} else {
	    		target.belief.push (
	    			{
	    				layer  : req.body.layer,
	    				belief : JSON.parse(req.body.belief),
	    				weight : req.body.weight
	    			}
	    		);
	    		target.save (function (err, targetSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the Target in the DB'});
					} else {
						res.status(200).send ({Target : targetSaved});
					}
	    		});
	    	}
	    }
	});
};

/* Update a given target from the DB */
function updateTarget (req, res) {
	console.log ('PUT /targets');
	// search for the Target in the DB
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) res.status(500).send({ message : 'Error while searching the target in the DB'});
	    if (!target) {
	    	res.status(404).send({ message : 'Target does not exist in the DB'});
	    } else {
			target.name = req.body.name;
			// save the target in the DB
			target.save (function (err, targetStored) {
				if (err) res.status(500).send({ message : 'Error while saving the target in the DB'});
				res.status(200).send ({Target : targetStored});
			});
	    }
	});
};

/* Update a target motion model point of a given Target */
function updateTargetMotionModelPoint (req, res) {
	console.log ('PUT /targets/motionmodel/point');
	// search for the Target in the DB
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the target in the DB'});
	    } else {
		    if (!target) {
		    	res.status(404).send({ message : 'Target does not exist in the DB'});
		    } else {
		    	// retrieve the new point data
				let myPoint = {
					point  : JSON.parse(req.body.point),
					x : req.body.x,
					y : req.body.y
				};
				// update target motion model array
				target.motionModel.points[req.body.pointPos] = myPoint;
				// save the target in the DB
				target.save (function (err, targetStored) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the target in the DB'});
					} else {
						res.status(200).send ({Target : targetStored});
					};
				});
		    };
		};
	});
};

/* Add a motion point to a target in the DB */
function updateTargetMotionModel (req, res) {
	console.log ('PUT /targets/motionmodel');
	// search for the Target in the DB
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the target in the DB'});
	    } else {
		    if (!target) {
		    	res.status(404).send({ message : 'Target does not exist in the DB'});
		    } else {
		    	// read the input data
		    	target.motionModel.method = req.body.method;
		    	// save the data
				target.save (function (err, targetStored) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the target in the DB'});
					} else {
						res.status(200).send ({Target : targetStored});
					};
				});
		    };
		};
	});
};

/* Update a target belief layer of a given Target */
function updateTargetBelief (req, res) {
	console.log ('PUT /targets/belief');
	// search for the Target in the DB
	Target.findById(req.body.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the target in the DB'});
	    } else {
		    if (!target) {
		    	res.status(404).send({ message : 'Target does not exist in the DB'});
		    } else {
		    	// retrieve the new belief data
				let myBelief = {
					layer  : req.body.layer,
					belief : JSON.parse(req.body.belief),
					weight : req.body.weight
				};
				// update target belief layer
				target.belief[req.body.layerPos] = myBelief;
				// save the target in the DB
				target.save (function (err, targetStored) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the target in the DB'});
					} else {
						res.status(200).send ({Target : targetStored});
					};
				});
		    };
		};
	});
};

/* Delete a given target from the DB */
function deleteTarget (req, res) {
	console.log ('DELETE /targets/:targetID');
	// delete the target from the DB
	Target.remove ({'_id' : req.params.targetID}, function (err, target) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the target in the DB'});
		} else {
			if (target.n == 0) {
				res.status(404).send({ message : 'Target does not exist in the DB'});
			} else {
				// now remove the target _id from every scenario with a reference to it
				Scenario.findOneAndUpdate (
					null,
					{ $pull :
						{ targets : req.params.targetID }
					},
					{new : true},
					function (err, scenario) {
						if (err) {
							res.status(500).send({ message : 'Error while deleting the target from every Scenario'});
						};
					}
				);
				res.status(200).send ({message : 'Target successfully deleted in the DB'});
			};
		};
	});
};

/* Delete a motion model point from a given target */
function deleteTargetMotionModelPoint (req, res) {
	console.log ('DELETE /target/:targetID/motionModel/:pointID');
	Target.findOneAndUpdate (
		{ '_id' : req.params.targetID},
		{ $pull :
			{ 'motionModel.points' :
				{ '_id' : req.params.pointID }
			}
		},
		{new : true},
		function (err, target) {
			if (err) {
				res.status(500).send({ message : 'Error while deleting the point from the target motion model'});
			} else {
				if (!target) {
					res.status(404).send({ message : 'Target/point does not exist in the DB'});
				} else {
					res.status(200).send ({Target : target});
				}
			}
		}
	);
};

/* Delete the motion model from a given target */
function deleteTargetMotionModel (req, res) {
	console.log ('DELETE /target/:targetID/motionModel');
	// search for the Target in the DB
	Target.findById(req.params.targetID, function(err, target) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the target in the DB'});
	    } else {
		    if (!target) {
		    	res.status(404).send({ message : 'Target does not exist in the DB'});
		    } else {
		    	target.motionModel = {};
				// save the target in the DB
				target.save (function (err, targetStored) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the target in the DB'});
					} else {
						res.status(200).send ({Target : targetStored});
					};
				});
		    };
		};
	});
};

/* Delete a belief layer from a given target */
function deleteTargetBelief (req, res) {
	console.log ('DELETE /target/:targetID/belief/:layerID');
	// search for the Target in the DB
	Target.findOneAndUpdate (
		{ '_id' : req.params.targetID},
		{ $pull :
			{ 'belief' :
				{ '_id' : req.params.layerID }
			}
		},
		{new : true},
		function (err, target) {
			if (err) {
				res.status(500).send({ message : 'Error while deleting the belief layer from the target'});
			} else {
				if (!target) {
					res.status(404).send({ message : 'Target/belief does not exist in the DB'});
				} else {
					res.status(200).send ({Target : target});
				}
			}
		}
	);
};

/* Target methods export */
module.exports = {
	getModelTypes,
	getLayerTypes,
	getTarget,
	getTargets,
	addTarget,
	addTargetMotionModelPoint,
	addTargetMotionModel,
	addTargetBelief,
	updateTargetMotionModelPoint,
	updateTargetMotionModel,
	updateTargetBelief,
	deleteTarget,
	deleteTargetMotionModelPoint,
	deleteTargetMotionModel,
	deleteTargetBelief
};
