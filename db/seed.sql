USE our_workplace

INSERT department (name)
VALUES ("production"), ("admin");

INSERT role (title,salary,department_id)
VALUES ("superSaiyan_blue","50000","100"),("superSaiyan_rose","60000","1000");

INSERT employee (first_name,last_name,role_id,manager_id)
VALUES ("don","donny","1","1"),("george","georgi","2","2");