var taskListPrefix = "tasklist-";
var taskOutputDivPrefix = "task-";
var contentPrefix = "cnt-";
var taskListCompleted = "_complete";


function start()
{
	// clear out any design-time crap from the container and task list
	$("#container").empty();
	$("#taskList").empty();
	// load the lesson items into the container and task list
	loadTasks(lesson);
	addReferenceText();
	addSamples();
	addEventHandlers();
}
function addEventHandlers()
{
	$("#Lesson").on("click",clickLesson);
	$("#Practice").on("click",clickLesson);
	$("#Reference").on("click",clickRef);
	$("#Settings").on("click",clickSettings);
	$("#Samples").on("click",clickSamples);
	$("#Save").on("click",clickSave);
	$("#Exit").on("click",clickExit);
	$("#taskExit").on("click",closePanel);
}
function openPanel()
{
	// pretty simple, animate the width up to an appropriate value
	targetwidth=$("body").innerWidth()*0.35;
	$('#taskpanelContainer').width(targetwidth);
	$('#taskpanel').show();
	$('#taskpanel').animate({"width":targetwidth},250,function(){$("#taskpanel").addClass("taskpanel-open").width("");$("#taskpanelContainer").width("100%");});
	$('#taskpanel').data("panelStatus","open");
}
function closePanel(afterwards)
{
	updateTasks();
	killCurrentTask();
	//animate the close panel sequence, and call afterwards when done
	targetwidth=$("body").innerWidth()*0.35;
	$("#taskpanelContainer").width(targetwidth);
	if(typeof(afterwards)=="function")
		$('#taskpanel').animate({"width":0},250,"swing",afterwards);
	else
		$('#taskpanel').animate({"width":0},250,"swing",function(){$("#taskpanel").hide().removeClass("taskpanel-open");});
	$('#taskpanel').data("panelStatus","closed");
}
function clickContent(thisContent)
{
	thisid=thisContent.id;
	thisname = thisid.substring(contentPrefix.length);
	navigate(thisname);
}
function clickLesson()
{
	tasklist = $("#tasklist");
	if(tasklist.data("panelStatus") == "closed")
	{
		tasklist.show("slide",100);
		$("#container").css("left","25%").width("75%");
		tasklist.data("panelStatus","open");
	}
	else
	{
		tasklist.hide("slide",100);
		$("#container").css("left","0").width("100%");
		tasklist.data("panelStatus","closed");
		if($('#taskpanel').data("panelStatus") =="open")
			closePanel();
	}
}
function clickRef()
{
	reference = $("#reference");
	if(reference.data("status") == "open")
	{
		closeRef(function(){$("#reference").removeClass("reference-open").hide();});
	}
	else
	{
		if($("#samples").data("status") == "open")
			closeSamples(openRef(function(){$("#samples").hide();$("#reference").addClass("reference-open").css("width","");$("#refContainer").width("100%");;}));
		else
			openRef(function(){$("#reference").addClass("reference-open").width("");$("#refContainer").width("100%");;});
	}
}
function openRef(afterwards)
{
	reference = $("#reference");
	targetWidth = $("body").innerWidth() *0.35;
	$("#refContainer").width(targetWidth);
	reference.show();
	if(typeof(afterwards) == "undefined")
		reference.animate({width:targetWidth + "px"},250,"linear");
	else
		reference.animate({width:targetWidth + "px"},250,"linear",afterwards);
	reference.data("status","open");
}
function closeRef(afterwards)
{
	reference = $("#reference");
	if(typeof(afterwards) == "undefined")
		reference.animate({width:"0"},250,"linear",function(){$("#reference").removeClass("reference-open").hide();});
	else
		reference.animate({width:"0"},250,"linear",afterwards);
	reference.data("status","closed");
	
}
function clickSamples()
{
	samples = $("#samples");
	if(samples.data("status") == "open")
	{
		closeSamples(function(){$("#samples").hide().removeClass("samples-open");});
	}
	else
	{
		if($("#reference").data("status")=="open")
			closeRef(openSamples(function(){$("#reference").hide();$("#samples").width("").addClass("samples-open");$("#samplesContainer").width("100%");}));
		else
			openSamples(function(){$("#samples").css("width","").addClass("samples-open");$("#samplesContainer").width("100%");});
	}

}
function openSamples(afterwards)
{
	samples = $("#samples");
	targetWidth = $("body").innerWidth() *0.35;
	$("#samplesContainer").width(targetWidth);
	samples.show();
	if(typeof(afterwards) == "undefined")
		samples.animate({width:targetWidth + "px"},250,"linear");
	else
		samples.animate({width:targetWidth + "px"},250,"linear",afterwards);
	samples.data("status","open");

}
function closeSamples(afterwards)
{
	samples = $("#samples");
	if(typeof(afterwards) == "undefined")
		samples.animate({width:"0"},250,"linear",function(){$("#samples").hide();});
	else
		samples.animate({width:"0"},250,"linear",afterwards);
	samples.data("status","closed");

}
function clickSettings()
{
	alert("Settings");
}
function clickSave()
{
	alert("Save");
}
function clickExit()
{
	window.location.href="./index.html";
}
function updateTaskList(task)
{
	// set menu open
	if((task.Parent.Reference == "Root")||(task.Reference=="Root"))
	{
		openMenuTask(task);
	}
	else
	{
		if(task.Parent.menuOpen)
		{
			openMenuTask(task);
		}
		else
		{
			closeMenuTask(task);
		}
	}
}
function flagComplete(task)
{
	//set completed
	tlcomplete = $("#" + task.Reference + taskListCompleted);
	if(task.complete)
	{
		tlcomplete.show();
	}
	else
	{
		tlcomplete.hide();
	}

}
function createTask(task, indent)
{
	// if this is the root task, use the title as the lesson title
	if(task.Reference == "Root")
	{
		$(".lessonHeader").text(task.Title);
	}
	tasklist = $("#tasklist");
	taskitem=taskListPrefix + task.Reference;
	tasklist.append("<li id='"+taskitem +"' class='taskListItem indent"+indent+"'><img id='"+task.Reference + taskListCompleted+"' class='taskListComplete' src='./images/complete.png'/>" + task.Title + "</li>");
	newitem = $("#"+taskitem);
	newitem.click(taskListItemClicked);
	flagComplete(task);
	updateTaskList(task);
}
function taskListItemClicked()
{
	//find which task item this list item refers to
	id = this.id;
	id= id.substring(taskListPrefix.length);
	navigate(id);
}
function createTaskBox(task)
{
	// check if we've got an existing taskbox for this task
	taskboxname = taskOutputDivPrefix + task.Reference;
	taskbox = $('#'+taskboxname);
	if(taskbox.length == 0)
	{
		// doesn't exist so create it
		$("#container").append("<div id='"+taskboxname+"' class='task'></div>");
		taskbox = $('#'+taskboxname);
		tasktitle = $("<p class='taskboxTitle'>" + task.Title + "</p>");
		taskbox.append(tasktitle);
		taskcontent = $("<p class='taskboxContent' id='"+contentPrefix+task.Reference+"'>"+task.Response+"</p>");
		taskbox.append(taskcontent);
		taskcontent.click(function(){clickContent(this);});
		taskExit = $("<input type='image' id='taskBoxExit' class='taskBoxExitIcon' src='./images/exit.jpg'></input>");
		taskExit.on("click",function(){$(this).parent().remove();});
		taskbox.append(taskExit);
		taskbox.draggable();
		taskbox.resizable();
	}
	else
	{
		taskbox.children(".taskboxTitle").text(task.Title);
		taskbox.children(".taskboxContent").text(task.Response);
	}

}
function closeMenuTask(task)
{
	taskname= taskListPrefix + task.Reference;
	taskitem = $("#" + taskname);
	taskitem.hide("blind",{},250);
}
function openMenuTask(task)
{
	taskname=taskListPrefix + task.Reference;
	taskitem = $("#" + taskname);
	taskitem.show("blind",{},500);
}
function updateTasks()
{
	// iterate the list of open tasks
	$(".task").each(function(){
		var taskref = this.id.substring(taskOutputDivPrefix.length);
		var task = getTaskByRef(taskref);
		var output = $("#" + contentPrefix + taskref);
		output.text(task.Response);
	});
}
