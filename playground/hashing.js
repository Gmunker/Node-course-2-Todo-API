const jwt = require('jsonwebtoken');

let data = {
	id: 10,
	password: "Anestasia10710!"
}

let token = jwt.sign(data, '123abc') // Takes object signs it returns token value

console.log('Sign Token:', token);

let decoded = jwt.verify(token, '123abc') // takes token and makes sure it's not changed
console.log(`decoded:`, decoded)

const { SHA256 } = require('crypto-js');

// let message = 'Anestasia10710!';
//
// let hash = SHA256(message)
// 	.toString();
//
// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)
//
// let data = {
// 	id: 4
// }
//
// let token = {
// 	data: message,
// 	hash: SHA256(JSON.stringify(message) + 'somesecret')
// 		.toString()
// }
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret')
// 	.toString();
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data))
// // 	.toString();
//
// if (resultHash === token.hash) {
// 	console.log('Data was not changed')
// } else {
// 	console.log('data was changed, dont trust')
// }
