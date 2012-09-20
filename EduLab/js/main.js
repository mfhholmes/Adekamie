lesson = {};

var taskListPrefix = "task";
var taskBoxDivPrefix = "task-";
var contentPrefix = "cnt-";
var taskListCompleted = "_complete";

function start(){
	// main starting point for application
	
	//load the lesson data and pass it to the viewmodel
	lesson = new lesson_view_model();
	// need a switch to work out if we're local or server-based
	//$.getJSON("data/persuasive_essay_lesson.json",function(data){lesson.loadData(data);}).error(function(jq,status,errorThrown){alert("bad thing happened to the JSON: " + status + " : " + errorThrown);});
	parseData(lesson_data);
	addSamples();
	addReferenceText();
	try{
	   ko.applyBindings(lesson);
	}
	catch(err){
	    //catch any knockout errors so we can continue binding event handlers and jquery ui properties
	    console.debug(err.message);
	}
	addEventHandlers();
	$(".draggable").draggable();
	$(".resizable").resizable();
	
}
function parseData(data){
	lesson.loadData(data);
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
    $("#search").on("click",doSearch);
    $("#searchValue").on("click",searchClick);
}

function getTaskByRef(ref){
    id= ref.substring(taskListPrefix.length);
    return lesson.getTask(id);
}

function slideMenuList(index){
    var elementId = taskListPrefix + index;
    var subtask = lesson.getTask(index);
    if(subtask.taskListVisible()){
        afterwards = function(){subtask = getTaskByRef(this.id);subtask.taskListVisible(false);};
        $("#"+elementId).slideUp(250,"linear",afterwards);
    }
    else{
        afterwards = function(){subtask = getTaskByRef(this.id);subtask.taskListVisible(true);};
        $("#"+elementId).slideDown(250,"linear",afterwards);        
    }
}
function hideMenuList(){
    var subtask = getTaskByRef(this.id);
    subtask.taskListVisible(false);
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
            openRef(function(){$("#reference").addClass("reference-open").width("");$("#refContainer").width("100%");});
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
function clickLesson(){
    tasklist = $("#tasklist");
    
    if(lesson.lessonVisible())
    {
        tasklist.hide("slide",100,function(){lesson.lessonVisible(false);});
        $("#container").css("left","0").width("100%");
    }else{
        lesson.lessonVisible(true);
        tasklist.show("slide",100);
        $("#container").css("left","25%").width("75%");
    }
}