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

//adding values to roles table function
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

//adding values to employee table function
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

//update values to department table function
function updateTableDepartment() {
  let department_array = [];
  connection.query("SELECT id, name FROM department", function (err, res) {
    if (err) throw err;
    let i = 0;
    for (i = 0; i < res.length; i++) {
      
      department_array.push("ID# " + res[i].id + " : " + res[i].name );
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
     
      // console.log("JUST CHECKING: "+ data.update_department_choices );
      // console.log("UPDATE department SET name = '" + data.name + "' WHERE id = '" + data.update_department_choices.match(/\d+(?=\s\:)/g) + "' ");
      console.log(res.affectedRows + " record(s) updated");
    });

       // connection.query("UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'", function (err, res) 
      
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
      // console.log("JUST CHECKING: "+ data.update_role_choices );
      // console.log("JUST CHECKING CLOSER " + data.update_role_choices.search(/\b\d+(?=[^\d<]*\w\d+)/g) );
       console.log(res.affectedRows + " record(s) updated");
    });

       // connection.query("UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'", function (err, res) 
      
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
      // console.log("just checking: "+ data.update_name_choices.replace(/\D/g, ""));
       console.log(res.affectedRows + " record(s) updated");
    });

                                                                  // connection.query("UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'", function (err, res) 
      
    start();
  });
});
};


//function for choosing table to add to 
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
        break;
      case "Employee table":
        addToTable3();
        break;
      default:
        return;
    };

  });
};


//function for choosing table to update
function table2() {
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
function table3() {
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
  ]).then(function (data) {
    switch (data.choose_table) {


      case "VIEW department table":
        //updateTableEmployee();
        break;
      case "VIEW role table":
       // addToTable2();
       
        break;
      case "VIEW employee table":
        //addToTable3();
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
        table();
        //addToDB();
        break;
      case "UPDATE database":
        table2();
        //updateDB();
        break;
      case "VIEW database":
        table3();
        //viewDB();
        break;
      default:
        "EXIT";
        connection.end();
        break;
    }

  })
};


