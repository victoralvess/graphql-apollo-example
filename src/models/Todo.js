const mongoose = require('../config/mongoose');
const TodoSchema = require('../schemas/Todo');

module.exports = mongoose.model('Todo', TodoSchema);