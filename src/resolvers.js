const data = require('./data');

module.exports = {
	Query: {
		allTodos: () => data,
		completedTodos: () => {
			return data.filter((todo) => todo.complete);
		},
		activeTodos: () => {
			return data.filter((todo) => !todo.complete);
		},
		todo: (_, { id }) => {
			return data.find((todo) => todo.id == id);
		}
	}
};
