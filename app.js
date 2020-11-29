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

function addToTable(prompt_name, table_name, table_col) {
  inquirer.prompt([
    {
      type: "input",
      name: prompt_name,
      message: "Type the " + prompt_name + " ?"
    }
  ]).then(function (data) {

    connection.query("INSERT " + table_name + " (" + table_col + ") VALUES ('" + data[prompt_name] + "')", function (err, res) {
      if (err) throw err;

      // console.log(JSON.stringify(res));
    });
    start();
  })
};


function addToTable2() {

  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Type the employee's title ?"
    },
    {
      type: "input",
      name: "salary",
      message: "Type the employee's salary ?"
    },
    {
      type: "input",
      name: "department_id",
      message: "Type the employee's department_id ?"
    }

  ]).then(function (data) {

    connection.query("INSERT role ( title , salary , department_id ) VALUES ('" + data.title + "', "
      + data.salary + ", " + data.department_id + ")", function (err, res) {
        if (err) throw err;

        // console.log(JSON.stringify(res));
      });
    start();
  });
};


function addToTable3() {

  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Type the employee's first_name ?"
    },
    {
      type: "input",
      name: "last_name",
      message: "Type the employee's last_name ?"
    },
    {
      type: "input",
      name: "role_id",
      message: "Type the employee's role_id ?"
    },
    {
      type: "input",
      name: "manager_id",
      message: "Type the employee's manager_id ?"
    }

  ]).then(function (data) {

    connection.query("INSERT employee ( first_name , last_name , role_id , manager_id ) VALUES ('" + data.first_name + "', '"
      + data.last_name + "', " + data.role_id + "," + data.manager_id + ")", function (err, res) {
        if (err) throw err;

        // console.log(JSON.stringify(res));
      });
    start();
  });
};
// async function forRoleTable(){
//   try{
//     await addToTable( "role_title" , "role" , "title" );
//   await addToTable( "role_salary" , "role" , "salary" );
//    await addToTable( "role's_department_id" , "role" , "department_id" );
//   }
//  catch(error){
//    console.log(error);
//  }
// };




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
  ]).then(function (data) {
    switch (data.choose_table) {


      case "Department table":
        addToTable("department_name", "department", "name");
        break;
      case "Role table":
        addToTable2();
        // inquirer.prompt([
        //   {
        //     type: "input",
        //       name: "title",
        //       message: "Type the employee's title ?"
        //   },
        //   {
        //     type: "input",
        //       name: "salary",
        //       message: "Type the employee's salary ?"
        //   },
        //   {
        //     type: "input",
        //       name: "department_id",
        //       message: "Type the employee's department_id ?"
        //   }
        // ]).then( function (data) {

        //           async function forRoleTable({
        //             await addToTable( "role_title" , "role" , "title" );

        //           }).then(function(){
        //               await addToTable( "role_salary" , "role" , "salary" );
        //             });

        // forRoleTable();
        // addToTable( "role_title" , "role" , "title" );
        //    addToTable( "role_salary" , "role" , "salary" );
        //    addToTable( "roles_department_id" , "role" , "department_id" );


        break;
      case "Employee table":
        addToTable3();
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


