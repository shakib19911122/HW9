const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// stuff i need in the prompt user
//title  (done)
//description (done)
// table of Contents (need to come back)
//installation (done)
//usage (done)
//license (need to come back)
//contributing (done)
//tests?? (done)

function promptUser() {
    return inquirer.prompt(
        [
            {
                type: "input",
                message: "what is your project title?",
                name: "title"
            },
            {
                type: "input",
                message: "Enter description.",
                name: "description"
            },
            {
                type: "input",
                message: "Installation instructions.",
                name: "installation"
            },
            {
                type: "input",
                message: "Usage information.",
                name: "usage"
            },
            {
                type: "input",
                message: "Contributing",
                name: "contributing"
            },
            {
                type: "input",
                message: "Test",
                name: "test"
            },
            {
                type: "list",
                message: "License",
                name: "license",
                choices:["1","2","3"] // need to check what need to be put in as choice 
            },
            {
                type: "input",
                message: "What is you GitHub account?",
                name: "github"
            },
            {
                type: "input",
                message: "What is you email address?",
                name: "email"
            },
            {
                type: "checkbox",
                message: "Tabel of contents",
                name: "tableContents",
                choices: ["[Description](#description)","[Installation](#installation)","[Usage](#usage)","[Contributing](#contributing)","[Test](#test)","[Questions](#question)"]
            },

        ])
}

function generateReadMe(answer) {
    return `
    # ${answer.title}

    ## Description
    * ${answer.description}

    ## Installation
    * ${answer.installation}

    ## Usage
    * ${answer.usage}

    ## Contributing
    * ${answer.contributing}

    ## Test
    * ${answer.test}

    ## Questions
    * ${answer.github}
    * ${answer.email}
 
    ## Table of Contents
    * ${answer.tableContents}
 
    `
}

promptUser()
    .then(function (answer) {
        const md = generateReadMe(answer);

        return writeFileAsync("ReadMe.md", md);
    }).then(function () {
        console.log("Success");
    }).catch(function (error) {
        console.log(error)
    });

