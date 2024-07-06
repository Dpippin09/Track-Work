require('dotenv').config();
const fs = require('fs');
const { exit } = require('process');
const { Pool } = require('pg');

const seedQuery = fs.readFileSync('./sql/seed.sql', {
    encoding:'utf-8'
});

const postgres = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: "localhost",
        database: process.env.DB_NAME,

    }
)


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