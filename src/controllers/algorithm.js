'use strict'

//File: controllers/algorithm.js
const Algorithm  = require ('../models/algorithm');

///////////////////* Algorithm methods */////////////////////////

/* Return a list of algorithm types stored in the DB*/
function getAlgorithmTyoes (req, res) {
	console.log ('GET /algorithm/types');
	Algorithm.find(null, 'name _id', function(err, targets) {
		if(err) res.status(500).send({ message : 'Error while retrieving the targets list'});
	    if(!targets) { 
	    	res.status(404).send({ message : 'Error there are no targets stored in the DB'});
	    } else {
			res.status(200).jsonp(targets);
	    }	
	});
};