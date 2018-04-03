const User = require('./models/User');
const data = require('./data');

findTodos = uid => data.filter(todo => todo.user.id == uid);

module.exports = {
	Query: {
		allTodos: () => data,
		completedTodos: () => {
			return data.filter(todo => todo.complete);
		},
		activeTodos: () => {
			return data.filter(todo => !todo.complete);
		},
		todo: (_, { id }) => {
			return data.find(todo => todo.id == id);
		},
		user: async (_, { id }) => {
			const user = await User.where({ id }).fetch();

			if (!user) {
				return null;
			}

			return { ...user.toJSON(), todos: findTodos(id) };
		}
	}
};
