//File: controllers/request.js
const Request = require ('../models/request');
const config   = require('../models/config');

///////////////////* Request methods */////////////////////////

/* Return a list of algorithm types defined in the DB*/
function getAlgorithmTypes (req, res) {
	console.log ('GET /requests/algorithmtypes');
	res.status(200).jsonp(config.algorithmTypes);
};

/* Return a list of requests stored in the DB*/
function getRequests (req, res) {
	console.log ('GET /requests');
	Request.find(null, 'name _id', function(err, requests) {
		if(err) {
			res.status(500).send({ message : 'Error while retrieving the requests list'});
	    } else { 
	    	if(!requests) { 
	    		res.status(404).send({ message : 'Error there are no requests stored in the DB'});
	    	} else {
				res.status(200).jsonp(requests);
	    	}
	    }	
	});
};

/* Return a list of algorithms used in a given request*/
function getRequestAlgorithms (req, res) {
	console.log ('GET /requests/algorithms/:requestID');
	Request.findOne({"_id": req.params.requestID}, 'algorithms', function(err, algorithms) {
	    if(err) {
	    	res.status(500).send({ message : 'Error while retrieving the request algorithms list from the DB'});
	    } else {
	    	if (!algorithms) {
	    		res.status(404).send({ message : 'Error there are no algorithms defined for the given scenario'});
	    	} else {
				res.status(200).jsonp(algorithms);
	    	}
	    }		    	
	});
};

/* Find a request in the DB */
function getRequest (req, res) {
	console.log ('GET /requests/:requestID');
	Request.findById(req.params.environmentID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the request from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Request does not exist in the DB'});
	    	} else {
	    		res.status(200).jsonp(request);
	    	}
	    }
	});	
};

/* Create a new request in the DB */
function addRequest (req, res) {
	console.log ('POST /requests');
	//read input data from http body request
	let myReq = new Request();
	myReq.name = req.body.name;
	// add the new Target in the DB
	myReq.save(function (err, requestSaved) {
		if (err) {
			res.status(500).send({ message : 'Error while saving the Request in the DB'});
		} else {
			res.status(200).send ({Request : requestSaved});
		}
	});	
};

/* Add a new merit function to a given request */
function addMerit (req, res) {
	console.log ('POST /requests/merit');
	//search the request in the DB
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the request from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Request does not exist in the DB'});
	    	} else {
	    		// read the input data
				let myMerit = {
					constraints : JSON.parse(req.body.constraints),
					paretos     : JSON.parse(req.body.paretos),
					sorting     : JSON.parse(req.body.sorting) 		
				};
	    		request.merit = myMerit;	
	    		// save the data
	    		request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					}
	    		});
	    	}
	    }
	});	
};

/* Add a new set of control variables to a given request */
function addControl (req, res) {
	console.log ('POST /requests/control');
	//search the request in the DB
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the request from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Request does not exist in the DB'});
	    	} else {
	    		// read the input data
				let myControl = {
					variables : JSON.parse(req.body.variables),
					type : JSON.parse(req.body.type),
					limits : JSON.parse(req.body.limits)
				};	
	    		request.control = myControl;	
	    		// save the data
	    		request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					}
	    		});
	    	}
	    }
	});		
};

/* Add a new algorithm to a given request */
function addAlgorithm (req, res) {
	console.log ('POST /requests/algorithm');
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the request from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Request does not exist in the DB'});
	    	} else {
	    		// read the input data
				let myAlgorithm = {
					type : req.body.type,
					time : req.body.time,
					rh   : req.body.rh,
					nr   : req.body.nr,
					stop : {
						iterations : req.body.iterations,
						time       : req.body.time,
					},
					param : JSON.parse(req.body.params)
				};	
	    		request.algorithms.push(myAlgorithm);	
	    		// save the data
	    		request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					}
	    		});
	    	}
	    }
	});		
};


