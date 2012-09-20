/**
 * @author Marcus Holmes
 * @copyright Bright Sparks Labs 2012
 */

/*******************utility***************/
function first(arr){
    for(var itr in arr){
        return arr[itr];
    }
};

var taskPanelPrefix = "taskPanel";
function lesson_view_model() {
    var self = this;
	// properties
	self.tasks = ko.observableArray();
	self.lessonVisible = ko.observable(true);
	self.currentTask = new ko.observable(null);
	self.skillLevels = new ko.observableArray();
	self.selectedSkillLevel = new ko.observable(0);
	
	//behaviours
	self.loadData = function(lessonData){
		// handles loading the data into the model
		
        // skill levels
        for(var i=0;i< lessonData.SkillLevels.length;i++){
            var skill = lessonData.SkillLevels[i];
            skill.index = i;
            skill.self = skill;
            skill.switchSkillLevel = function(){
                lesson.setSelectedSkillLevel(this.index);
                };
            self.skillLevels.push(skill);
        }
        self.selectedSkillLevel(0);
		//iterate the task tree
		this.tasks.removeAll();
		var index_counter = 0;
		classifyTask(lessonData,this.tasks,0);
		// then set up the navigation links (not set up initially to allow for forward links)
		this.tasks()[0]().setupNav();
	};
	self.setSelectedSkillLevel = function(level){
	  console.debug(level);
	  self.selectedSkillLevel(level);  
	};
	self.getTask = function(index){
		test = self.tasks()[index];
		return test();
	};
	self.getTaskByRef = function(ref){
	    for(var i=0;i<self.tasks().length;i++){
	        var task = self.tasks()[i];
	        if(task().reference == ref)
	           return task();
	    }
	    return null;
	};
	
	self.setCurrentTask = function(index){
		if(index <0 || index > self.tasks().length)
			self.currentTask(null);
		else{
		    taskscheck = self.tasks();
		    self.currentTask(taskscheck[index]());
		    self.currentTask().taskPanelOpen();
		}
	};
	self.clearCurrentTask = function(){
	    if(self.currentTask() != null)
	       self.currentTask().taskPanelClose();
		self.currentTask(null);
	};
};

function classifyTask(task, taskArray, indent){
	var newtask;
	if(typeof(task.Type) == "undefined"){
	    var badtask = new ko.observable(new task_unknown(taskArray().length,"unknown"+taskArray().length,"missing type"));
		taskArray().push(badtask);
		return badtask;
	}
	else{
		switch (task.Type.toLowerCase()){
			case "reading":{
				newtask = new task_reading(taskArray().length,task.Reference,task.Title,task.Instruction,task.Navigation);
				break;
			}
			case "writing":{
				newtask = new task_writing(taskArray().length,task.Reference,task.Title,task.Instruction,task.Response,task.Navigation);
				break;
			}
			case "container":{
				newtask = new task_container(taskArray().length,task.Reference,task.Title);
				break;
			}
			case "review":{
			    newtask = new task_review(taskArray().length,task.Reference, task.Title, task.ReviewList, task.Navigation);
			    break;
			}
			default:{
				newtask = new task_unknown(taskArray().length,task.Reference,task.Title);
				break;
			}
		}
	}
	newtask.indent = indent;
	newtask.parent = null;
	newtask.taskListVisible((indent <2))
	newtask.taskBoxVisible(false);
	newtask.editing = new ko.observable(false);
	newkotask = new ko.observable(newtask)
	taskArray().push( newkotask);

	// check for child tasks
	if(typeof(task.Tasks) != "undefined"){
		var newindent = indent +1;
		newtask.hasKids = true;
		for(var i=0;i<task.Tasks.length;i++){
			var child = classifyTask(task.Tasks[i],taskArray,newindent);
			newtask.tasks().push(child);
			child().parent = newtask;
		}
	}
	else{
		newtask.hasKids = false;
	}
	newtask.taskBoxClose = function(){
	    this.taskBoxVisible(false);
	    this.editing(false);
	    };
	    
    return newkotask;
};

