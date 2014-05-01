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

function addTask(pID, tTitle, taskStatus){
	
	connection =init();
	console.log("Task: " +tTitle+ "\n Project: " +pID+ "\n Status: " +taskStatus);
    connection.query("INSERT INTO Tasks (projectID, taskTitle, status) VALUES (?, ?, ?);", [pID, tTitle, taskStatus], function (error, rows, fields) {
    });
    
    var desc = "Added Task: " +tTitle+ " \nProject: " +pID+ " \nStatus: " +taskStatus;
    connection.end();
    return desc;
    
}

function addTaskandAssign(pID, tTitle, taskStatus){
	
	connection =init();
	var userID ="";
	console.log("Task: " +tTitle+ "\n Project: " +pID+ "\n Status: " +taskStatus);
    connection.query("INSERT INTO Tasks (projectID, taskTitle, status) VALUES (?, ?, ?);", [pID, tTitle, taskStatus], function (error, rows, fields) {
    });
    
   	connection.query("INSERT INTO Assigned (userID, projectID, taskID) VALUES (?, ?, (SELECT taskID FROM Tasks WHERE ((projectID=?) and (taskTitle=?))));",[userID, pID, pID, tTitle], function (error, rows, fields) { 
   		
   	});
    
    var desc = "Added Task: " +tTitle+ " \nProject: " +pID+ " \nStatus: " +taskStatus;
    connection.end();
    return desc;
    
}

// Edit the status of a task (searched by ID)
function editTask(taskStatus, tID){
	
	connection =init();
	console.log("TaskID: " +tID+ "\n Status: " +taskStatus);
    connection.query("UPDATE Tasks SET status=? WHERE taskID=?;", [taskStatus, tID], function (error, rows, fields) {});
    
	return "Update Complete:\n TaskID: " +tID+ "\n Status: " +taskStatus;
	connection.end();
}

// Deletes a task (searched by ID)
function deleteTask(tID) {
	
	connection =init();
	console.log("Task marked for deletion: " + tID);
    connection.query("DELETE FROM Tasks WHERE taskID=?;", [tID], function (error, rows, fields) {});
   	connection.query("DELETE FROM Assigned WHERE taskID=?;", [tID], function (error, rows, fields) {});
    
	var desc = "Deleted TaskID: " +tID+ " from the DB";
 	return desc;
 	connection.end();
}

// Assigns a task (by taskID) to specified user
function assignTask(username, tID) {
	
	connection =init();
	console.log("Assigning Task: " + tID+ " to User: " +username);
	connection.query("INSERT INTO Assigned (userID, projectID, taskID) Values(?, (SELECT projectID from Tasks where (taskID=?)), ?) on duplicate key update userID=Values(userID), taskID=Values(taskID);", [username, tID, tID], function (error, rows, fields) {
	});
	
	var desc = "Assigned Task: " +tID+ " to User: " +username;
	return desc;
	connection.end();
}

// View all tasks assigned to specified userID
function viewTasksByUser(username, callback) {
	
	connection =init();
	console.log("Viewing All Tasks for User: " + username);
	connection.query("SELECT * FROM Assigned NATURAL JOIN Tasks WHERE userID=?;", [username], function (error, rows, fields) {
		var desc = JSON.stringify(rows);
		callback(desc);
	});
	connection.end();
}

// View all tasks assigned to specified projectID
function viewTasksByProject(pID, callback) {
	
	connection = init();
	console.log("Viewing All Tasks for ProjectID: " + pID);
	connection.query("SELECT * FROM Tasks NATURAL JOIN Projects WHERE projectID=?;", [pID], function (error, rows, fields) {
		var desc = JSON.stringify(rows);
		callback(desc);
	});
	connection.end();
}

// View all tasks assigned to specified projectID
function viewUserTasksByProject(pID, callback) {
	
	connection = init();
	console.log("Viewing All Tasks for ProjectID: " + pID);
	connection.query("SELECT * FROM Tasks NATURAL JOIN Projects NATURAL JOIN Assigned WHERE projectID=?;", [pID], function (error, rows, fields) {
		var desc = JSON.stringify(rows);
		callback(desc);
	});
	connection.end();
}

exports.addTask = addTask;
exports.addTaskandAssign = addTaskandAssign;
exports.editTask = editTask;
exports.deleteTask = deleteTask;
exports.assignTask = assignTask;
exports.viewTasksByUser = viewTasksByUser;
exports.viewTasksByProject = viewTasksByProject;
exports.viewUserTasksByProject = viewUserTasksByProject;
