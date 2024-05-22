const mysql = require('mysql');
const icon = require('asciliart-logo');
const inquirer = require('inquirer');
const promisemysql = require('promise-mysql');

const chalk = require('chalk');

function log(msg){
    console.log(msg);
}


log(chalk.green.bold('=================='));
log(chalk.yellow(''));
log(chalk.blue.bold('EMPLOYEE'));
log(chalk.blue.bold('MANAGEMENT'));
log(chalk.blue.bold('TRACKER'));
log(chalk.yellow(''));
log(chalk.green.bold('==============='));



const connectionProperties = {
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employeesDB'
}



const connection = mysql.createConnection(connectionProperties);