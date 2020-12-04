
const mysql = require("mysql");
const inquirer = require("inquirer");


// const department_name = "";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "our_workplace"
});


// function addToTable(prompt_name, table_name, table_col) {


//   inquirer.prompt([
//     {
//       type: "input",
//       name: prompt_name,
//       message: "Type the " + prompt_name + " ?"

//     }
//   ]).then(function (data) {

//     connection.query("SELECT first_name FROM employee ", function (err, rows) {
//       if (err) throw err;
//       console.log(rows[0].first_name);
//     });

//   });
// };

// addToTable();






// const fetch = [];
// function first() {
//   connection.query("SELECT first_name,last_name FROM employee ", function (err, res) {
//     if (err) throw err;
//     let i = 0;
//     for (i = 0; i < res.length; i++) {
//       fetch.push(res[i].last_name + " , " + res[i].first_name);
//     };
//     console.log(fetch);
//     // return fetch;

//   });
// };
//   // first().then(function(){
//   //   console.log(fetch);
//   // });
//   //console.log(fetch);
// first();




const name_array=[];
function updateTableEmployee() {
  connection.query("SELECT id, first_name, last_name FROM employee ", function (err, res) {
    if (err) throw err;
    let i = 0;
    for (i = 0; i < res.length; i++) {
      
      name_array.push("id# " + res[i].id + ", " + res[i].last_name + " , " + res[i].first_name);
      
    };
  
  inquirer.prompt([
    {
      type: "rawlist",
      name: "update_name_choices",
      message: "Which employee do you wish to update?",
      choices: name_array
    
     }
    ]).then(function (data) {

      console.log("Just Checking: " + data.update_name_choices);
    });
  });
 };

  updateTableEmployee();