const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')

// Todo.remove({query}).then((res) => {})

Todo.findOneAndRemove({ text: "Finish the Node Course" })
	.then((todo) => {
		console.log(JSON.stringify(todo, undefined, 2));
	})

let id = '58521382c3952d12840ee092'

Todo.findByIdAndRemove(id)
	.then((todo) => {
		console.log(todo);
	})
