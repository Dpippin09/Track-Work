const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTables = require('console.table');
var managers = [];
var roles = [];
var employees = [];

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'password',
  database: 'employeesDB'
});
const getManager = () => {
    connection.query(`SELECT manager, manager_id FROM manager`, (err, res) => {
        if (err) throw err;
        managers = [];
        for (let i = 0; i < res.length; i++) {
            const manager = res[i].manager;
            const manager_id = res[i].manager_id;
            var newManager = {
                name: manager,
                value: manager_id
            }
            managers.push(newManager);
        }
        return managers;
    });
};

const getRole = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) => {
     if (err) throw err;
     roles = [];
     for (let i = 0; i < res.length; i++) {
        const id = res[i].role_id;
        const title = res[i].title;
        var newRole = {
            name: title,
            value: id
        }
        roles.push(newRole)
     }
     return roles;
    });
};


const getEmployees = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) => {
        if (err) throw err;
        employees = [];
        for (let i = 0; i < res.length; i++) {
            const id = res[i].id;
            const firstName = res[i].first_name;
            const lastName = res[i].last_name;

            var newEmployees = {
                name: firstName.concat("", lastName),
                value: id
            }
            employees.push(newEmployees);
        }
        return employees;
});
};




const roleCheck = `SELECT id, employee.first_name, employee.last_name, title, salary, department.role, managers.manager
FROM employee
JOIN role ON employee.role_id = role.role_id
JOIN department ON role.department_id = department.department_id
LEFT JOIN managers ON employee.manager_id = managers.manager_id`;


const init = () => {
    getEmployees();
    getRole();
    getManager();
  inquirer
    .prompt({
        name: "init",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "view all Employees by Department",
            "View all Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "update Employee Role",
            "View all Roles",
            "View all Managers",
        ],
    })
    .then((answer) => {
        switch (answer.init) {
            case "View all Employees":
                allEmployees();
                break;

            case "View all Employees by Department":
                allEmployeeDepartments();
                break;
                
            case "View all Employees by Manager":
                allEmployeeManagers();
                break;
             
            case "Add Employee":
                addEmployee();
                break;
                
            case "Remove Employee":
                removeEmployee();
                break;
                
            case "Update Employee Role":
                updateRole();
                break;
                
            case "View All Roles":
                allRoles();
                break;
                
            case "View all Managers":
                allManagers();
                break;
                
            case "Exit":
                connection.end();
                break;    
        }
    });

};



const allEmployeeManagers = () => {
    inquirer
     .prompt({
        type: 'list',
        name: 'manger',
        message: 'Choose a manager!',
        choices: managers
     }).then((answer) => {
        connection.query(`SELECT first_name, last_name FROM employee
        WHERE manager_id = ${answer.manager};`, (err, res) => {
            if (err) throw err;
            console.table(res);
            init()
        })
     })
};


const updateManager = () => {
    inquirer
     .prompt([{
        type:'list',
        name: 'employee',
        message: 'Which employee is getting a new manager?',
        choices: employees
     },
     {
        type: 'list',
        name: 'manager',
        message: 'Who is you new manager?',
        choices: employess
     },
    ]).then((answer) => {
        connection.query(`UPDATE employee
        SET manager_id = ${answer.manager}
        WHERE id = ${answer.employee}`, (err, res) => {
            if (err) throw err;
            init()
        })
    })
};


const updateRole = () => {
    inquirer
     .prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Whose role are we updating?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their new role?',
            choices: roles
        },
     ]).then((answer) => {
        connection.query(`UPDATE employee
        SET role_id = ${answer.role}
        WHERE id = ${answer.employee};`, (err, res) => {
            if (err) throw err;
            init();
        })
     })
};


const allManagers = () => {
    connection.query(`SELECT manager FROM managers`, (err, res) => {
        if (err) throw err;
        console.log("\nAll MANAGERS\n");
        console.table(res);
        init();
    })
};



const allEmployees = () => {
    connection.query(roleCheck, (eer, res) => {
        console.log("\nAll EMPLOYEES\n");
        if (err) throw err;
        console.table(res);
        init();
    })
};


const allRoles = () => {
    connection.query(`SELECT title FROM role`, (err, res) => {
        console.log("\nAll ROLES\n");
        if (err) throw err;
        console.table(res);
        init();
    })
};



const allEmployeeDepartments = () => {
    inquirer
       .prompt({
         type: 'rawlist',
         name: 'departments',
         message: 'Choose a department.',
         choices: ['Engineering', 'Finance', 'Legal']
       }).then((answer) => {
        if (answer.departmens === 'Engineering'){
            connection.query(`SELECT employee.first_name, employee.last_name FROM employee
            JOIN role ON employee.role_id = role.role_id
            JOIN dempartments ON role.departments_id = department.department_id and department.role = "Engineering"`, (err,res) => {
                console.log("\nEngineering\n");
                if (err) throw err;
                console.table(res);
                init();
            })
        }
      else if (answer.departments === 'Finance'){
        connection.query(`SELECT employee.first_name, employee.last_name FROM employee
        JOIN role ON employee.role_id = role.role_id
        JOIN dempartments ON role.departments_id = department.department_id and department.role = "Finance"`, (err,res) => {
            console.log("\nFinance\n");
            if (err) throw err;
            console.table(res);
            init();  
       })
}
else if (answer.departments === 'Legal'){
    connection.query(`SELECT employee.first_name, employee.last_name FROM employee
    JOIN role ON employee.role_id = role.role_id
    JOIN dempartments ON role.departments_id = department.department_id and department.role = "Legal"`, (err,res) => {
        console.log("\nLegal\n");
        if (err) throw err;
        console.table(res);
        init();  
   })
}
});
};


addEmployee = () => {
    managers.push('none');
    inquirer
      .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is your first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is your last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is your position?',
            choices: roles
        },
        {
            types: 'list',
            name: 'manager',
            message: 'Who is your manager',
            choices: managers
        },
      ]).then((answer) => {
        if (answer.manager === 'none') {
            connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
            values ('${answer.first_name}', '${answer.last_name}' null)`, (err, res) => {
                if (err) throw err;
                init();
            });
        }
        else {
            connection.query(`INSERT INTO employee(first_name, last_name, role_id, manger_id)
            Values ('${answer.first_name}', '${answer.last_name}', '${answer.role}', '${answer.manager})`, (err, res) => {
                if (err) throw err;
                init();
            })
        }
      })
};


const removeEmployee = () => {
    inquirer
      .prompt({
        type: 'list',
        name: 'employee',
        message: 'Who would you like to remove?',
        choices: employees
      }).then((answer) => {
        connection.query(`DELETE FROM employee WHERE id=${answer.employee}`, (err, res) => {
            if (err) throw err;
            init();
        })
        console.log(answer)
      })
};
init()







