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
        break;
      case "Add a role":
        break;
      case "Add an employee":
        break;
      case "Update an employee role":
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



init();
