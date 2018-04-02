module.exports = `
	type Query {
		allTodos: [Todo]
		completedTodos: [Todo]
		activeTodos: [Todo]
		todo(id: ID!): Todo
	}

	type Todo {
		id: ID!
		task: String!
		complete: Boolean
	}
`;