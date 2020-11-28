const mysql = require("mysql");
const inquirer = require("inquirer");


const department_name = "";

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

const addTable = function addToTable (prompt_name,table_name,table_col,prompt_answer){
  inquirer.prompt([
    {
      type: "input",
      message: "Type the" + prompt_name,
      name: "" + prompt_name
    }
  ]).then(function (data) {

    connection.query("INSERT " + table_name + " (" + table_col + ") VALUES ('" + prompt_answer + "')", function (err, res) {
      if (err) throw err;
     // console.log(JSON.stringify(res));
    });
    start();
  })
};

function table() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "choose_table",
      choices: [
        "Department table",
        "Role table",
        "Employee table"
      ]
    }
  ]).then(function(data){
    switch (data.choose_table) {


      case "Department table":
        addTable(department_name,department,name,data.department_name);
        break;
      case "Role table":
        
        break;
      case "Employee table":
        
        break;
      default:
        return;
    }

  })
}

// function addToDB() {
//   inquirer.prompt([
//     {
//       type: "rawlist",
//       message: "Select your choice of table",
//       name: "add_table",
//       choices: [
//         "ADD to department table",
//         "ADD to role table",
//         "ADD to employee table"
//       ]
//     }
//   ]).then(function (data) {
//     switch (data.add_table) {


//       case "ADD to department table":
//         inquirer.prompt([
//           {
//             type: "input",
//             message: "Type the department name",
//             name: "department_name"
//           }
//         ]).then(function (data) {

//           connection.query("INSERT department (name) VALUES ('" + data.department_name + "')", function (err, res) {
//             if (err) throw err;
//             console.log(JSON.stringify(res) + "but really part of seed inserted");
//           });
//           start();
//         })
//         break;
//       case "ADD to role table":
//         ;
//         break;
//       case "ADD to employee table":
//         ;
//         break;
//       default:
//         return;
//     }
//   });
// };

// function updateDB() {
//   inquirer.prompt([
//     {
//       type: "rawlist",
//       message: "Select your choice of table",
//       name: "update_table",
//       choices: [
//         "UPDATE department table",
//         "UPDATE role table",
//         "UPDATE employee table"
//       ]
//     }
//   ])
// };

// function viewDB() {
//   inquirer.prompt([
//     {
//       type: "rawlist",
//       message: "Select your choice of table",
//       name: "view_table",
//       choices: [
//         "VIEW department table",
//         "VIEW role table",
//         "VIEW employee table"
//       ]
//     }
//   ])
// };







function start() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice",
      name: "type",
      choices: [
        "ADD to database",
        "UPDATE database",
        "VIEW database",
        "EXIT"
      ]
    },
  ]).then(function (data) {
    switch (data.type) {
      case "ADD to database":
        table();
        //addToDB();
        break;
      case "UPDATE database":
        //updateDB();
        break;
      case "VIEW database":
        //viewDB();
        break;
      default:
        "EXIT";
        connection.end();
        break;
    }

  })
};


