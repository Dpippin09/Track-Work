
INSERT INTO department ("name") VALUES ("Owner"), ("Chef"), ("Waiter");
INSERT INTO role (title, salary, department_id) VALUES ("Boss", 800000, 1),
 ("Cooker", 600000, 2),
 ("Server", 400000, 3),
 ("Dishwasher", 30000, 4),
 ('Cleaner', 20000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tom', 'Johnson', 2, 1),
  ('Nick', 'Hutchings', 3, 5),
  ('Ashley', 'Smith', 2, 4),
  ('Jake', 'Hansen', 3, 4),
 ('Sarah', 'Cross', 2, NULL),
 ('Mitch', 'Kreeg', 2, NULL),
 ('Taylor', 'Brock', 1, 4);
