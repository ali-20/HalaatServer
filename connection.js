const mysql = require('mysql');

var mysqlconnection= mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database: "halaat",
    multipleStatements: true
});

mysqlconnection.connect((err)=>{
    if(err){
        console.log(err);

    }

    else {
        console.log('connection successful');
    }
});

module.exports=mysqlconnection;