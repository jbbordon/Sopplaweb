
const config   = require('./config');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// target Schema definition
const TargetSchema = new Schema ({
	name   : { type: String, index: { unique: true, dropDups: true } },
	belief : [  // de 1 a n capas de probabilidad
		{
			layer  : { type: String, enum: config.beliefLayers }, // layer name
			belief : [ { type: Number, min: 0, max: 1} ], // xCells * yCells matriz
			weight : { type: Number, min: 0, max: 1 }     // layer weight
		}
	],
	motionModel : {
		points : [ // from 1 to n dots defined
			{
				point : [ { type: Number, min: 0, max: 1} ], // 9 values N, NE, E, SE, S, SW, W, NW, C 
				x     : Number,
				y     : Number
			} 																						
		],
		method : { type: String, enum: config.tgtMotionModels } // motion model type ej: interpolation...
	}
});

module.exports = mongoose.model('Target', TargetSchema);		