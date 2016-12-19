const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // bcryptjs npm for docs

let password = '123abc!';

// bcrypt.genSalt(13, (err, salt) => { // 10 = Rounds require more time, so reduce brute force to hack
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	})
// })

let hashedPassword = '$2a$10$RoEg6zn3nxUdIMyUQj6PHeHBjYoz9tR9zA/z7D1cmtcYJtPSsO2we';

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});
// let data = {
// 	id: 10,
// 	password: "Anestasia10710!"
// }
//
// let token = jwt.sign(data, '123abc') // Takes object signs it returns token value
//
// console.log('Sign Token:', token);
//
// let decoded = jwt.verify(token, '123abc') // takes token and makes sure it's not changed
// console.log(`decoded:`, decoded)
//
// const { SHA256 } = require('crypto-js');

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
