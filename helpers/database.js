const mysql = require('mysql')
const config = require(__dirname + '/../configs/config')


exports.getQuery = async(query,params=[],single=false)=>{

	return new Promise(async (resolve, reject) => {
		let response = {}
		let connection = mysql.createConnection({
			host     : 	config.mysql_host,
			user     : 	config.mysql_user,
			password : 	config.mysql_password,
			database : 	config.mysql_database,
			port 	 :  config.mysql_port
		})
 
		connection.connect();
		
		connection.query(query,params, function (error, result, fields) {
			if (error){
				response.success = 0
				response.status = 500
				response.message = "database exception"
				response.error = error
				console.log(error)
			}else{
				response.success = 1
				response.status = 200
				response.data = (single)?result[0]:result
			}

			resolve(response);
		})
		connection.end();
	});
}