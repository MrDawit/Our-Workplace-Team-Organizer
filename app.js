const mysql = require("mysql");
const inquirer = require("inquirer");



const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "our_workplace"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

//test by only going down rabbit hole of 1st function, after try to combine...
//...these 3 functions by being more general ("select your choice of table" and choices being the tables)
function addToDB() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "add_table",
      choices: [
        "ADD to department table",
        "ADD to role table",
        "ADD to employee table"
      ]
    }
  ]).then(function (data) {
    switch (data.add_table) {
      case "ADD to department table":
        connection.query("INSERT department (name) VALUES ('production'),('admin')", function (err, res) {
          if (err) throw err;
          console.log(res + "but really part of seed inserted");
        });
        break;
      case "ADD to role table":
        ;
        break;
      case "ADD to employee table":
        ;
        break;
      default:
        return;
    }
  });
};

function updateDB() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "update_table",
      choices: [
        "UPDATE department table",
        "UPDATE role table",
        "UPDATE employee table"
      ]
    }
  ])
};

function viewDB() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "view_table",
      choices: [
        "VIEW department table",
        "VIEW role table",
        "VIEW employee table"
      ]
    }
  ])
};

function start() {
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
  ]).then(function (data) {
    switch (data.type) {
      case "ADD to database":
        addToDB();
        break;
      case "UPDATE database":
        updateDB();
        break;
      case "VIEW database":
        viewDB();
        break;
      default:
        return;
    }

  })
};


