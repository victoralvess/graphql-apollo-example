module.exports = `
	type Query {
		allTodos: [Todo]
		completedTodos: [Todo]
		activeTodos: [Todo]
		todo(id: ID!): Todo
		user(id: ID!): User
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
	}
`;