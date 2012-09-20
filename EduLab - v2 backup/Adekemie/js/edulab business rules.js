var taskListPrefix = "tasklist-";
var taskDivPrefix = "task-";

function loadTasks(lessondata)
{
	// lessondata contains the task list loaded from the json file
	var container = $("#container");
	var tasklist = $("#tasklist");
	// set the header to the lesson name
	var header = $(".lessonHeader");
	header.text(lesson.Name);
	// then iterate the tasks
	for(var i=0;i<lessondata.Tasks.length;i++)
	{
		var task = lessondata.Tasks[i];
		// create a task <li> in the tasklist for this task
		tasklist.append("<li id='"+taskListPrefix  +task.Reference +"' class='taskListItem'>" + task.Title + "</li>");
		// and create a task <div> in the container space for this task
		createTaskDiv(task, container);
	}
	// add event handlers
	$(".taskListItem").click(taskListItemClicked);
}
function createTaskDiv(task, container)
{
	//task is the task object, container is the jquery selection for the container
	//the content created varies by task type
	content = "<p class='taskTitle'>"+task.Title+"</p>";
	// default height and width
	height = "50px";
	width = "50px";
	switch(task.Type)
	{
		case "Reading":
		{
			content += task.Instruction;
			// stick with default height and width
			break;
		}
		case "Writing":
		{
			content += "<p class='writingTaskInstruction'>" + task.Instruction + "</p>";
			content += "<input type='text' class='writingTaskInput' text='" + task.Response + "'></input>";
			height = "100px";
			width = "250px";
			break;
		}
		case "Selection":
		{
			content += "<p class='selectionTaskInstruction'>" + task.Instruction + "</p>";
			for(var i=0;i<task.Choices.length;i++)
			{
				content += "<input type='select' class='selectionTaskChoice'>" + task.Choices[i].Label + "</input>";
			}
			height="100px";
			width="250px";
			break;
		}
		case "Research":
		{
			content +="<p class='researchTaskInstruction'>" + task.Instruction + "</p>";
			content +="<div class='researchTaskContent'>research goes here when we've worked out how to enable cut-and-paste of links</div>";
			break;
		}
		case "Review":
		{
			content += "<p class='reviewTaskInstruction'<" + task.Instruction + "</p>";
			content += "<div class='reviewTaskBody' tasks='" + task.ReviewList+"' ></div>";
			// rest is done when it's selected
			//default size
			break;
		}
		case "Submit":
		{
			content += "<p class='submitTaskMessage'>demo does not support submission of completed lessons at this point</p>"
			break;
		}
		default:
		{
			content +="<p class='unknownTask'>Unknown Task Type: " + task.Type + "</p><p class='unknownTask'>Reference: " + task.Reference + "</p>";
			break
		}
	}
	// add navigation links (buttons for now)
	if(typeof task.Navigation != "undefined")
	{
		for(var i=0;i<task.Navigation.length;i++)
		{
			var nav = task.Navigation[i];
			var clickref =  'clickTask($("#'+taskDivPrefix+nav.Ref+'"))';
			clickref = "onclick='"+clickref + ";event.cancelBubble=true;'";
			content+="<button type='button' class='taskNavigationButton' "+clickref+">"+nav.Label+"</button>";
		}
	}
	// removing height and width setting because it's messing with the masonry handling
	//container.append("<div id='task-" + task.Reference + "' class='task' style='height:" + height +";width:"+width+";'>"+content+"</div>");
	container.append("<div id='"+taskDivPrefix + task.Reference + "' class='task stdWidth'>"+content+"</div>");
}
function taskListItemClicked()
{
	//find which task item this list item refers to, and click on that.
	id = this.id;
	id= taskDivPrefix + id.substring(taskListPrefix.length);
	$("#"+id).click();
}