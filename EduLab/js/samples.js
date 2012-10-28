samplesModel={
    "samplesList":[
        {
            "name":"Full magazine",
            "title":"Opens the full Samples magazine",
            "link":"http://gobrad.wix.com/samplesmag-edition1#!sbowboarding/cvh5",
            "icon":"data/Samples.png"
        },
        {
            "name":"Snowboarding",
            "title":"Are you a thrillseeker? Read all about Snowboarding here!",
            "link":"http://gobrad.wix.com/samplesmag-edition1#!social-media/c1va9",
            "icon":"data/Samples.png"
        },
        {
            "name":"Social Media",
            "title":"Are you a Facebook junkie? Essays for and against social media here.",
            "link":"http://gobrad.wix.com/samplesmag-edition1#!social-media/c1va9",
            "icon":"data/Samples.png"
        },
        {
            "name":"Year 9 naughtiness",
            "title":"Are year nines the naughtiest year in your school?",
            "link":"http://gobrad.wix.com/samplesmag-edition1#!naughty-nines/cvrh",
            "icon":"data/Samples.png"
        },
        {
            "name":"Body Image",
            "title":"Have you been teased about the way you look?",
            "link":"http://gobrad.wix.com/samplesmag-edition1#!teenage-girls/c1ka7",
            "icon":"data/Samples.png"
        },
        {
            "name":"What teachers think",
            "title":"Advice on how to improve your essay-writing skills.",
            "link":"http://gobrad.wix.com/samplesmag-edition1#!teachers-thoughts/c1h9d",
            "icon":"data/Samples.png"
        },
    ]
};

function addSamples()
{
    
	samples = $("#samplesContainer");
	$("#samples").width(0).hide().data("status","closed");
	// add in the open event
	
	for(var i = 0; i<samplesModel.samplesList.length;i++){
	    sample=samplesModel.samplesList[i];
	    sample.clickButton = function(){
	        window.open(sample.link,"Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no");
	    }
	}
	ko.applyBindings(samplesModel,samples.get(0));
}

