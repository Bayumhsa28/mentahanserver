// Get the client
const mysql = require('mysql2');

// Create the connection to database
const database = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'express_js',
});

//menyatakan tidak ada error
database.connect((err) =>
    {
        if(err){
            console.log(err)
            return
        }
        console.log(`terhubung ke data base dengan ID` + database.threadId)
    }
);
module.exports = database;
// A simple SELECT query
//connection.query(
  //'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  //function (err, results, fields) {
    //console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
  //}
//);