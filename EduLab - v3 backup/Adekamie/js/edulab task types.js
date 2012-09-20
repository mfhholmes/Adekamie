function addFunctions(taskdata)
{
	if(typeof(taskdata.Type) != "undefined")
	{
		var type = taskdata.Type;
		switch(type)
		{
			case "Container":
			{
				taskdata.createPanel = containerCreatePanel;
				taskdata.accept = containerAccept;
				break;
			}
			case "Reading":
			{
				taskdata.createPanel = readingCreatePanel;
				taskdata.accept = readingAccept;
				break;
			}
			case "Writing":
			{
				taskdata.createPanel = writingCreatePanel;
				taskdata.accept = writingAccept;
				break;
			}
			case "Research":
			{
				taskdata.createPanel = readingCreatePanel;
				taskdata.accept = readingAccept;
				break;
			}
			case "Selection":
			{
				taskdata.createPanel = selectionCreatePanel;
				taskdata.accept = selectionAccept;
				break;
			}
			case "ListSelection":
			{
				taskdata.createPanel = listSelectionCreatePanel;
				taskdata.accept = listSelectionAccept;
				break;
			}
			case "Review":
			{
				taskdata.createPanel = reviewCreatePanel;
				taskdata.accept = reviewAccept;
				taskdata.closePanel = reviewClosePanel;
				break;
			}
			case "Submit":
			{
				taskdata.createPanel = submitCreatePanel;
				taskdata.accept = submitAccept;
				break;
			}
			case "DoubleEntry":
			{
				taskdata.createPanel = doubleEntryCreatePanel;
				taskdata.accept = doubleEntryAccept;
				break;
			}
			case "TripleEntry":
			{
				taskdata.createPanel = tripleEntryCreatePanel;
				taskdata.accept = tripleEntryAccept;
				break;
			}
			default:
			{
				taskdata.createPanel = unknownCreatePanel;
				taskdata.accept = unknownAccept;
				break;
			}
		}
		
	}
	if(typeof(taskdata.Tasks) != "undefined")
	{
		var tasks = taskdata.Tasks;
		for(var i=0;i<tasks.length;i++)
		{
			addFunctions(tasks[i]);
		}
	}
}
function addTitle(panel, title)
{
	panel.empty();
	panel.append("<p class='taskPanelTitle'>"+title+"</p>");
}
function addNavigation(panel, task)
{
	//navigation
	if(typeof(task.Navigation) != 'undefined')
	{
		for(var i=0; i<task.Navigation.length;i++)
		{
			nav = task.Navigation[i];
			navtext = '"'+nav.Ref+'"';
			panel.append("<button type='button' class='taskNavigationButton' onclick='navigate("+navtext+");'>" + nav.Label + "</button>");
		}
	}
}
function addAccept(panel, task)
{
	panel.append("<input type='image' class='acceptButton' src='./images/accept.png' value='Accept'></input>");
	$(".acceptButton").on("click",{"task":task},task.accept);
}
function containerCreatePanel()
{
	// do nothing
}
function containerAccept()
{
	// do nothing - this never gets called
}
function writingCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append(this.Instruction);
	panel.append("<textarea id='response' class='writingTaskInput' >" + this.Response + "</textarea>");
	taskref = '"'+this.Reference+'"';
	this.Original = this.Response;
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function writingAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;
	response = $("#response").val();
	if(task.Original != response)
	{
		task.Response = response;
		task.complete = true;
		createTaskBox(task);
		checkChildrenComplete(task.Parent);
		flagComplete(task);
	}
	closePanel();
}
function readingCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append(this.Instruction);
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function readingAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;

	task.complete = true;
	checkChildrenComplete(task.Parent);
	flagComplete(task);
	task.closePanel();
}
function researchCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append("<p class='researchTaskInstruction'>"+this.Instruction +"</p>");
	panel.append("<p>not supported in code yet</p>");
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function researchAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;

	task.complete = true;
	checkChildrenComplete(task.Parent);
	flagComplete(task);
	// need to work out what kind of task box we need for this
	closePanel();
}
function reviewCreatePanel()
{
	// not creating the standard task panel, but a review panel that occupies the screen
	$("body").append("<div id='reviewPanel' style='display:none'></div>");
	panel = $("#reviewPanel");
	panel.append("<h2>"+ this.Title + "</h2>");
	if(typeof(this.Instruction) != "undefined")
		panel.append("<p class='reviewTaskInstruction'>" + this.Instruction +"</p>");
	panel.append("<input type='image' id='reviewExit' class='exitIcon' src='./images/exit.jpg'></input>");
	$("#reviewExit").on("click",this.closePanel);
	
	for(var i=0;i<this.ReviewList.length;i++)
	{
		var reviewTaskName = this.ReviewList[i];
		var reviewTask = getTaskByRef(reviewTaskName);
		if(typeof(reviewTask) != "undefined")
		{
			panel.append("<p class='reviewTaskBody' id='rt"+reviewTask.Reference+"'>"+reviewTask.Response+"</p>");
			$("#rt"+reviewTask.Reference).on("click", reviewClick);
		}
	}
	addAccept(panel, this);
	panel.fadeIn(500, "linear");
}
function reviewAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
	{
		// just a navigation Accept 
		task = this;
	}
	else
	{
		// user pressed Accept, so we mark this as complete
		task = event.data.task;
		task.complete = true;
		task.complete = true;
		checkChildrenComplete(task.Parent);
		flagComplete(task);
	}
	task.closePanel();

}
function reviewClosePanel()
{
	$("#reviewPanel").fadeOut(500,"linear",function(){$("#reviewPanel").remove();});
	updateTasks();
}
function reviewClick(event)
{
	var element = $(event.target);
	var taskref = element.attr("id").substring(2);
	var task = getTaskByRef(taskref);
	element.after("<input type='button' class='editAccept' id='rea"+taskref+"' value='OK'/>");
	$('#rea'+taskref).on("click",reviewEditAccept);
	element.after("<textarea class='reviewEdit' id='re" + taskref + "'>"+task.Response + "</textarea>");
	var editarea = $("#re"+taskref);
	editarea.height(element.height());
	//editarea.height("5em");
	element.hide();
	
}
function reviewEditAccept(event)
{
	var element = $(event.target);
	var taskref = element.attr("id").substring(3);
	var task = getTaskByRef(taskref);
	var editelement = $("#re" + taskref);
	var paraelement = $("#rt" + taskref);
	
	task.Response = editelement.val();
	paraelement.text(task.Response);
	element.remove();
	editelement.remove();
	paraelement.show();
}
function submitCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append("<p class='submitTaskInstruction'>" + this.Instruction + "</p>");
	panel.append("<p> not supported in code yet</p>");
	//addNavigation(panel, this);
	addAccept(panel,this);
	openPanel();
}
function submitAccept()
{
	alert("lesson submitted");
}
function selectionCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append("<p class='selectionTaskInstruction'>"+this.Instruction+"</p>");
	for(var i=0;i<this.Choices.length;i++)
	{
		panel.append("<input type='radio' id='choice"+ i +"' class='selectionTaskChoice' value='" + (this.Response==this.Choices[i]?"true":"false")+"'>" + this.Choices[i] + "</input>");
	}
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function selectionAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;

	task.Response = "1";
	task.complete = true;
	checkChildrenComplete(task.Parent);
	flagComplete(task);
	createTaskBox(task);
	closePanel();
}
function listSelectionCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append("<div class='listSelectionTaskList' id='selectionList'/>");
	var list = $("#selectionList");
	if(typeof(this.Choices) != "undefined")
	{
		for(var i=0;i<this.Choices.length;i++)
		{
			list.append("<p class='listSelectionMember'>" + this.Choices[i] + "</p>");
		}
		$(".listSelectionMember").on("click",function(){$("#listSelection").val($(this).text());});
	}
	else
	{
		list.append("<p>No choices specified</p>");
	}
	panel.append("<p class='listSelectionInstruction'>" + this.Instruction + "</p>");
	panel.append("<textarea class='listSelection' id='listSelection' value='" + this.Response + "'/>");
	addAccept(panel, this);
	openPanel();
}

