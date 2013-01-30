/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */
function task_flyOutMultiSelection(lesson, ind, task){
    //data
    var self = this;
    self.lesson = lesson;
    self.task = task;
    self.index = ind;
    self.reference = task.Reference;
    self.title = task.Title;
    self.choices = new ko.observableArray(task.Choices);
    self.maxChoices = task.MaximumNumberOfChoices;
    if(typeof(self.maxChoices)=="undefined") self.maxChoices = -1;
    self.tickedChoices = new ko.observableArray(task.TickedChoices);
    if(typeof(self.tickedChoices())=="undefined") self.tickedChoices = new ko.observableArray();
    self.response = ko.computed(function (){
        result = "";
        for(var i=0;i<self.tickedChoices().length;i++)
            result += (self.tickedChoices()[i] + " ");
        return result;
    }, self);
    self.complete = ko.observable((task.Complete=="true")?true:false);
    self.taskListVisible= ko.observable((task.TaskListVisible=="false")?false:true);
    self.taskBoxVisible = ko.observable((task.TaskBoxVisible=="true")?true:false);
    self.oldresponse= task.Response;
    self.skillText = task.Instruction;
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
        container.append("<div class='taskPanelEntry' data-bind='text:response'></div>");
        container.append("<input type='button' class='flyOutButton' value='See More Options' data-bind='click:flyOut'/>");
        container.append("<input type='button' value='Post' class='taskPanelAccept' data-bind='click:accept'/>");
        flyOutChoices = $("<div id='flyOutChoices' class='flyOutSelectChoicesContainer flyOutClosed' data-bind='foreach:choices'/>").appendTo("body").data("status","closed");
        checkDataBind='value:$data,checked:$parent.tickedChoices,attr:{"id":"selectChoice"+$index()}';
        labelDataBind = 'text:$data,attr:{"for":"selectChoice"+$index()}';
        flyOutChoices.append("<p class='flyOutChoice' ><input type='checkbox' data-bind='"+checkDataBind+"'/><label data-bind='"+labelDataBind+"'/></p>");
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
        $("#flyOutChoices").remove();
        panel = $("#taskPanel");
        panel.attr("class","taskPanel");
        panel.hide("slide",250);
    };  
    self.taskBoxClick = function(){        
//        content = $('#taskBox'+self.index).first();
//        editbox = $('#taskBoxEdit' + self.index);
//        editbox.height(content.height());
//        self.editing(true);
    };
    self.reviewClick = function(){
        //self.reviewing(true);
    }

    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"flyOutSelection",';
        json += '"Title": "'+ self.title + '",';
        json += '"Response":"' + self.response() + '",';
        json += '"Choices":'+ JSON.stringify(self.choices()) + ",";
        json += '"TickedChoices":' + JSON.stringify(self.tickedChoices()) + ",";
        json += '"Complete":"' + (self.complete()?'true':'false') + '",';
        json += '"Notepad":"' + (self.notepad?'Yes':'No') + '",';
        json += '"TaskListVisible":"' + (self.taskListVisible()?"true":"false'") + '",';
        json += '"TaskBoxVisible":"' + (self.taskBoxVisible()?'true':'false') + '",';
        json +='"Instruction":' + JSON.stringify(self.skillText)+'';
        if(typeof(self.Hints)!='undefined')
            json +=',"Hints":' + JSON.stringify(self.Hints)+ '';
        json += "}";
        return json;
    }
    
}

