/**
 * @author Marcus Holmes
 * @copyright Bright Sparks Labs 2012
 */
/*
var taskListPrefix = "task";
var taskBoxDivPrefix = "task-";
var contentPrefix = "cnt-";
var taskListCompleted = "_complete";

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
function getTaskByRef(ref){
	id = this.id;
	id= id.substring(taskListPrefix.length);
	return lesson.getTask(id);
}

function slideMenuList(index){
	var id = taskListPrefix + index;
	afterwards = function(){subtask = getTaskByRef(this.id);subtask};
	$("#"+id).slideUp(250,"linear",afterwards);
}
function hideMenuList(){
	var subtask = getTaskByRef(this.id);
	subtask.taskListVisible(false);
}
*/