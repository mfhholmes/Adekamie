lessontasks= "";
var currenttask;
var nexttask = {};

function loadTasks(lessondata)
{
	//set the parent values
	addParent(lessondata);
	lessondata.Parent = "Root";
	//add the functions
	addFunctions(lessondata);
	loadTask(lessondata,0);
	// remember the lesson tasks for later
	lessontasks = lessondata;
}
function addParent(tasklist)
{
	if(typeof(tasklist.Tasks) != "undefined")
	{
		for(var i=0;i < tasklist.Tasks.length;i++)
		{
			tasklist.Tasks[i].Parent = tasklist;
			addParent(tasklist.Tasks[i]);
		}
	}
}
function loadTask(localtask, indent)
{
	createTask(localtask, indent);
	if(typeof(localtask.Tasks) != "undefined")
	{
		// iterate the tasks and create each one
		for(var i=0;i<localtask.Tasks.length;i++)
		{
			var task = localtask.Tasks[i];
			// create a task <li> in the tasklist for this task		
			loadTask(task, indent + 1)
		}
	}
}
function navigate(taskName)
{
	//accept the current task first
	if((typeof(currenttask) != "undefined") && (currenttask != null))
	{
		currenttask.accept();
	}
	// then find the new current task
	var task = getTaskByRef(taskName);
	if(task == null)
		return;
	else
		currenttask = task;
	// special rules if it' a container - open or close the task menu
	if(task.Type == "Container")
	{
		currentlyOpen = task.menuOpen;
		if(currentlyOpen)
		{
			// close it
			closeMenu(task);
		}
		else
		{
			// open it
			openMenu(task);
		}
		//and close the panel
		closePanel();
	}
	else
	{
		//set the fly panel up for this task
		// jQuery sets the 'this' context to the html element being animated, which is not what we need
		// so remember the next panel to open and call that outside jQuery
		nexttask = task;
		closePanel(openNextPanel);
		//check if the container menu for this task is open
		if(!task.Parent.menuOpen)
		{
			openMenu(task.Parent);
		}
	}
}
function openNextPanel()
{
	nexttask.createPanel();
}
function openMenu(task)
{
	//check if we've got a parent
	if(task.Parent != "Root")
	{
		// open the grandparent too then
		if(!task.Parent.menuOpen)
			openMenu(task.Parent);
	}
	// then open the child menus
	if(typeof(task.Tasks) != "undefined")
	{
		for(var i=0;i<task.Tasks.length;i++)
		{
			openMenuTask(task.Tasks[i]);
		}
	}
	task.menuOpen = true;
}
function closeMenu(task)
{
	if(typeof(task.Tasks) != "undefined" && task.menuOpen)
	{
		//rip through the task list and close all child tasks
		for(var i=0;i<task.Tasks.length;i++)
		{
			closeChildMenus(task.Tasks[i]);
			closeMenuTask(task.Tasks[i]);
		}
	}
	task.menuOpen = false;
}
function closeChildMenus(parentTask)
{
	if(typeof(parentTask.Tasks) != "undefined")
	{
		if(parentTask.menuOpen)
		{
			for(var i=0; i<parentTask.Tasks.length;i++)
			{
				closeMenuTask(parentTask.Tasks[i]);
				closeChildMenus(parentTask.Tasks[i]);
			}
		}
	}
	parentTask.menuOpen=false;
}

function checkChildrenComplete(task)
{
	if(typeof(task.Tasks) != "undefined")
	{
		var allcomplete = true;
		for(var i=0;i<task.Tasks.length;i++)
		{
			if(!task.Tasks[i].complete)
			{
				allcomplete = false;
				break;
			}
		}
		task.complete = allcomplete;
		flagComplete(task);
	}
}
function getTaskByRef(taskref)
{
	return getSubTaskByRef(taskref, lessontasks);
}
function getSubTaskByRef(taskname, task)
{	
	if(task.Reference == taskname)
		return task;
	if(typeof(task.Tasks) != "undefined")
	{
		for(var i=0;i<task.Tasks.length;i++)
		{
			var subtask = getSubTaskByRef(taskname, task.Tasks[i]);
			if(typeof(subtask) != "undefined")
				return subtask;
		}
	}
	return;
}
function killCurrentTask()
{
	currenttask = null;
}
