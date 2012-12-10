function addSamples(samplesFile)
{
        samplesURL = "./data/" + samplesFile + ".json";
        $.getJSON(samplesURL,function(data){
            samples = $("#samplesContainer");
            $("#samples").width(0).hide().data("status","closed");
            ko.applyBindings(data,samples.get(0));            
        }).error(function(XMLHttpRequest, textStatus, errorThrown){
            samples = $("#samplesContainer");
            samples.append("<p>Samples " + samplesURL + " unable to be fetched</p>");
            samples.append("<p>Error reported as: " + errorThrown + "</p>");
            samples.append("<p>Text Status is: " + textStatus + "</p>");
        });
}