/***********************task types********************************/

function task_reading(ind,ref,ttl,instr,nav){
	//data
	var self=this;
	self.index = ind;
	self.reference = ref;
	self.title = ttl;
	self.navigation = ko.observableArray(nav);
	self.complete = ko.observable(false);
	self.taskBoxVisible = ko.observable(false);
	self.taskListVisible= ko.observable(true);
	self.response = "read me!";
	self.skillText = instr;
	self.instruction = ko.computed(function(){
        var curLevel = lesson.selectedSkillLevel();
        var name = lesson.skillLevels()[curLevel].Name;
        var text = self.skillText[name];
        if((text == null ) || (typeof(text) == 'undefined')){
            return self.skillText[0];
        }
        else
        {
            return text;
        }
	    
	});

    //behaviour
    self.setupNav = function(){
        newnav = ko.observableArray();
        for(var i=0;i<self.navigation().length;i++){
            var task = lesson.getTaskByRef(self.navigation()[i].Ref)
            newnav.push(task);
        }
        self.navigation = newnav;
        if(self.hasKids){
            for(var i=0;i < self.tasks().length;i++){
                self.tasks()[i]().setupNav();
            }
        }
    };

	self.accept = function(){
		// always completes
		self.complete(true);
		if(self.parent != null) self.parent.accept();
		lesson.clearCurrentTask();
	};
	self.taskListClick = function(){
		lesson.setCurrentTask(self.index);
	};
	self.taskPanelOpen = function(){
	    //find the task panel
	    panel = $("#taskPanel");
	    container = $("#taskPanelContainer").empty();
	    
	    //add elements
	    container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
	    container.append("<input type='image' class='taskPanelExitIcon' src='./img/exit.jpg' onclick='function(){lesson.clearCurrentTask();}'/>");
	    container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
	    container.append("<input type='image' class='taskPanelAccept' src='./img/accept.png' data-bind='click:accept'/>");
	    container.css("width:"+panel.css("width"));
	    //set the bindings to this task
	    ko.applyBindings(self,panel.get(0));
	    panel.show("slide",250);
	};
	self.taskPanelClose = function(){
		panel = $("#taskPanel");
		panel.hide("slide",250);
	};	
	self.taskBoxClick = function(){
	    // noop: reading tasks shouldn't actually have a taskBox
	};
}

function task_writing(ind, ref, ttl, instr, resp, nav){
	//data
	var self = this;
	self.index = ind;
	self.reference = ref;
	self.title = ttl;
	self.response = new ko.observable(resp);
	self.navigation = new ko.observableArray(nav);
	self.complete = new ko.observable(false);
	self.taskBoxVisible = new ko.observable(false);
	self.taskListVisible= new ko.observable(true);
	self.oldresponse= resp;
    self.skillText = instr;
    self.instruction = ko.computed(function(){
        var curLevel = lesson.selectedSkillLevel();
        var name = lesson.skillLevels()[curLevel].Name;
        var text = self.skillText[name];
        if((text == null ) || (typeof(text) == 'undefined')){
            return self.skillText[0];
        }
        else
        {
            return text;
        }
        
    });

	
    //behaviour
    self.setupNav = function(){
        newnav = ko.observableArray();
        for(var i=0;i<self.navigation().length;i++){
            var task = lesson.getTaskByRef(self.navigation()[i].Ref)
            newnav.push(task);
        }
        self.navigation = newnav;
        if(self.hasKids){
            for(var i=0;i < self.tasks().length;i++){
                self.tasks()[i]().setupNav();
            }
        }
    };

    self.accept = function(){
        if(self.response() != self.oldresponse)
        {
            self.oldresponse = self.response();
            self.complete(true);
        }
        if(self.parent != null) self.parent.accept();
        self.taskBoxVisible(true);
        lesson.clearCurrentTask();
    };
    self.taskListClick = function(){
        lesson.setCurrentTask(self.index);
    };
    self.taskPanelOpen = function(){
        //find the task panel
        var panel = $("#taskPanel");
        var container = $("#taskPanelContainer").empty();
        self.oldresponse = self.response();
        //add elements
        container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
        container.append("<input type='image' class='taskPanelExitIcon' src='./img/exit.jpg' onclick='function(){lesson.clearCurrentTask();}'/>");
        container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
        container.append("<textarea class='taskPanelEntry' data-bind='value:response'></textarea>");
        container.append("<input type='image' class='taskPanelAccept' src='./img/accept.png' data-bind='click:accept'/>");
        container.css("width:"+panel.css("width"));
        //set the bindings to this task
        ko.applyBindings(self,panel.get(0));
        panel.show("slide",250);
    };
    self.taskPanelClose = function(){
        self.response(self.oldresponse);
        panel = $("#taskPanel");
        panel.hide("slide",250);
    };  
    self.taskBoxClick = function(){
        content = $('#taskBox'+self.index);
        if(content.length != 1){
            // problem: not a single taskBox
            console.debug('taskBox selector returned ' + content.length + ' items');
            return;
        }
        editbox = $('#taskBoxEdit' + self.index);
        editbox.height(content.height());
        self.editing(true);
        
    };
}

