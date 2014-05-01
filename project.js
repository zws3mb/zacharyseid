//Team Pepper: Phase 3

var http = require("http"),
    url = require("url"),
    mysql = require("mysql");
var port = process.env.PORT || 1337;

function init(){
var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720eea4ue",
    password: "spring2014",
    database: "cs4720eea4ue"
});

connection.connect();
return connection;
}
//console.log("Connection to DB made.");

/*
 * Add a project to the Projects table
 * input: project title
 * output: [nothing]
 */
function add(pTitle){
  connection = init();
	var desc = "Project added with title: " + pTitle;
    connection.query("INSERT INTO Projects (projectTitle) VALUES (?);", pTitle, function (error, rows, fields) { });
    connection.end();
    return desc;
} 

function addTitle(pTitle, username, callback){
	var tTitle = "Initialize Project";
	var tStatus = "done";

/*
	var sqlQuery= 'INSERT INTO Projects (projectTitle) VALUES (?); ';
	sqlQuery += 'Set @pid = (Select projectID from Projects where projectTitle=?); ';
	sqlQuery += 'INSERT INTO Tasks (projectID, taskTitle, status) VALUES (@pid, ?, ?); ';
	sqlQuery += 'Set @tid = (Select taskID from Tasks where ((projectID=@pid) and (taskTitle =?))); ';
	sqlQuery += 'INSERT INTO Assigned (userID, projectID, taskID) VALUES (?, @pid, @tid); ';
	*/

   	connection = init();
   	
    //add initiliaze task to user who created project
	//assign that initialization task to the user who made this project
    connection.query("INSERT INTO Projects (projectTitle) VALUES (?);",[pTitle], function (error, rows, fields) { });
  	connection.query("INSERT INTO Tasks (projectID, taskTitle, status) VALUES ((SELECT projectID FROM Projects WHERE (projectTitle=?)), ?, ?)",[pTitle,tTitle,tStatus], function (error, rows, fields) { });
   	connection.query("INSERT INTO Assigned (userID, projectID, taskID) VALUES (?, (Select projectID from Projects where projectTitle=?), (Select taskID from Tasks where ((projectID=(Select projectID from Projects where projectTitle=?)) and (taskTitle =?))));", [username, pTitle, pTitle, tTitle], function (error, rows, fields) { });

	//return the projectID of the project just added
	connection.query("SELECT projectID  FROM Projects WHERE (projectTitle=?);", pTitle, function (error, rows, fields) {
		callback(""+JSON.stringify(rows));
	});

    connection.end();   
} 

/*
 * Delete a project tov the Projects table and from associated Tasks table
 * input: project id
 * output: [nothing]
 */
function deleteProject(pID){
  connection = init();
	var desc = "Project deleted with id: " + pID;
    
    connection.query("DELETE FROM Projects WHERE projectID=?;", [pID], function (error, rows, fields) {});
    connection.query("DELETE FROM Tasks WHERE projectID=?;", [pID], function (error, rows, fields) {});
    connection.query("DELETE FROM Assigned WHERE projectID=?;", [pID], function (error, rows, fields) {});
   	connection.end();
    return desc;
}

/*
 * View Project title and users assigned
 * Input: optional username
 * Output: full table of assigned projects (titles and usernames) or only project title for specified username
 */
function view(username,callback){
  connection = init();
	console.log("View Projects of user: "+ username);
	 var results='error';
   	if (username.length > 0){
	   	connection.query("SELECT projectID, projectTitle FROM Assigned NATURAL JOIN Projects WHERE userID=?;", username, function (error, rows, fields) {
	     callback(""+JSON.stringify(rows));
	    });
   	}
   	
   	//all projects and all users assigned
   	else{
   		connection.query("SELECT projectID, projectTitle, userID FROM Assigned NATURAL JOIN Projects;", function (error, rows, fields) {
      	callback(""+JSON.stringify(rows));
      });

   	}
    connection.end();
}

/*
 * View all tasks (title, status) for a given project id
 * Input: project id
 * Output: table of project title, task title, task status (for each task in project)
 */

function viewProjectTasks(pid,callback){
  	connection = init();
	console.log("View all tasks for Project: "+ pid);
	connection.query("SELECT projectTitle, taskTitle, status FROM Projects NATURAL JOIN Tasks WHERE projectID=?;", pid, function (error, rows, fields) {
		callback(""+JSON.stringify(rows));
	});

    connection.end();    
}

exports.add = add;
exports.addTitle = addTitle;
exports.view = view;
exports.viewProjectTasks = viewProjectTasks;
exports.deleteProject = deleteProject;
