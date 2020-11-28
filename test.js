
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


 function addToTable ( p_name , table_name , table_col ){

    
    inquirer.prompt([
      {
        type: "input",
        name: "d_name",
        message: "Type the " + p_name + " ?"
        
      }
    ]).then(function (data) {
  
      connection.query("INSERT " + table_name + " (" + table_col + ") VALUES ('" + data.d_name + "')", function (err, res) {
        if (err) throw err;
       // console.log(JSON.stringify(res));
      });
     
    })
  };

//   addToTable(department_name,department,name,data.department_name);




// function addToTable (p_name){
//     inquirer.prompt([
//       {
//         type: "input",
//         name: p_name,
//         message: "Type the"+ p_name
        
//       }
//     ]).then(function (data) {
  
//         connection.query("INSERT department (name) VALUES ('" + data.d_name + "')", function (err, res) {
//         if (err) throw err;
//        // console.log(JSON.stringify(res));
//       });
     
//     })
//   };



  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
  
    addToTable(dr_name , department , name );

});