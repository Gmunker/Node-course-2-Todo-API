require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	});

	todo.save()
		.then((doc) => {
			res.send(doc);
		}, (e) => {
			res.status(400)
				.send(e);
		});

});

app.get('/todos', (req, res) => {
	Todo.find()
		.then((todos) => {
			res.send({ todos })
		}, (err) => {
			res.status(400)
				.send(err);
		})
});


app.get('/todos/:id', (req, res) => {
	let id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404)
			.send('Invalid Id')
	}

	Todo.findById(id)
		.then((todo) => {
			if (!todo) {
				return res.status(404)
					.send('No todo found')
			}

			res.send({ todo })
		}, (err) => {
			res.status(400)
				.send()
		}); // Todo.findById
}); // app.get

app.delete('/todos/:id', (req, res) => {
	let id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404)
			.send('Invalid Id')
	}

	Todo.findByIdAndRemove(id)
		.then((todo) => {
			if (!todo) {
				return res.status(404)
					.send('No todo found')
			}
			res.send({ todo });
		}, (e) => {
			res.status(400)
				.send();
		});
});

app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404)
			.send('Invalid Id')
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date()
			.getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
		.then((todo) => {
			if (!todo) {
				res.status(404)
					.send('No Todo Found!')
			}

			res.send({ todo });
		})
		.catch((e) => {
			res.status(400)
				.send();
		})
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = { app };
