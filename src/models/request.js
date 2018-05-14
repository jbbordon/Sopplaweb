
const config   = require('./config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const RequestSchema = new Schema ({
	name : { type: String, required : true },
	merit    : {
		constraints : [ Number ],
		paretos     : [ Number ],
		sorting     : [ Number ] 
	},
	algorithms : [ // array from 1 to n
		{
			type : { type: String, enum: config.algorithmTypes}, // algorithm type : acor, gens...
			time : Number, // decision horizon
			rh   : Number, // number of concatenated trajectories
			nr   : Number, // number of runs
			stop : {   // stop criteria
				iterations : Number, // max number of iterations
				time       : Number  // max computational time
			},
			params : [ Number ] // specific parameters of the algorithm type
		}
	],
	control : {
		variables : [Boolean],
		type : [Number],
		limits : [ 
			{
				min: Number,
				max: Number
			}
		]
	}
});

module.exports = mongoose.model('Request', RequestSchema);