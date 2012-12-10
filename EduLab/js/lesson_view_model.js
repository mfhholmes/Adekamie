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
	self.tasks = new ko.observableArray();
	self.lessonVisible = new ko.observable(true);
	self.currentTask = new ko.observable(null);
	self.skillLevels = new ko.observableArray();
	self.selectedSkillLevel = new ko.observable(0);
	self.hintsVisible = new ko.observable(false);
	self.lightHints = new ko.observable(false);
	self.rawData = {};
	//behaviours
	self.loadData = function(lessonData){
		// handles loading the data into the model
		self.rawData = lessonData;
                self.samplesFile = lessonData.SamplesFile;
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
	self.toJSON = function(){
        var json = "";
        json += "{";
        json += '"Lesson":"Skilled Lesson",';
        if(typeof(self.skillLevels) != 'undefined'){
            json+=',"SkillLevels":[';
            $.each(self.skillLevels(),function(key,value){json += '{"Name":"' + value.Name + '","Image":"' + value.Image + '"},';});
            json = json.substring(0,json.length-1) + ']';
        }
        $.each(self.tasks(),function(key,value){json = value().toJSON(json)+",";});
        json=json.substring(0,json.length-1)+ "}";
        return json;  
	}
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
			case "flexcontainer":{
                newtask = new task_flex_container(taskArray().length,task.Reference,task.Title, task.Instruction, task.TaskTypes);
                break;			   
			}
			case "selection":{
			    newtask =new task_selection(taskArray().length, task.Reference, task.Title, task.Instruction, task.Response, task.Choices, task.Navigation);
			    break;
			}
			case "flyoutselection":{
                newtask =new task_flyOutSelection(taskArray().length, task.Reference, task.Title, task.Instruction, task.Response, task.Choices, task.Navigation);
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
	newtask.Hints = task.Hints;
	newtask.indent = indent;
	newtask.parentTask = null;
	newtask.taskListVisible((indent <2))
	newtask.taskBoxVisible= new ko.observable(false);
	newtask.editing = new ko.observable(false);
	newtask.editing.subscribe(function(newvalue){
       if(!newvalue){
           newtask.accept();
       } 
    });
    newtask.reviewing = new ko.observable(false);
	var newkotask = new ko.observable(newtask)
	taskArray().push( newkotask);
	/*
    newtask.taskBoxVisible.subscribe(function(newvalue){
        if(newvalue)
        {
            box =$("#taskMain" + newtask.index); 
            box.fadeIn(250);
        }
        else
        {
            $("#taskMain" + newtask.index).fadeOut(250);
        }
    });*/
	// check for child tasks
	if(typeof(task.Tasks) != "undefined"){
		var newindent = indent +1;
		newtask.hasKids = true;
		for(var i=0;i<task.Tasks.length;i++){
			var child = classifyTask(task.Tasks[i],taskArray,newindent);
			newtask.tasks().push(child);
			child().parentTask = newtask;
		}
	}
	else{
		newtask.hasKids = false;
	}
	newtask.taskBoxClose = function(){
	    newtask.taskBoxVisible(false);
	    newtask.editing(false);
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
		if(self.parentTask != null) self.parentTask.accept();
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
	    container.append("<img class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
	    container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
	    container.append("<input type='button' value='Understood' class='taskPanelAccept' data-bind='click:accept'/>");
	    panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
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
    self.reviewClick = function(){
    //    self.reviewing(true);
    }
	self.toJSON = function(jsonValues){
	    var json = jsonValues;
	    json += "{";
	    json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Reading",';
        json += '"Title": "'+ self.title + '",';
        json +='"Instruction":' + JSON.stringify(self.skillText)+'';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        //json +='"Navigation":' + JSON.stringify(self.navigation());
	    json += "}";
	    return json;
	}
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
            self.complete.valueHasMutated();
        }
        if(self.parentTask != null) self.parentTask.accept();
        self.taskBoxVisible(true);
        lesson.clearCurrentTask();
        checkForHints(self,"onComplete");
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
        container.append("<img class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
        container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
        container.append("<textarea class='taskPanelEntry' data-bind='value:response'></textarea>");
        container.append("<input type='button' value='Post' class='taskPanelAccept' data-bind='click:accept'/>");
        panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
        container.css("width:"+panel.css("width"));
        //set the bindings to this task
        ko.applyBindings(self,panel.get(0));
        panel.show("slide",250);
        checkForHints(self,"onEdit");
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
    self.reviewClick = function(){
        self.reviewing(true);
    }
    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Writing",';
        json += '"Title": "'+ self.title + '",';
        json += '"Response":"' + self.response() + '",';
        json +='"Instruction":' + JSON.stringify(self.skillText)+'';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
}
function task_selection(ind, ref, ttl, instr, resp, choices, nav){
    //data
    var self = this;
    self.index = ind;
    self.reference = ref;
    self.title = ttl;
    self.choices = new ko.observableArray(choices);
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
        } else {
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
            self.complete.valueHasMutated();
        }
        if(self.parentTask != null) self.parentTask.accept();
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
        container.append("<img class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
        container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
        container.append("<!-- ko foreach: choices-->");
        radioDataBind='value:$data,checked:$parent.response,attr:{"id":"selectChoice"+$index()}';
        labelDataBind = 'text:$data,attr:{"for":"selectChoice"+$index()}';
        flyOutChoices.append("<p class='flyOutChoice' ><input type='radio' name='selectChoices' data-bind='"+radioDataBind+"'/><label data-bind='"+labelDataBind+"'/></p>");
        container.append("<!-- /ko -->");
        container.append("<input type='button' value='Post' class='taskPanelAccept' data-bind='click:accept'/>");
        panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
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
        /*
        content = $('#taskBox'+self.index);
        if(content.length != 1){
            // problem: not a single taskBox
            console.debug('taskBox selector returned ' + content.length + ' items');
            return;
        }
        editbox = $('#taskBoxEdit' + self.index);
        editbox.height(content.height());
        self.editing(true);
        */
       // no editing from the task box
    };
    self.reviewClick = function(){
        //self.reviewing(true);
    }
    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Selection",';
        json += '"Title": "'+ self.title + '",';
        json += '"Response":"' + self.response() + '",';
        json += '"Choices":'+ JSON.stringify(self.choices()) + ",";
        json +='"Instruction":' + JSON.stringify(self.skillText)+'';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';

        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
}
function task_flyOutSelection(ind, ref, ttl, instr, resp, choices, nav){
    //data
    var self = this;
    self.index = ind;
    self.reference = ref;
    self.title = ttl;
    self.choices = new ko.observableArray(choices);
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
        } else {
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
            self.complete.valueHasMutated();
        }
        if(self.parentTask != null) self.parentTask.accept();
        self.taskBoxVisible(true);
        lesson.clearCurrentTask();
        checkForHints(self,"onComplete");
    };
    self.taskListClick = function(){
        lesson.setCurrentTask(self.index);
    };
    self.taskPanelOpen = function(){
        //find the task panel
        var panel = $("#taskPanel");
        // add the special class for this task
        panel.attr("class","flyOutPanel");
        var container = $("#taskPanelContainer").empty();
        self.oldresponse = self.response();
        //add elements
        container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
        container.append("<img class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
        container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
        container.append("<textarea class='taskPanelEntry' data-bind='value:response'></textarea>");
        container.append("<input type='button' class='flyOutButton' value='See More Options' data-bind='click:flyOut'/>");
        container.append("<input type='button' value='Post' class='taskPanelAccept' data-bind='click:accept'/>");
        flyOutChoices = $("<div id='flyOutChoices' class='flyOutSelectChoicesContainer flyOutClosed' data-bind='foreach:choices'/>").appendTo("body").data("status","closed");
        radioDataBind='value:$data,checked:$parent.response,attr:{"id":"selectChoice"+$index()}';
        labelDataBind = 'text:$data,attr:{"for":"selectChoice"+$index()}';
        flyOutChoices.append("<p class='flyOutChoice' ><input type='radio' name='selectChoices' data-bind='"+radioDataBind+"'/><label data-bind='"+labelDataBind+"'/></p>");
        panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
        container.css("width:"+panel.css("width"));
        //set the bindings to this task
        ko.applyBindings(self,panel.get(0));
        ko.applyBindings(self,flyOutChoices.get(0));
        panel.show("slide",250);
        checkForHints(self,"onEdit");
    };
    self.flyOut = function(){
        flyOut = $("#flyOutChoices");
        if(flyOutChoices.data("status")=="closed"){
            flyOut.removeClass("flyOutClosed").addClass("flyOutOpen").data("status","open");
        } else {
            flyOut.removeClass("flyOutOpen").addClass("flyOutClosed").data("status","closed");
        }
    };
    self.taskPanelClose = function(){
        self.response(self.oldresponse);
        $("#flyOutChoices").remove();
        panel = $("#taskPanel");
        panel.attr("class","taskPanel");
        panel.hide("slide",250);
    };  
    self.taskBoxClick = function(){        
        content = $('#taskBox'+self.index).first();
        editbox = $('#taskBoxEdit' + self.index);
        editbox.height(content.height());
        self.editing(true);
    };
    self.reviewClick = function(){
        self.reviewing(true);
    }

    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"flyOutSelection",';
        json += '"Title": "'+ self.title + '",';
        json += '"Response":"' + self.response() + '",';
        json += '"Choices":'+ JSON.stringify(self.choices()) + ",";
        json +='"Instruction":' + JSON.stringify(self.skillText)+'';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';

        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
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
	        //console.debug("-------");
	        for(var i=0;i<self.tasks().length;i++){
	            //console.debug(self.tasks()[i]().title + " : " + self.tasks()[i]().complete());
	            if(!self.tasks()[i]().complete()){
	                allcomplete= false;
	                break;
	            }
	        }
	        self.complete(allcomplete);
	        self.complete.valueHasMutated();
	        //console.debug(self.complete());
	    }
	    if(self.parentTask != null) self.parentTask.accept();
		lesson.clearCurrentTask();
		
	};
	self.taskListClick = function(){
		for(var i=0;i<self.tasks().length;i++){
			var tasks = self.tasks();
			var subtask = tasks[i]();
            slideMenuList(subtask.index);
            //console.debug(subtask.title, subtask, subtask.parentTask);
        }
        
			
	};
	self.taskPanelOpen = function(){
        panel = $("#taskPanel");
        container = $("#taskPanelContainer").empty();
	    
	    //add child task responses
	    container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
	    container.append("<input type='image' class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
	    taskcontainer = $("<div class='taskPanelReviewContainer' data-bind='foreach:tasks'></div>");
	    container.append(taskcontainer);
	    taskcontainer.append("<div class='taskPanelReviewItem' data-bind='text:response'></div>");
	    panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
	    //set the bindings to this task
	    ko.applyBindings(self,panel.get(0));
	}
	self.taskPanelClose = function(){
        panel = $("#taskPanel");
        panel.hide("slide",250);	    
	};
    self.taskBoxClick = function(){
        
    };
    self.reviewClick = function(){
        //self.reviewing(true);
    }

    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Container",';
        json += '"Title": "'+ self.title + '"';
        if(typeof(self.skillLevels) != 'undefined'){
            json+=',"SkillLevels":' + JSON.stringify(self.skillLevels());
        }
        json += ',"Tasks":[';
        $.each(self.tasks(),function(key,value){json = value().toJSON(json)+",";});
        /*for(var i=0;i<self.tasks().length;i++){
            json = self.tasks()[i]().toJSON(json);
        }*/
        json=json.substring(0,json.length-1)+ "]}";
        return json;
    }
}
function task_flex_container(ind,ref,ttl, instr, taskTypes){
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
    self.instruction = instr;
    self.TaskTypes= taskTypes;
    self.selectedType = new ko.observable();
    
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
            //console.debug("-------");
            for(var i=0;i<self.tasks().length;i++){
                //console.debug(self.tasks()[i]().title + " : " + self.tasks()[i]().complete());
                if(!self.tasks()[i]().complete()){
                    allcomplete= false;
                    break;
                }
            }
            self.complete(allcomplete);
            self.complete.valueHasMutated();
            //console.debug(self.complete());
        }
        if(self.parentTask != null) self.parentTask.accept();
        lesson.clearCurrentTask();
        
    };
    self.taskListClick = function(){
        for(var i=0;i<self.tasks().length;i++){
            var tasks = self.tasks();
            var subtask = tasks[i]();
            slideMenuList(subtask.index);
            lesson.setCurrentTask(self.index);
        }
        
            
    };
    self.taskPanelOpen = function(){
        panel = $("#taskPanel");
        container = $("#taskPanelContainer").empty();
        
        //add child task list
        container.append("<div class='taskPanelTitle' data-bind='text:title'></div>");
        container.append("<input type='image' class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
        taskcontainer = $("<div class='taskPanelFlexContainer' data-bind='foreach:tasks'></div>").appendTo(container);
        taskcontainer.append("<div class='taskPanelFlexItem' data-bind='text:title'></div>");
        container.append("<div id='newFlexItem'><input type='text' id='newFlexTitle' value='enter new task title here'/> <select id='newFlexTaskType' data-bind='options:TaskTypes'></select> <input type='button' id='newFlxAccept' class='flexAccept' value='Create' data-bind='click:createNew' /></div>")
        panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
        //set the bindings to this task
        ko.applyBindings(self,panel.get(0));
    }
    self.taskPanelClose = function(){
        panel = $("#taskPanel");
        panel.hide("slide",250);        
    };
    self.taskBoxClick = function(){
        
    };
    self.reviewClick = function(){
        //self.reviewing(true);
    }
    self.createNew = function(){
        var taskTitle = $('#newFlexTitle').val();
        var taskType = $('#newFlexTaskType').val();
        if((taskTitle == null) || (taskType == null))
            return;
        // create a new task here, using the factory methods refactored from the current mess
    }
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
    self.originalList = revlist;
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
        if(self.parentTask != null) self.parentTask.accept();
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
        container.append("<img class='taskPanelExitIcon' onclick='lesson.clearCurrentTask();'/>");
        taskcontainer = $("<div class='taskPanelReviewContainer' data-bind='foreach:reviewlist'></div>");
        container.append(taskcontainer);
        databind='text:response,attr:{id:"taskBox"+index},click:reviewClick, visible:!reviewing()';
        taskcontainer.append("<p class='taskPanelReviewItem' data-bind='"+databind+"'></p>");
        databind='value:response, attr:{id:"taskBoxEdit"+index}, visible:reviewing, hasfocus:reviewing';
        taskcontainer.append("<textarea class='taskPanelReviewEdit' data-bind='"+databind+"'></textarea>");
        container.append("<input type='button' value='Post' class='taskPanelAccept' data-bind='click:accept'/>");
        panel.addClass("taskPanelWide").removeClass("taskPanelNormal").removeClass("taskPanelThin");
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
    self.reviewClick = function(){
        // no reviewing the reviewer!
    }

    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Review",';
        json += '"Title": "'+ self.title + '",';
        json += '"ReviewList":'+ JSON.stringify(self.originalList) + "";
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';

        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
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
		if(self.parentTask != null) self.parentTask.accept();
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
        container.append("<img class='taskPanelExitIcon' onclick='function(){lesson.clearCurrentTask();}'/>");
        container.append("<div class='taskPanelInstruction' data-bind='html:instruction'></div>");
        container.append("<textarea class='taskPanelEntry' data-bind='value:response'></textare>");
        container.append("<input type='button' value='Post' class='taskPanelAccept' data-bind='click:accept'/>");
        panel.removeClass("taskPanelWide").addClass("taskPanelNormal").removeClass("taskPanelThin");
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
    self.reviewClick = function(){
        //self.reviewing(true);
    }

    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Unknown",';
        json += '"Title": "'+ self.title + '",';
        //json += '"Response":"' + self.response() + '",';
        json +='"Instruction":"Unknown Task"';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
}