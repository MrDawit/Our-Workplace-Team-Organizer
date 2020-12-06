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

//function for adding values to employee table (original structure for functions, so that the # of functions stayed low 
//This structure did not stay the same for the rest of the code, but kept this one)
function addToTableDepartment(prompt_name, table_name, table_col) {
  inquirer.prompt([
    {
      type: "input",
      name: prompt_name,
      message: "Type the " + prompt_name + " ?"
    }
  ]).then(function (data) {

    connection.query("INSERT " + table_name + " (" + table_col + ") VALUES ('" + data[prompt_name] + "')", function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " record(s) added");
    });
    start();
  });
};

//adding values to roles table function
function addToTableRole() {

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

        console.log(res.affectedRows + " record(s) updated");
      });
    start();
  });
};

//adding values to employee table function
function addToTableEmployee() {

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

        console.log(res.affectedRows + " record(s) updated");
      });
    start();
  });
};

//update values to department table function
function updateTableDepartment() {
  let department_array = [];
  connection.query("SELECT id, name FROM department", function (err, res) {
    if (err) throw err;
    let i = 0;
    for (i = 0; i < res.length; i++) {

      department_array.push("ID# " + res[i].id + " : " + res[i].name);
    };
    inquirer.prompt([
      {
        type: "rawlist",
        name: "update_department_choices",
        message: "Which department do you wish to update?",
        choices: department_array,
      },
      {
        type: "input",
        name: "name",
        message: "Type the employee's department ?"
      }
    ]).then(function (data) {

      connection.query("UPDATE department SET name = '" + data.name + "' WHERE id = '" + data.update_department_choices.match(/\d+(?=\s\:)/g) + "' ", function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " record(s) updated");
      });

      start();
    });
  });
};


//update values to role table function
function updateTableRole() {
  let roles_array = [];
  connection.query("SELECT id, title, salary, department_id FROM role", function (err, res) {
    if (err) throw err;
    let i = 0;
    for (i = 0; i < res.length; i++) {

      roles_array.push("ID# " + res[i].id + " : " + res[i].title + " , " + res[i].salary + " , " + res[i].department_id);
    };
    inquirer.prompt([
      {
        type: "rawlist",
        name: "update_role_choices",
        message: "Which role do you wish to update?",
        choices: roles_array,
      },
      {
        type: "input",
        name: "title",
        message: "Type the employee's role ?"
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

      connection.query("UPDATE role SET title = '" + data.title + "', salary = '" + data.salary + "', department_id = '" +
        data.department_id + "' WHERE id = '" + data.update_role_choices.match(/\d+(?=\s\:)/g) + "' ", function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " record(s) updated");
        });

      start();
    });
  });
};

//update values to employee table function
function updateTableEmployee() {
  let name_array = [];
  connection.query("SELECT id, first_name, last_name FROM employee ", function (err, res) {
    if (err) throw err;
    let i = 0;
    for (i = 0; i < res.length; i++) {

      name_array.push("ID# " + res[i].id + ": " + res[i].last_name + " , " + res[i].first_name);
    };
    inquirer.prompt([
      {
        type: "rawlist",
        name: "update_name_choices",
        message: "Which employee do you wish to update?",
        choices: name_array,
      },
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

      connection.query("UPDATE employee SET first_name = '" + data.first_name + "', last_name = '" + data.last_name + "', role_id = '" +
        data.role_id + "', manager_id = '" + data.manager_id + "' WHERE id = '" + data.update_name_choices.replace(/\D/g, "") + "' ", function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " record(s) updated");
        });

      start();
    });
  });
};

//view table function using parameters to choose which table
function viewTable(whichTable){
 
  connection.query("SELECT * FROM our_workplace." + whichTable, function (err, res) {
    if (err) throw err;
   console.table(res);
  start();
  });
};

//function for viewing all employee's data
function viewAllEmployeeData(){
  let sql_leftJoin = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"; 
  connection.query(sql_leftJoin + ";", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//function for viewing all data from employee, role and department tables
function viewAllData(){
  let sql_leftJoin = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"; 
  let sql_rightJoin = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id FROM employee RIGHT JOIN role ON employee.role_id = role.id RIGHT JOIN department ON role.department_id = department.id";
  connection.query(sql_leftJoin + " UNION " + sql_rightJoin + ";", function (err, res) {
    if (err) throw err;
   console.table(res);
  //console.log("The json result: " + JSON.stringify(res));
   start();
  });
};

//function for viewing connection between the 3 tables
function viewConnectedData(){
  
    connection.query("SELECT employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, role.salary AS salary, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;", function (err, res) {
      if (err) throw err;
     console.table(res);
    //console.log("The json result: " + JSON.stringify(res));
     start();
    });
};

//function for choosing table to add to 
function selectTableToAddTo() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "choose_table",
      choices: [
        "Employee table",
        "Role table",
        "Department table"
      ]
    }
  ]).then(function (data) {
    switch (data.choose_table) {
      case "Employee table":
        addToTableEmployee();
        break;
        case "Role table":
        addToTableRole();
        break;
      case "Department table":
        addToTableDepartment("department_name", "department", "name");
        break;
      default:
        return;
    };

  });
};


//function for choosing table to update
function selectTableToUpdate() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "update_table",
      choices: [
        "UPDATE employee table",
        "UPDATE role table",
        "UPDATE department table"
      ]
    }
  ]).then(function (data) {
    switch (data.update_table) {


      case "UPDATE department table":
        updateTableDepartment();
        break;
      case "UPDATE role table":
        updateTableRole();
        break;
      case "UPDATE employee table":
        updateTableEmployee();
        break;
      default:
        return;
    };

  });
};


//function for choosing table to view
function selectTableToView() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice of table",
      name: "view_table",
      choices: [
        "VIEW ALL employee's data",
        "VIEW ALL data",
        "VIEW the employees that have connected data",
        "VIEW only employee table",
        "VIEW only role table",
        "VIEW only department table"
      ]
    }
  ]).then(function (data) {
    switch (data.view_table) {
      case "VIEW ALL employee's data":
        viewAllEmployeeData();
        break;
        case "VIEW ALL data":
          viewAllData();
          break;
      case "VIEW the employees that have connected data":
        viewConnectedData();
        break;
      case "VIEW only employee table":
        viewTable("employee");
        break;
      case "VIEW only role table":
        viewTable("role");
        break;
        case "VIEW only department table":
        viewTable("department");
        break;
      default:
        return;
    };

  });
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
        "VIEW database",
        "EXIT"
      ]
    },
  ]).then(function (data) {
    switch (data.type) {
      case "ADD to database":
        selectTableToAddTo();
        break;
      case "UPDATE database":
        selectTableToUpdate();
        break;
      case "VIEW database":
        selectTableToView();
        break;
      default:
        "EXIT";
        connection.end();
        break;
    }

  })
};


