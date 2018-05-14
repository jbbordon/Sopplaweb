
const config   = require('./config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AlgorithmSchema = new Schema ({
	type : { type: String, enum:  }, // algorithm type : acor, gens...
	time : Number, // decision horizon
	rh   : Number, // number of concatenated trajectories
	nr   : Number, // number of runs
	stop : {   // stop criteria
		iterations : Number, // max number of iterations
		time       : Number  // max computational time
	},
	param : [ Number ] // specific parameters of the algorithm type
});

module.exports = mongoose.model('Algorithm', AlgorithmSchema);