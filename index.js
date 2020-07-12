const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// stuff i need in the prompt user
//title  (done)
//description (done)
// table of Contents (done)
//installation (done)
//usage (done)
//license (done)
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
                choices:["ISC"]
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
                message: "Table of contents",
                name: "tableContents",
                choices: ["[Description](#description)","[Installation](#installation)","[Usage](#usage)","[Contributing](#contributing)","[Test](#test)","[Questions](#question)"]
            },

        ])
}

function generateReadMe(answer) {
return `
# ${answer.title}

## Table of Contents
* ${answer.tableContents}

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
 `
}

promptUser()
    .then(function (answer) {
        const md = generateReadMe(answer);

        return writeFileAsync("generator.md", md);
    }).then(function () {
        console.log("Success");
    }).catch(function (error) {
        console.log(error)
    });

