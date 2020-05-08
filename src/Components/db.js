var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'reshabh',
  password : 'Reshabhs49@',
  database : 'musicx'
});

connection.connect(error=>{
if(error) throw error;
connection.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    console.log(fields);
  });
  connection.end();
})
