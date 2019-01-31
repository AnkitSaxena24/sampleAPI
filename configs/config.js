"use strict"
var env = 'localhost';
module.exports = function() {
    return {
        environment: env,
        "mysql_host": "localhost",
        "mysql_user": "root",
        "mysql_password": "root",
        "mysql_database": "api",
        "mysql_port": 3306,
    }
}();