/* Update a given request from the DB */
function updateRequest (req, res) {
	console.log ('PUT /requests');
	// search for the request in the DB
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the request in the DB'});
	    } else {
		    if (!request) {
		    	res.status(404).send({ message : 'Request does not exist in the DB'});
		    } else {
		    	// retrieve & update the new request data
		    	request.name = req.body.name;
				// save the request in the DB
				request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					};
				});
		    };
		};
	});	
};

/* update the merit function of a given request */
function updateMerit (req, res) {
	console.log ('PUT /requests/:requestID/merit');
	// search for the request in the DB
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the request in the DB'});
	    } else {
		    if (!request) {
		    	res.status(404).send({ message : 'Request does not exist in the DB'});
		    } else {
		    	// retrieve & update the new request data
		    	let myMerit = {
					constraints : JSON.parse(req.body.constraints),
					paretos     : JSON.parse(req.body.paretos),
					sorting     : JSON.parse(req.body.sorting) 		
				};
				request.merit = myMerit;
				// save the request in the DB
				request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					};
				});
		    };
		};
	});		
};

/* update the set of control variables of a given request */
function updateControl (req, res) {
	console.log ('PUT /requests/:requestID/control');
	// search for the request in the DB
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while searching the request in the DB'});
	    } else {
		    if (!request) {
		    	res.status(404).send({ message : 'Request does not exist in the DB'});
		    } else {
		    	// retrieve & update the new request data
		    	let myControl = {
					variables : JSON.parse(req.body.variables),
					type : JSON.parse(req.body.type),
					limits : JSON.parse(req.body.limits)
				};
				request.control = myControl;	
				// save the request in the DB
				request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					};
				});
		    };
		};
	});		
};

/* update an algorithm from a given request */
function updateAlgorithm (req, res) {
	console.log ('PUT /requests/algorithm');
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the request from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Request does not exist in the DB'});
	    	} else {
	    		// read the input data
				let myAlgorithm = {
					type : req.body.type,
					time : req.body.time,
					rh   : req.body.rh,
					nr   : req.body.nr,
					stop : {
						iterations : req.body.iterations,
						time       : req.body.time,
					},
					param : JSON.parse(req.body.params)
				};	
	    		request.algorithms[req.body.algorithmPos] = myAlgorithm;
	    		// save the data
	    		request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					}
	    		});
	    	}
	    }
	});		
};

/* Remove a given request from the current Scenario */
function deleteRequest (req, res) {
	console.log ('DELETE /requests/:requestID');
	// delete the target from the DB
	Request.remove ({'_id' : req.params.requestID}, function (err, request) {
		if (err) {
			res.status(500).send({ message : 'Error while deleting the request in the DB'});
		} else {
			if (!request) {
				res.status(404).send({ message : 'Request does not exist in the DB'});
			} else {		
				res.status(200).send ({message : 'Request successfully deleted in the DB'});
			};
		};
	});
};

/* Delete an algorithm from a given request */
function deleteAlgorithm (req, res) {
	console.log ('DELETE /requests/:requestID/algorithm/:algorithmPos');
	Request.findById(req.body.requestID, function(err, request) {
	    if (err) {
	    	res.status(500).send({ message : 'Error while retrieving the request from the DB'});
	    } else {
	    	if (!request) {
	    		res.status(404).send({ message : 'Request does not exist in the DB'});
	    	} else {
				// update the request algorithms	    	
				for (var i = req.body.algorithmPos; i < request.algorithms.length; i++) {
					request.algorithms[i] = request.algorithms[i+1];
				}	
	    		// save the data
	    		request.save (function (err, requestSaved) {
					if (err) {
						res.status(500).send({ message : 'Error while saving the request in the DB'});
					} else {
						res.status(200).send ({Request : requestSaved});
					}
	    		});
	    	}
	    }
	});	
};

/* Request methods export */
module.exports = {
	getAlgorithmTypes,
	getRequests,
	getRequestAlgorithms,
	getRequest,
	addRequest,
	addMerit,
	addControl,
	addAlgorithm,
	updateRequest,
	updateMerit,
	updateAlgorithm,	
	updateControl,	
	deleteRequest,
	deleteAlgorithm
};