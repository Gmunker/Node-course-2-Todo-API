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

	//findOneandUpdate

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5850148deda1035224920b22")
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// }, (err) => {
	// 	console.log(`Unable to update: ${err}`)
	// });

	db.collection('Users').findOneAndUpdate({
		name: 'Anestasia Munker'
	}, {
		$set: {
			name: "Greg Munker"
		},
		$inc: {
			age: 31
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})

	//db.close();

});
