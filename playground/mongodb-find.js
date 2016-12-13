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

	// db.collection('Users').find({
	// 	name: "Greg Munker"
	// }).count().then((count) => {
	// 	console.log(`Users count: ${count}`)
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// })

	db.collection('Users').find({
		name: "Greg Munker"
	}).toArray().then((docs) => {
		console.log(`Users: ${docs.length}`)
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err)
	})



	//db.close();

});
