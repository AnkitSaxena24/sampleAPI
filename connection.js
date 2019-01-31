var mysql = require('mysql');
const config = require(__dirname + '/configs/config');

var connection = mysql.createPool({
    connectionLimit: 100,
    host: config.mysql_host, 
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database,
    debug: false,
    queueLimit: 30, 
    acquireTimeout: 1000000
});

module.exports = connection;