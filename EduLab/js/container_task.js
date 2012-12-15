/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */
function task_container(lesson, ind,task){
	//data
	var self=this;
        self.lesson = lesson;
        self.task =task;
	self.index = ind;
	self.reference = task.Reference;
	self.title = task.Title;
	self.tasks = new ko.observableArray();
	self.response = "";
	self.taskBoxVisible = ko.observable(task.TaskBoxVisible?true:false);
	self.taskListVisible= ko.observable(task.TaskListVisible?true:false);
	self.complete = ko.observable(task.Complete?true:false);
	self.navigation = ko.observableArray();
	self.complete = ko.observable(false);
	self.instruction = "***bad instruction***";
	
	//behaviour
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
