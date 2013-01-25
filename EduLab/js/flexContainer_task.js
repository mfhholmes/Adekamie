/*
 * Adekamie
 * Author: Marcus Holmes
 * Copyright: Bright Sparks Labs 2012
 */
function task_flex_container(lesson, ind,task){
    //data
    var self=this;
    self.lesson = lesson;
    self.index = ind;
    self.task = task;
    self.reference = task.Reference;
    self.title = task.Title;
    self.tasks = new ko.observableArray();
    self.response = "";
    self.complete = ko.observable((task.Complete=="true")?true:false);
    self.taskListVisible= ko.observable((task.TaskListVisible=="false")?false:true);
    self.taskBoxVisible = ko.observable((task.TaskBoxVisible=="true")?true:false);
    self.TaskTypes= task.TaskTypes;
    self.selectedType = new ko.observable();
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
    self.toJSON = function(jsonValues){
        var json = jsonValues;
        json += "{";
        json += '"Reference":"' + self.reference + '",';
        json += '"Type":"Container",';
        json += '"Title": "'+ self.title + '",';
        json += JSON.stringify(self.TaskTypes) + ',';
        json += '"Complete":"' + self.complete?'true':'false' + '",';
        json += '"Notepad":"' + (self.notepad?'Yes':'No') + '",';
        json += '"TaskListVisible":"' + self.taskListVisible?'true':'false' + '",';
        if(typeof(self.skillLevels) != 'undefined'){
            json+='"SkillLevels":' + JSON.stringify(self.skillLevels())+",";
        }
        json += '"Tasks":[';
        $.each(self.tasks(),function(key,value){json = value().toJSON(json)+",";});
        json=json.substring(0,json.length-1)+ "]}";
        return json;
    }

}
