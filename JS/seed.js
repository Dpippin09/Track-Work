const mysql = require('mysql');
const fs = require('fs');
const { exit } = require('process');

const seedQuery = fs.readFileSync('./sql/seed.sql', {
    encoding:'utf-8'
});



const connectionProperties = {
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employeesDB'
}


const connection = msql.createconnection(connectionProperties);

connection.connect();

console.log('Running SQL seed');

connection.query(seedQuery,err=>{
    if(err){
        throw err
    }
    console.log('Seed Complete');
    connection.end()
});