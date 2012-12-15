/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */
function task_submit(lesson, ind, task){
    // data
    var self = this;
    self.task = task;
    self.lesson = lesson;
    self.index = ind;
    self.reference = task.Reference;
    self.title = task.Title; 
    self.instruction = "submit task";
    self.response=task.Response;
    self.complete = ko.observable((task.Complete=="true")?true:false);
    self.taskListVisible= ko.observable((task.TaskListVisible=="false")?false:true);
    self.taskBoxVisible = ko.observable((task.TaskBoxVisible=="true")?true:false);

    // behaviour
    self.accept = function (){
            // always completes
            self.complete(true);
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
        json += '"Type":"Submit",';
        json += '"Title": "'+ self.title + '",';
        //json += '"Response":"' + self.response() + '",';
        json +='"Instruction":"Submit Task"';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
}
