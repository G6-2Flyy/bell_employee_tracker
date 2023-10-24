const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do? ",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  },
];

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.option) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment()
        break;
      case "Add a role":
        addRole()
        break;
      case "Add an employee":
        addEmployee()
        break;
      case "Update an employee role":
        updateEmployeeRole()
        break;
      case "Quit":
    }
  });
}

async function viewDepartments() {
  const results = await db.promise().query("SELECT * FROM department");
  console.table(results[0]);
}

async function viewRoles() {
    const results = await db.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id");
    console.table(results[0]);
}

async function viewEmployees() {
    const results = await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name,
     role.title, department.name AS department, role.salary,
     CONCAT(m.first_name," ",m.last_name) AS manager
     FROM employee 
     INNER JOIN role ON employee.role_id = role.id
     INNER JOIN department ON role.department_id = department.id
     LEFT JOIN employee m ON employee.manager_id = m.id`);
    console.table(results[0]);
}

async function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a department name: '
        }
    ])
    .then(async(answers) => {
        const results = await db.promise().query(`INSERT INTO department (name) VALUES (?) `, [answers.name]);
        console.log('A new department has been added successfully! ');
    })
   
}

async function addRole() { 
    const dbData = await db.promise().query(`SELECT * FROM department`);
    const departments = dbData.rows.map((dpt)=> {
        return {name: dpt.name, value: dpt.id}
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter a job title: '
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter a salary: '
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select a department: ',
            choices: departments

        }
    ])
    .then(async(answers) => {
        const results = await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?) `, [answers.title, answers.salary, answers.department]);
    console.log('A new role has been added successfully! ');
    })
    
}

async function addEmployee() { 
    const dbData = await db.promise().query('SELECT * FROM role');
    const roles = dbData.rows.map((role)=> {
        return {name: role.title, value: role.id}
    });
    const dbManagers = await db.promise().query('SELECT * FROM employee');
    const managers = dbManagers.rows.map((manager) => {
        return {name: `${manager.first_name} ${manager.last_name}`, value: manager.id}
    })
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee: '
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select a role: ',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select a manager:',
            choices: managers
        }

    ])
    .then(async(answers) => {
        const results = await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) `,
         [answers.first_name, answers.last_name, answers.role, answers.manager]);
    console.log('A new employee has been added successfully! ');
    })
}

async function updateEmployeeRole() { 
    const dbData = await db.promise().query('SELECT * FROM role');
    const roles = dbData.rows.map((role)=> {
        return {name: role.title, value: role.id}
    });
    const dbEmployees = await db.promise().query('SELECT * FROM employee');
    const employees = dbEmployees.rows.map((emp) => {
        return {name: `${emp.first_name} ${emp.last_name}`, value: emp.id}
    })
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee: ',
            choices: employees
        },
    ])
    .then(async(answers) => {

        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Select a new role: ',
                choices: roles
            },
        ])
        .then(async(response) => {
    
            const results = await db.promise().query(`UPDATE employee SET role_id = ? WHERE id = ? `,
             [response.role, answers.employee]);
        console.log('An employee role has been updated successfully! ');
        })
    })
}
init();
