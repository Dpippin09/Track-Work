CREATE TABLE department (
    id serial PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
    
);

CREATE TABLE role (
    id serial PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,3) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) references department(id)

);

CREATE TABLE employee (
    id serial PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) references role(id),
    FOREIGN KEY (manager_id) references employee(id)
);