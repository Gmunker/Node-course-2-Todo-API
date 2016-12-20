const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		let text = "Testing Text";

		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect((res) => {
				expect(res.body.text)
					.toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({ text })
					.then((todos) => {
						expect(todos.length)
							.toBe(1);
						expect(todos[0].text)
							.toBe(text);
						done();
					})
					.catch((e) => done(e));
			})
	}); // it should create todo

	it('should not create todo with invaild body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find()
					.then((todos) => {
						expect(todos.length)
							.toBe(2);
						done();
					})
					.catch((e) => done(e))
			})
	}); //it should not create todo

}); //Describe POST

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length)
					.toBe(2);
			})
			.end(done);
	}); // it should get all todos

	describe('GET /todos/:id', () => {
		it('should return todo doc', (done) => {
				request(app)
					.get(`/todos/${todos[0]._id.toHexString()}`)
					.expect(200)
					.expect((res) => {
						expect(res.body.todo.text)
							.toBe(todos[0].text)
					})
					.end(done);
			}) // it should return todo doc

		it('should return a 404 if todo not found', (done) => {
			let hexId = new ObjectID()
				.toHexString();

			request(app)
				.get(`/todos/${hexId}`)
				.expect(404)
				.end(done);
		}); // it should return a 404 if todo not found

		it('should return 404 for non-object id', (done) => {

			request(app)
				.get(`/todos/123`)
				.expect(404)
				.end(done);
		}); // it should return 404 for non-object
	}); // Describe GET /todos/:id

}); // Describe GET

describe('DELETE /todos/:id', () => {

	it('should remove a todo', (done) => {
		let hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id)
					.toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.findById(hexId)
					.then((todo) => {
						expect(todo)
							.toNotExist();
						done();
					})
					.catch((e) => done(e))

			})
	}); // it should remove a todo

	it('should return 404 if todo not found', (done) => {
		let hexId = new ObjectID()
			.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	}); // it should return a 404 if todo not found


	it('should return 404 if ObjectID is Invalid', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done)
	}); // it should return 404 if ObjectID is Invalid
});

describe('PATCH /todos/:id', (done) => {
	it('should update todo', (done) => {
		let id = todos[0]._id;
		let updatedTodo = { text: 'Some new text', completed: true };

		request(app)
			.patch(`/todos/${id}`)
			.send(updatedTodo)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.completed)
					.toBe(true);
				expect(res.body.todo.text)
					.toBe(updatedTodo.text)
				expect(res.body.todo.completedAt)
					.toBeA('number');
			})
			.end(done);
	});

	it('should clear completedAt when todo is not completed', (done) => {
		let id = todos[1]._id;
		let updatedTodo = { text: 'Some new text', completed: false };

		request(app)
			.patch(`/todos/${id}`)
			.send(updatedTodo)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text)
					.toBe(updatedTodo.text);
				expect(res.body.todo.completed)
					.toBe(false);
				expect(res.body.todo.completedAt)
					.toNotExist();
			})
			.end(done);

	});
});

describe('GET /users/me', () => {
	it('should return user if auth', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id)
					.toBe(users[0]._id.toHexString());
				expect(res.body.email)
					.toBe(users[0].email);
			})
			.end(done);
	});

	it('should return 401 if not auth', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', 'abc123')
			.expect(401)
			.end(done);
	});
});
