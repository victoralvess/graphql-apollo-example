const bcrypt = require('bcrypt');

const User = require('./models/User');
const Todo = require('./models/Todo');

const findTodos = uid => Todo.find({ uid });

const findUserById = async id => {
	const user = await User.where({ id }).fetch();

	if (!user) {
		return null;
	}

	return { ...user.toJSON(), todos: await findTodos(id) };
};

module.exports = {
	Query: {
		allTodos: async () => await Todo.find(),
		completedTodos: async () => {
			return await Todo.find({ complete: true });
		},
		activeTodos: async () => {
			return await Todo.find({ complete: false });
		},
		todo: async (_, { id }) => {
			return await Todo.findById(id);
		},
		user: (_, { id }) => {
			return findUserById(id);
		}
	},
	Todo: {
		user: ({ uid: id }) => {
			return findUserById(id);
		}
	},
	User: {
		todos: async (user, { completed = null }) => {
			const todosList = await user.todos;
			if (completed === null) return todosList;
			return todosList.filter(todo => todo.complete === completed);
		}
	},
	Mutation: {
		addUser: async (_, { username, password }) => {
			const hash = await bcrypt.hash(password, 10);
			return (await new User({ username, password: hash }).save()).toJSON();
		},
		addTodo: async (_, todo) => {
			return await new Todo(todo).save();
		},
		removeUser: async (_, { id }) => {
			try {
				(await new User({ id }).destroy()).toJSON();
				return 'User deleted.';
			} catch (error) {
				return 'User not found.';
			}
		},
		removeTodo: async (_, { id }) => {
			return (await Todo.findByIdAndRemove(id))
				? 'Todo removed.'
				: 'Todo not found.';
		},
		updateUser: async (_, { id, username, password }) => {
			if (password) {
				password = await bcrypt.hash(password, 10);
			}
			
			(await new User({ id: id }).save(
				{ username, password },
				{ patch: true }
			));
			
			return findUserById(id);
		}
	}
};