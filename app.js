const mysql = require("mysql");
const inquirer = require("inquirer");



const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "our_workplace"
});


inquirer.prompt([
  {
    type: "rawlist",
    message: "Select your choice",
    name: "type",
    choices: [
      "ADD to database",
      "UPDATE database",
      "VIEW database"
    ]
  },
]).then(data){
  switch (data.type) {
    case "ADD to database":
      break;
    case "UPDATE database":
      break;
    case "VIEW database":
      break;
    default:
  }

}

