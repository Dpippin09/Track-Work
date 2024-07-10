// Import the required modules
const inquirer = require('inquirer');
const queries = require('../queries/queries');

// Function to display the main menu and handle user choices
function mainMenu() {
    // Prompt the user to choose an action
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }).then((response ) => {
        // Handle the user's choice
        switch (response.choice) {
            case 'View all departments':
                queries.getDepartments().then(departments => {
                    console.table(departments);
                    mainMenu();
                }).catch(error => console.error(error));
                break;
            case 'View all roles':
                queries.getRoles().then(roles => {
                    console.table(roles);
                    mainMenu();
                }).catch(error => console.error(error));
                break;
            case 'View all employees':
                queries.getEmployees().then(employees => {
                    console.table(employees);
                    mainMenu();
                }).catch(error => console.error(error));   
                break;
            case 'Add a department':
                inquirer.prompt({
                    name: 'departmentName',
                    type: 'input',
                    message: 'What is the name of the department?'
                }).then(({ departmentName }) => {
                    queries.addDepartment(departmentName).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                }).catch(error => console.error(error));
                break;
            case 'Add a role':
                inquirer.prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'Enter the title of the role:'
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'Enter the salary of the role:'
                    },
                    {
                        name: 'department_id',
                        type: 'input',
                        message: 'Enter the department ID of the role:'
                    }
                    // ... prompts for title, salary, department_id ...
                ]).then(({ title, salary, department_id }) => {
                    queries.addRole(title, salary, department_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));   
                });
                break;
            case 'Add an employee':
                inquirer.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'Enter the first name of the employee:'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'Enter the last name of the employee:'
                    },
                    {
                        name: 'role_id',
                        type: 'input',
                        message: 'Enter the role ID of the employee:'
                    },
                    {
                        name: 'manager_id',
                        type: 'input',
                        message: 'Enter the manager ID of the employee:'
                    }
                ]).then(({ first_name, last_name, role_id, manager_id }) => {
                    // Check if any of the values are null
                    if (first_name && last_name && role_id && manager_id) {
                        // If none of the values are null, call addEmployee
                        queries.addEmployee(first_name, last_name, role_id, manager_id).then(() => {
                            mainMenu();
                        }).catch(error => console.error(error));
                    } else {
                        // If any of the values are null, log an error message and return to the main menu
                        console.error('All fields are required');
                        mainMenu();
                    }
                });
                break;
            case 'Update an employee role':
                inquirer.prompt([
                    {
                        name: 'employee_id',
                        type: 'input',
                        message: 'Enter the ID of the employee:'
                    },
                    {
                        name: 'new_role_id',
                        type: 'input',
                        message: 'Enter the new role ID of the employee:'
                    }
                    // ... prompts for employee_id, new_role_id ...
                ]).then(({ employee_id, new_role_id }) => {
                    queries.updateEmployeeRole(employee_id, new_role_id).then(() => {
                        mainMenu();
                    }).catch(error => console.error(error));
                });
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
        }
    });
    console.log('here');
}

// Export the mainMenu function
module.exports = { mainMenu };