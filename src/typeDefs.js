module.exports = `
	type Query {
		allTodos: [Todo]
		completedTodos: [Todo]
		activeTodos: [Todo]
		todo(id: ID!): Todo
		user(id: ID!): User
	}

	type Mutation {
		addTodo(task: String!, uid: ID!): Todo
		addUser(username: String!, password: String!): User
		removeUser(id: ID!): String
	}

	type Todo {
		id: ID!
		task: String!
		complete: Boolean
		user: User!
	}

	type User {
		id: ID!
		username: String!
		todos(completed: Boolean): [Todo]
	}
`;