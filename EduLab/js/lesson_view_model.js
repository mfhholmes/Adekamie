/**
 * @author Marcus Holmes
 * @copyright Bright Sparks Labs 2012
 */

function lesson_view_model() {
    var self = this;
    // Lesson properties
    self.tasks = new ko.observableArray();
    self.skillLevels = new ko.observableArray();
    self.rawData = {};
    self.metaData = {};
    self.samplesFile = "";
    self.reference = {};
    self.title ="Adekamie";

    // screen properties
    self.lessonVisible = new ko.observable(true);
    self.currentTask = new ko.observable(null);
    self.selectedSkillLevel = new ko.observable(0);
    self.hintsVisible = new ko.observable(false);
    self.lightHints = new ko.observable(false);

    //handling properties
    self.postLoadFunctions = new Array();
    
    //behaviours
    self.loadData = function(lessonData){
        // handles loading the data into the model
        self.rawData = lessonData;
        self.samplesFile = lessonData.SamplesFile;
        self.metaData = lessonData.MetaData;
        self.title += " - " + lessonData.Lesson;
        document.title = self.title;
        
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
        classifyTask(self,lessonData.TaskTree,this.tasks,0);
        for(var func in self.postLoadFunctions)
            self.postLoadFunctions[func]();
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
        for(var i in self.tasks()){
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
        json += '"Lesson":' + JSON.stringify(self.rawData.Lesson)+',';
        json += '"MetaData":' + JSON.stringify(self.metaData)+',';
        json += '"SamplesFile":"'+self.samplesFile+'",';
        if(self.skillLevels){
            json+='"SkillLevels":[';
            $.each(self.skillLevels(),function(key,value){json += '{"Name":"' + value.Name + '","Image":"' + value.Image + '"},';});
            json = json.substring(0,json.length-1) + '],';
        }
        json += '"References":'+JSON.stringify(self.rawData.References)+",";
        json +='"TaskTree":';
        taskarray = self.tasks();
        json = taskarray[0]().toJSON(json);
        json+= "}";
        return json;  
    }
    self.registerPostLoadFunction = function(funcToCall){
        self.postLoadFunctions.push(funcToCall);
    }
};

function classifyTask(lesson, task, taskArray, indent){
    // TODO: convert this to a proper factory
    var newtask;
    if(typeof(task.Type) == "undefined"){
        var badtask = new ko.observable(new task_unknown(taskArray().length,"unknown"+taskArray().length,"missing type"));
            taskArray().push(badtask);
            return badtask;
    }
    else{
            index = taskArray().length
            switch (task.Type.toLowerCase()){
                    case "reading":{
                        newtask = new task_reading(lesson, index,task);
                        break;
                    }
                    case "writing":{
                        newtask = new task_writing(lesson, index,task);
                        break;
                    }
                    case "container":{
                        newtask = new task_container(lesson, index,task);
                        break;
                    }
                    case "flexcontainer":{
                        newtask = new task_flex_container(lesson, index,task);
                        break;			   
                    }
                    case "selection":{
                        newtask =new task_selection(lesson, index,task);
                        break;
                    }
                    case "flyoutselection":{
                        newtask =new task_flyOutSelection(lesson, index,task);
                        break;			    
                    }
                    case "review":{
                        newtask = new task_review(lesson, index,task);
                        break;
                    }
                    case "submit":{
                        newtask = new task_submit(lesson,index,task);
                        break;
                    }
                    default:{
                        newtask = new task_unknown(lesson, index,task);
                        break;
                    }
            }
    }
    newtask.Hints = task.Hints;
    newtask.indent = indent;
    newtask.parentTask = null;
    newtask.editing = new ko.observable(false);
    newtask.editing.subscribe(function(newvalue){
        if(!newvalue){
            newtask.accept();
        } 
    });
    newtask.reviewing = new ko.observable(false);
    var newkotask = new ko.observable(newtask)
    taskArray().push( newkotask);
    // check for child tasks
    if(task.Tasks){
        var newindent = indent +1;
        newtask.hasKids = true;
        for(var i=0;i<task.Tasks.length;i++){
            var child = classifyTask(lesson, task.Tasks[i],taskArray,newindent);
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

