const bcrypt = require('bcrypt');

const User = require('./models/User');
const Todo = require('./models/Todo');

// const data = require('./data');  // MOCK

// const findTodos = uid => data.filter(todo => todo.user.id == uid);  // MOCK

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
			// return data.filter(todo => todo.complete); // MOCK
			return await Todo.find({ complete: true });
		},
		activeTodos: async () => {
			// return data.filter(todo => !todo.complete); // MOCK
			return await Todo.find({ complete: false });
		},
		todo: async (_, { id }) => {
			// return data.find(todo => todo.id == id); // MOCK
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
		// USE THIS IF YOU ARE USING THE MOCK DATA
		/*
		user: ({ user: { id } }) => {
			return findUserById(id);
		}
		*/
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
		}
	}
};
