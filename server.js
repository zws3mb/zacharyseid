//Team Pepper: Phase 3
var http = require("http"),
url = require("url"),
fs = require('fs'),
express = require('express'),
mysql = require("mysql");
var project = require("./project");
var task = require("./task");
var app = express();
var port = process.env.PORT || 1337;
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res) {
  res.sendfile('public/index.html');
});
app.listen(port);
// var connection = mysql.createConnection({
//     host: "stardock.cs.virginia.edu",
//     user: "cs4720eea4ue",
//     password: "spring2014",
//     database: "cs4720eea4ue"
// });

// connection.connect();
// console.log("Connection to DB made.");
// var html=fs.readFileSync("./index.html");
// app.get('/index.html', function(req,res){
// 	res.send
// });
// var server =http.createServer(function (request, response) {
// 	               response.writeHead(200, {"Content-Type": "text/html"});
// 	               // response.write("debugger default");
// 	               response.write(html);
// 	               response.end();
//     // var pathname = url.parse(request.url).pathname;
//     // var url_parts = url.parse(request.url, true); //parse query string
//     // var query = url_parts.query;
//     // var username = pathname.substring(0, pathname.length); 

//     // console.log("Request for " + pathname + " received.");
    
//     // /*
//     //  * URL: /category/action
//     //  */
//     //  var params = pathname.split("/");
//     //  console.log("Params include: " + params);

//     //  var category = params[1];
//     //  var action = params[2];

//     // /*
//     //  * Category Options: Project, Task
//     //  */
//     //  switch(category){
//     // 	/*
//     // 	* Project Options: Add, View
//     // 	*/
//     // 	case "project": 
// 	   //    switch (action){
// 	   //  			//URL: /project/add/[projectTitle]/[username]
// 	   //  			case "add":
// 		  //               var projectTitle = params[3];
// 		  //               var username = params[4];
// 		  //               /* old add title without returning project id
// 		  //               response.writeHead(200, {"Content-Type": "text/plain"});
// 		  //               response.write(project.add(projectTitle));
// 		  //               response.end();
// 		  //               */
// 		  //              project.addTitle(projectTitle, username, function callback(string){
// 	   //                      response.write(""+string);
// 	   //                      response.end();
// 	   //                      });
// 		  //               break;
	
// 	   //              case "delete":
// 		  //               var projectID = params[3];
// 		  //               response.writeHead(200, {"Content-Type": "text/plain"});
// 		  //               response.write(project.deleteProject(projectID));
// 		  //               response.end();
// 		  //               break;
	
// 	   //  			//URL: /project/view/...
// 	   //  			case "view":
// 		  //               var itemToView = params[3];
// 		  //               switch (itemToView){
// 				// 			// URL: /project/view/tasks/[projectID]
// 				// 			// view project tasks by project id
// 		  //   				case "tasks":
// 		  //                     var pid = params[4];
// 			 //                     response.writeHead(200, {"Content-Type": "text/plain"});
// 			 //                     project.viewProjectTasks(pid, function callback(string){
// 			 //                        response.write(""+string);
// 			 //                        response.end();
// 			 //                     });
// 		  //                     break;
		
// 		  //   				// URL: /project/view/details/[username-OPTIONAL]	
// 		  //   				case "details":
// 		  //                     var username ="";
// 		  //                     if (params[4]!=null){
// 		  //                     	username = params[4];
// 		  //                     }
// 			 //                  response.writeHead(200, {"Content-Type": "text/plain"});
// 			 //                  project.view(username, function callback(string){
// 			 //                        response.write(""+string);
// 			 //                        response.end();
// 			 //                    });
// 		  //                     break;
// 		  //                }
// 	   //                break;
// 	   //          }
// 	   //     break;

// 	   //    case "task":
// 	   //      // addTask(pID, tTitle, taskStatus)
// 	   //      // editTask(taskStatus, tID)
// 	   //      // deleteTask(tID)
// 	   //      // assignTask(username, tID)
// 	   //      // viewTasksByUser(username)
// 	   //      // viewTasksByProject(pID)
// 	   //      switch (action) {
// 	   //  			//URL: /task/add/pID/tTitle/taskStatus
// 	   //              case "add":
// 		  //               var projectID = params[3];
// 		  //               var taskTitle = params[4];
// 		  //               var taskStatus = params[5];
// 	   //                  response.writeHead(200, {"Content-Type": "text/plain"});
// 	   //                  response.write(task.addTask(projectID, taskTitle, taskStatus));
// 	   //                  response.end();
// 	   //                  break;
	                    
// 	   //              case "add2":
// 		  //               var projectID = params[3];
// 		  //               var taskTitle = params[4];
// 		  //               var taskStatus = params[5];
// 		  //               console.log("inside add2 ");
// 	   //                  response.writeHead(200, {"Content-Type": "text/plain"});
// 	   //                  response.write(task.addTaskandAssign(projectID, taskTitle, taskStatus));
// 	   //                  response.end();
// 	   //                  break;
	
// 	   //  			//URL: /task/edit/taskStatus/taskID
// 	   //              case "edit":
// 		  //               var taskStatus = params[3];
// 		  //               var taskID = params[4];
// 	   //                  response.writeHead(200, {"Content-Type": "text/plain"});
// 	   //                  response.write(task.editTask(taskStatus, taskID));
// 	   //                  response.end();
// 	   //                  break;
	
// 	   //              //URL: /task/delete/taskID    
// 	   //              case "delete":
// 	   //              	var taskID = params[3];
// 	   //                  response.writeHead(200, {"Content-Type": "text/plain"});
// 	   //                  response.write(task.deleteTask(taskID));
// 	   //                  response.end();
// 	   //                  break;
	                    
// 	   //              //URL: /task/assign/userID/taskID
// 	   //              case "assign":
// 		  //               var userID = params[3];
// 		  //               var taskID = params[4];
// 	   //                  response.writeHead(200, {"Content-Type": "text/plain"});
// 	   //                  response.write(task.assignTask(userID, taskID));
// 	   //                  response.end();
// 	   //                  break;
	
// 	   //              case "view":
	            	
// 	   //                  //URL: /task/view/user/[userID]
// 	   //                  var checkString = params[3];
	
// 	   //                  if (checkString == "user") {
// 	   //                      var userID = params[4];
// 	   //                      task.viewTasksByUser(userID, function callback(string){
// 	   //                      response.write(""+string);
// 	   //                      response.end();
// 	   //                      });
// 	   //                  }
	                    
// 	   //                  // URL: /task/view/project/[projectID]
// 	   //                  else if (checkString == "project") {
// 	   //                      var projectID = params[4];
	                        
// 	   //                      task.viewTasksByProject(projectID, function callback(string){
// 	   //                      response.write(""+string);
// 	   //                      response.end();
// 	   //                      });
// 	   //                  }
// 	   //                  else if (checkString=="projectAll"){
// 	   //                 		var projectID = params[4];
	                        
// 	   //                      task.viewUserTasksByProject(projectID, function callback(string){
// 	   //                      response.write(""+string);
// 	   //                      response.end();
// 	   //                      });
// 	   //                 }
// 	   //                  else {
// 	   //                      console.log("debug: 3rd param was neither /user nor /project.");
// 	   //                  }
// 	   //                  break;
// 	   //                 }
	                   
	                   
	                   
// 	   //      break;
	 

//     //       default:
//     //           console.log("Check parameters: "+params);
// 	//}	
       

// });

console.log("Server running at http://127.0.0.1:1337/");