function listSelectionAccept()
{
}
function doubleEntryCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	panel.append("<p class='doublewritingInstruction1'>" + this.Instruction1 + "</p>");
	panel.append("<textarea id='response1' class='doublewritingTaskInput1' >" + this.Response1 + "</textarea>");
	panel.append("<p class='doublewritingInstruction2'>" + this.Instruction2+"</p>");
	panel.append("<textarea id='response1' class='doublewritingTaskInput2' >" + this.Response2 + "</textarea>");
	taskref = '"'+this.Reference+'"';
	this.Original = this.Response1 + this.Response2;
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function doubleEntryAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;

	response1 = $("#response1").val();
	response2 = $("#response2").val();
	if(task.Original != (response1 + response2))
	{
		task.Response1 = response1;
		task.Response2 = response2;
		task.Response = response1 + response2;
		task.complete = true;
		createTaskBox(task);
		checkChildrenComplete(task.Parent);
		flagComplete(task);
	}
	closePanel();
}
function tripleEntryCreatePanel()
{
	panel=$('#taskpanelContainer');
	addTitle(panel,this.Title);
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function tripleEntryAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;

	task.complete = true;
	checkChildrenComplete(task.Parent);
	flagComplete(task);
	createTaskBox(task);
	closePanel();
}
function unknownCreatePanel()
{
	panel.append("<p class='unknownTask'>unknown task " + task.Type + " in task " + task.Reference + "</p>");
	//addNavigation(panel, this);
	addAccept(panel, this);
	openPanel();
}
function unknownAccept(event)
{
	var task;
	if(typeof(event) == "undefined")
		task = this;
	else
		task = event.data.task;

	task.complete = true;
	closePanel();
}