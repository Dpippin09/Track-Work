// Import the PostgreSQL client
const { Client } = require('pg');

// Configure the PostgreSQL connection
const connection = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'AColyte123$',
  database: 'employee_tracker_db'
});

// Connect to the PostgreSQL database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to PostgreSQL!');
});

// Export the database query functions
module.exports = {
  // Get all departments
  getDepartments: function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM department', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  },

  // Get all roles
  getRoles: function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM role', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  },

  // Get all employees along with their role, department, and manager
  getEmployees: function() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
      `;
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  },

// Add a new department
addDepartment: function(name) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO department (name) VALUES ($1) RETURNING id', [name], (err, res) => {
      if (err) reject(err);
      else resolve(res.rows[0].id); 
    });
  });
},

  // Add a new role
  addRole: function(title, salary, department_id) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id], (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  },

  // Add a new employee
  addEmployee: function(first_name, last_name, role_id, manager_id) {
    return new Promise((resolve, reject) => {
        const text = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [first_name, last_name, role_id, manager_id];

        connection.query(text, values, (error, res) => {
            if (error) {
                reject(error);
            } else {
                resolve(res.rows);
            }
        });
    });
},

 // Update an employee's role
updateEmployeeRole: function(employee_id, role_id) {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id], (err) => {
      if (err) reject(err);
      else {
        this.getEmployees().then(updatedEmployees => {
          console.log('Employee role updated successfully!');
          console.table(updatedEmployees);
        resolve(updatedEmployees);
      }).catch(fetchErr => reject(fetchErr));
    }});
  });
}}