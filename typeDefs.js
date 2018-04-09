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
		removeTodo(id: ID!): String		
		updateTodo(id: ID!, task: String!): Todo
		updateUser(id: ID!, username: String, password: String): User
	}

	type Todo @cacheControl(maxAge: 240) {
		id: ID!
		task: String!
		complete: Boolean @cacheControl(maxAge: 30)
		user: User! @cacheControl(maxAge: 3600)
	}

	type User @cacheControl(maxAge: 3600) {
		id: ID!
		username: String!
		todos(completed: Boolean): [Todo] @cacheControl(maxAge: 240)
	}
`;