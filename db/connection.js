// get the client
const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker'
})

connection.connect((e) => {
    if(e) {
        throw e
    }
})

module.exports = connection