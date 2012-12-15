/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */
function task_review(lesson, ind,task){
    //data
    var self=this;
    self.task = task;
    self.index = ind;
    self.reference = task.Reference;
    self.title = task.Title;
    self.tasks = new ko.observableArray();
    self.response = "";
    self.taskBoxVisible = ko.observable(task.TaskBoxVisible?true:false);
    self.taskListVisible= ko.observable(task.TaskListVisible?true:false);
    self.complete = ko.observable(task.Complete?true:false);
    self.reviewlist = ko.observableArray(task.ReviewList);
    self.originalList = task.ReviewList;
    self.instruction = "***bad instruction***";
    
    self.setupList = function(){
        //set up th review list
        var newrev = ko.observableArray();
        for(var i=0;i<self.reviewlist().length;i++){
            var task =lesson.getTaskByRef(self.reviewlist()[i]);
            newrev.push(task);
        }
        self.reviewlist = newrev;
    };
    lesson.registerPostLoadFunction(self.setupList);
    
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
