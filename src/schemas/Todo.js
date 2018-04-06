const mongoose = require('../config/mongoose');

module.exports = new mongoose.Schema({
	task: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		required: true
	},
	uid: {
		type: Number,
		required: true
	}
}, {
	collection: 'todos'
});