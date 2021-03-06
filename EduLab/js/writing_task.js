/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */
function task_writing(lesson, ind, task){
    //data
    var self = this;
    self.lesson = lesson;
    self.index = ind;
    self.task = task;
    self.reference = task.Reference;
    self.title = task.Title;
    self.response = new ko.observable(task.Response);
    self.complete = ko.observable((task.Complete=="true")?true:false);
    self.taskListVisible= ko.observable((task.TaskListVisible=="false")?false:true);
    self.taskBoxVisible = ko.observable((task.TaskBoxVisible=="true")?true:false);
    self.oldresponse= self.response;
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
        json += '"Instruction":' + JSON.stringify(self.skillText)+',';
        json += '"Complete":"' + (self.complete()?'true':'false') + '",';
        json += '"Notepad":"' + (self.notepad?'Yes':'No') + '",';
        json += '"TaskListVisible":"' + (self.taskListVisible()?"true":"false'") + '",';
        json += '"TaskBoxVisible":"' + (self.taskBoxVisible()?'true':'false') + '"';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        //json +='"Navigation":' + JSON.stringify(self.navigation());
        json += "}";
        return json;
    }
}


