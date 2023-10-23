INSERT INTO department (name)
VALUES ('HUMAN RESOURCES'), ('FINANCE & ACCOUNTING'), ('MARKETING'), ('OPERATIONS'), ('DISTRIBUTION');

INSERT INTO role (title, salary, department_id)
VALUES ('Comptroller', 110000, 2), ('Ops Manager', 85000, 4), ('HR Manager', 100000, 1), 
('Sales Rep', 95000, 3), ('Shipping Mgr', 85000,5), ('Account Payable Clerk', 40000, 2), ('HR Clerk', 40000, 1),
('Marketing Manager', 100000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 4, 5), ('Jane', 'Smith', 3, NULL), ('Timothy', 'Davis', 6, 1), ('Susie', 'Brown', 7, 3),
('Heather', 'Rodriguez', 8, NULL)

