var refContent;

function addReferenceText()
{
	refContainer = $("#reference");
	$("#reference").width(0).hide().data("status","closed");
	
	//todo: this all needs to be loaded from the server via AJAX
	rawContent = imitateAjax();
	refContent = new processContent(rawContent);
	ko.applyBindings(refContent,refContainer.get(0));
	
}
function imitateAjax(){
    // returns the same result as if we'd loaded a json object from the server
    var result = {
        "References":
        [
            {
                "Name":"TopicTaskWords",
                "Label":"Topic And Task Words",
                "Icons":["./img/video.png"],
                "SearchWords":["topic","task","words","gobby","brad","analyse","analysis"],
                "Content":"<iframe class='refVid' src='http://player.vimeo.com/video/49146470' ></iframe>"
            },
            {
                "Name":"LoremIpsum",
                "Label":"Lorem Ipsum",
                "Icons":["./img/text.png"],
                "SearchWords":["lorem","ipsum","words","sample"],
                "Content":"<p class='refText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor eros, iaculis sit amet pulvinar id, scelerisque ac lorem. Lorem ipsum dolor sit amet, consectetur.</p>"
            }
        ]
    }
    return result;
}
function processContent(rawContent){
    //add in the ko.observables for the content
    var self = this;
    self.RefItems = new ko.observableArray();
    for(var i=0;i<rawContent.References.length;i++){
        var oldref = rawContent.References[i];
        var newref = new Object();
        newref.found = new ko.observable(true);
        newref.Name = new ko.observable(oldref.Name);
        newref.Label = new ko.observable(oldref.Label);
        newref.Content = new ko.observable(oldref.Content);
        newref.Icons = new ko.observableArray(oldref.Icons);
        newref.SearchWords = oldref.SearchWords;
        newref.open = new ko.observable(false);
        newref.clickopen = function(){this.open(!this.open());};
        self.RefItems.push(newref);
    }
    return self;
}
function clearSearch(){
    for(var i=0;i<refContent.RefItems().length;i++){
        refContent.RefItems()[i].found(true);
    }
    $("#searchValue").on("click",searchClick).val("Search...");
    
}
function doSearch(){
    searchText = $("#searchValue").val();
    if(searchText == ""){
        clearSearch();
        return;
    }
    for(var i=0; i<refContent.RefItems().length;i++){
        var ref = refContent.RefItems()[i];
        if(ref.SearchWords.toString().indexOf(searchText)>0){
            ref.found(true);
        } else if(ref.Content().indexOf(searchText)>0){
            ref.found(true);
        } else {
            ref.found(false);
        }
    }
}
function searchClick(){
    var search = $("#searchValue");
    if(search.val() == "Search...")
        search.val("");
    search.off("click");
}
