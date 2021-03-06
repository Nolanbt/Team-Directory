const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
function addManager() {
    inquirer
        .prompt([
            {
                type: "input"
                , message: "What is your managers name?"
                , name: "managerName"
            },
            {
                type: "input"
                , message: "What is your managers ID?"
                , name: "managerID"
            },
            {
                type: "input"
                , message: "What is your managers office number?"
                , name: "managerNumber"
            },
            {
                type: "input"
                , message: "What is your managers email?"
                , name: "managerEmail"
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerNumber);
            employees.push(manager);
            createTeam();
        });
};
function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input"
                , message: "What is your engineer's name?"
                , name: "engineerName"
            },
            {
                type: "input"
                , message: "What is your engineer's ID?"
                , name: "engineerId"
            },
            {
                type: "input"
                , message: "What is your engineer's email?"
                , name: "engineerEmail"
            },
            {
                type: "input"
                , message: "What is your engineer's gitHub username?"
                , name: "engineerUsername"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerUsername);
            employees.push(engineer);
            createTeam();
        });
};
function addIntern() {
    inquirer
        .prompt([
            {
                type: "input"
                , message: "What is your intern's name?"
                , name: "internName"
            },
            {
                type: "input"
                , message: "What is your intern's ID?"
                , name: "internId"
            },
            {
                type: "input"
                , message: "What is your intern's email?"
                , name: "internEmail"
            },
            {
                type: "input"
                , message: "What is the intern's school?"
                , name: "internSchool"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            employees.push(intern);
            createTeam();
        });
};
function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What type of employee would you like to add next?",
                choices: ["Engineer", "Intern", "I have no more employees to add"],
                name: "employeeType"
            }
        ]).then((answer) => {
            if (answer.employeeType === "Engineer") {
                addEngineer();
            }
            else if (answer.employeeType === "Intern") {
                addIntern();
            }
            else {
                fs.writeFile(outputPath, render(employees), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Success, your team has been created.")
                })
            }
        })
}
addManager();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
