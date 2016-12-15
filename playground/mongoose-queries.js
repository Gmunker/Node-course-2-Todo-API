const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')

let id = '5850ad5b70cd2d2d78344272';

if (!ObjectID.isValid(id)) {
	console.log('ID Not Valid!');
}

// Todo.find({
// 		_id: id
// 	})
// 	.then((todos) => {
// 		console.log(`Todos`, todos);
// 	})
//
// Todo.findOne({
// 		_id: id
// 	})
// 	.then((todo) => {
// 		console.log(`Todo:`, todo);
// 	})

// Todo.findById(id)
// 	.then((todo) => {
// 		if (!todo) {
// 			return console.log('Id not found! Please try again.')
// 		}
// 		console.log(`Todo by id:`, todo)
// 	})
// 	.catch((e) => console.log(e))

User.findById(id)
	.then((user) => {
		if (!user) {
			return console.log('User Not Found!')
		};

		console.log('User:', JSON.stringify(user, undefined, 2));
	})
	.catch((e) => console.log(e))
