//const MongoClient = require('mongodb').MongoClient;
const {
	MongoClient,
	ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
	if (error) {
		return console.log('Unable to connect to MongoDB Server');
	}
	console.log('Connected to MongoDB Server');

	// db.collection('Todos').insertOne({
	// 	text: 'Something new to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo,', err)
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// db.collection('Users').insertOne({
	// 	name: 'Greg Munker',
	// 	age: 37,
	// 	location: 'Flanders, NJ'
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to add user,', err)
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	db.close();

});
