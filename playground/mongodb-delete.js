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

	// deleteMany
	//
	// db.collection('Todos').deleteOne({
	// 	text: "wash the kids"
	// }).then((result) => {
	// 	console.log(result);
	// })

	//deleteOne
	//
	// db.collection('Todos').deleteOne({
	// 		text: "wash the kids"
	// 	}).then((result) => {
	// 		console.log(result);
	// 	})

	//*findOneAndDelete
	// db.collection('Todos').findOneAndDelete({
	// 	text: "wash the kids"
	// }).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').deleteMany({
		name: 'Greg Munker'
	})

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('585010a99fc2d602d0dd42a9')
	}).then((result) => {
		console.log(result)
	})

	//db.close();

});