function task_container(ind,ref,ttl){
	//data
	var self=this;
	self.index = ind;
	self.reference = ref;
	self.title = ttl;
	self.tasks = new ko.observableArray();
	self.response = "";
	self.taskBoxVisible = ko.observable(false);
	self.taskListVisible= ko.observable(true);
	self.complete = ko.observable(false);
	self.navigation = ko.observableArray();
	self.complete = ko.observable(false);
	self.instruction = "***bad instruction***";
	
	//behaviour
	self.setupNav = function(){
        if(self.hasKids){
            for(var i=0;i < self.tasks().length;i++){
                self.tasks()[i]().setupNav();
            }
        }
    };
	self.accept = function(){
	    if(self.hasKids){
	        var allcomplete = true;
	        for(var i=0;i<self.tasks().length;i++){
	            if(!self.tasks()[i]().complete()){
	                allcomplete= false;
	                break;
	            }
	        }
	        self.complete(allcomplete);
	    }
	    if(self.parent != null) self.parent.accept();
		lesson.clearCurrentTask();
		
	};
	self.taskListClick = function(){
		for(var i=0;i<self.tasks().length;i++){
			var tasks = self.tasks();
			var subtask = tasks[i]();
            slideMenuList(subtask.index);
        }
			
	};
	self.taskPanelOpen = function(){
        panel = $("#taskPanel");
        container = $("#taskPanelContainer").empty();
	    
	    //add child task responses
	    container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
	    container.append("<input type='image' class='taskPanelExitIcon' src='./img/exit.jpg' onclick='function(){lesson.clearCurrentTask();}'/>");
	    taskcontainer = $("<div class='taskPanelReviewContainer' data-bind='foreach:tasks'></div>");
	    container.append(taskcontainer);
	    taskcontainer.append("<div class='taskPanelReviewItem' data-bind='text:response'></div>");
	    //set the bindings to this task
	    ko.applyBindings(self,panel.get(0));
	}
	self.taskPanelClose = function(){
        panel = $("#taskPanel");
        panel.hide("slide",250);	    
	};
    self.taskBoxClick = function(){
        
    };
}

