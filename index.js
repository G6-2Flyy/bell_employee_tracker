const inquirer = require('inquirer');
// const connection = require('./db/connection');

// TODO: Create an array of questions for user input
const questions = [{
    type:'list' ,
    name: 'option' ,
    message: 'What would you like to do? ',
    choices: [
        'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'
    ]
}]

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers)=> {
        console.log(answers);
        switch (answers.option) {
         case 0: 
         option = 'View all departments';
         break;
         case 1: 
         option = 'View all roles';
         break
        }
    })
} 
init();