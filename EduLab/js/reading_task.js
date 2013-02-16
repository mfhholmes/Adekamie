/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */

function task_reading(lesson,ind,task){
    //data
    var self=this;
    self.task = task;
    self.lesson = lesson;
    self.index = ind;
    self.reference = task.Reference;
    self.title = task.Title;
    self.complete = ko.observable((task.Complete=="true")?true:false);
    self.taskListVisible= ko.observable((task.TaskListVisible=="false")?false:true);
    self.taskBoxVisible = ko.observable((task.TaskBoxVisible=="true")?true:false);
    self.response = "reading task";
    self.postLabel = task.PostLabel?task.PostLabel:"Understood";
    self.skillText = task.Instruction;
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
        json += '"Instruction":' + JSON.stringify(self.skillText)+',';
        json += '"Complete":"' + (self.complete()?'true':'false') + '",';
        json += '"Notepad":"' + (self.notepad?'Yes':'No') + '",';
        json += '"TaskListVisible":"' + (self.taskListVisible()?"true":"false'") + '"';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        //json +='"Navigation":' + JSON.stringify(self.navigation());
	    json += "}";
	    return json;
	}
}




