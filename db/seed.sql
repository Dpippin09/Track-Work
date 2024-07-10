INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 100000, (SELECT id FROM department WHERE name = 'Sales')),
('Salesperson', 80000, (SELECT id FROM department WHERE name = 'Sales')),
('Lead Engineer', 150000, (SELECT id FROM department WHERE name = 'Engineering')),
('Software Engineer', 120000, (SELECT id FROM department WHERE name = 'Engineering')),
('Accountant', 70000, (SELECT id FROM department WHERE name = 'Finance')),
('Legal Team Lead', 110000, (SELECT id FROM department WHERE name = 'Legal')),
('Lawyer', 90000, (SELECT id FROM department WHERE name = 'Legal'));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', (SELECT id FROM role WHERE title = 'Sales Lead'), NULL),
('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Salesperson'), (SELECT id FROM employee WHERE first_name = 'John' AND last_name = 'Doe')),
('Emily', 'Johnson', (SELECT id FROM role WHERE title = 'Lead Engineer'), NULL),
('Michael', 'Brown', (SELECT id FROM role WHERE title = 'Software Engineer'), (SELECT id FROM employee WHERE first_name = 'Emily' AND last_name = 'Johnson'));
