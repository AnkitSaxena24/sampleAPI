const DB = require(__dirname + '/../helpers/database');

exports.getUserData = async() => {
    let query = 'SELECT * FROM user_data';
    let result = await DB.getQuery(query);

    return result;
}

exports.addUserData = async(data) => {
	let queryParams = [
		data.first_name, 
		data.last_name,
		data.age, 
		data.email
	];

    let query = 'INSERT INTO user_data (first_name, last_name, age, email) VALUES (?, ?, ?, ?)';
    let result = await DB.getQuery(query, queryParams);

    return result;   
}

exports.getSingleUserData = async(data) => {
	let id = data.id;
	let query = 'SELECT first_name, last_name, age, email FROM user_data WHERE id = ?';

	let result = await DB.getQuery(query, id);

	return result;
}

exports.updateUserData = async(data) => {
	let queryParams = [
		data.first_name,
		data.last_name,
		data.age,
		data.email,
		data.id
	];

	let query = 'UPDATE user_data SET first_name = ?, last_name = ?, age = ?, email = ? WHERE id = ?';

	let result = await DB.getQuery(query, queryParams);

	return result;
}

exports.deleteUserData = async(data) => {
	let id = data.id;

	let query = 'DELETE FROM user_data WHERE id = ?';

	let result = await DB.getQuery(query, id);

	return result;
}




















