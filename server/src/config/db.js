const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD
});

connection.connect((err) => {
    if (err)
        console.log("Error connecting to db");
    else
        console.log("Connection established with database");
})

module.exports = connection;