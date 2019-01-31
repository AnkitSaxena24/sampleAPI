const DB = require(__dirname + '/../helpers/database');

exports.getUserData = async(data) => {
    let query = 'SELECT * FROM user_data';
    let result = await DB.getQuery(query);

    return result;
}