function task_review(ind,ref,ttl, revlist, nav){
    //data
    var self=this;
    self.index = ind;
    self.reference = ref;
    self.title = ttl;
    self.tasks = new ko.observableArray();
    self.response = "";
    self.taskBoxVisible = ko.observable(false);
    self.taskListVisible= ko.observable(true);
    self.complete = ko.observable(false);
    self.reviewlist = ko.observableArray(revlist);
    self.navigation = ko.observableArray(nav);
    self.instruction = "***bad instruction***";
    
    self.setupNav = function(){
        newnav = ko.observableArray();
        for(var i=0;i<self.navigation().length;i++){
            var task = lesson.getTaskByRef(self.navigation()[i].Ref)
            newnav.push(task);
        }
        self.navigation = newnav;
        //special one for review list
        newrev = ko.observableArray();
        for(var i=0;i<self.reviewlist().length;i++){
            var task =lesson.getTaskByRef(self.reviewlist()[i]);
            newrev.push(task);
        }
        self.reviewlist = newrev;
        if(self.hasKids){
            for(var i=0;i < self.tasks().length;i++){
                self.tasks()[i]().setupNav();
            }
        }
    };
    self.accept = function(){
        self.complete(true);
        if(self.parent != null) self.parent.accept();
        lesson.clearCurrentTask();
    };
    self.taskListClick = function(){
        lesson.setCurrentTask(self.index);
    };
    self.taskPanelOpen = function(){
        panel = $("#taskPanel");
        container = $("#taskPanelContainer").empty();
        
        //add child task responses
        container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
        container.append("<input type='image' class='taskPanelExitIcon' src='./img/exit.jpg' onclick='function(){lesson.clearCurrentTask();}'/>");
        taskcontainer = $("<div class='taskPanelReviewContainer' data-bind='foreach:reviewlist'></div>");
        container.append(taskcontainer);
        taskcontainer.append("<p class='taskPanelReviewItem' data-bind='text:response'></p>");
        container.append("<input type='image' class='taskPanelAccept' src='./img/accept.png' data-bind='click:accept'/>");
        //set the bindings to this task
        ko.applyBindings(self,panel.get(0));
        panel.show("slide",250);
    }
    self.taskPanelClose = function(){
        panel = $("#taskPanel");
        panel.hide("slide",250);        
    };
    self.taskBoxClick = function(){
        
    };
};

function task_unknown(ind,ref,ttl){
	// data
	var self = this;
	self.index = ind;
	self.reference = ref;
	self.title = ttl; 
	self.instruction = "unknown task";
	self.response="";
	self.taskBoxVisible = ko.observable(false);
	self.taskListVisible= ko.observable(true);
	self.complete = ko.observable(false);
	self.navigation = ko.observableArray();
	// behaviour
	self.setupNav = function(){
        newnav = ko.observableArray();
        for(var i=0;i<self.navigation().length;i++){
            var task = lesson.getTaskByRef(self.navigation()[i].Ref)
            newnav.push(task);
        }
        self.navigation = newnav;
        if(self.hasKids){
            for(var i=0;i < self.tasks().length;i++){
                self.tasks()[i]().setupNav();
            }
        }
    };
	self.accept = function (){
		// always completes
		self.isComplete(true);
		if(self.parent != null) self.parent.accept();
		self.taskPanelClose();
		self.taskBoxVisible(true);
	};
	self.taskListClick = function(){
		self.taskBoxVisible(!self.taskBoxVisible());
	};
	self.taskPanelOpen = function(){
        //find the task panel
        panel = $("#taskPanel");
        container = $("#taskPanelContainer").empty();
        self.oldresponse = self.response();
        //add elements
        container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
        container.append("<input type='image' class='taskPanelExitIcon' src='./img/exit.jpg' onclick='function(){lesson.clearCurrentTask();}'/>");
        container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
        container.append("<textarea class='taskPanelEntry' data-bind='value:response'></textare>");
        container.append("<input type='image' class='taskPanelAccept' src='./img/accept.png' data-bind='click:accept'/>");
        container.css("width:"+panel.css("width"));
        //set the bindings to this task
        ko.applyBindings(self,panel.get(0));
        panel.show("slide",250);
	};
	self.taskPanelClose = function(){
        self.response(self.oldresponse);
        panel = $("#taskPanel");
        panel.hide("slide",250);
	};
    self.taskBoxClick = function(){
        
    };
}