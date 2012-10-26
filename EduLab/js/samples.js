function addSamples()
{
	samples = $("#samplesContainer");
	$("#samples").width(0).hide().data("status","closed");
	linktext = 'window.open("http://gobrad.wix.com/samplesmag-edition1#!home/mainPage","Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no")';
	samples.append("<input type='button' value='Full magazine' onclick='"+linktext+"' title='Opens the full Samples magazine'/><br/>");
    linktext = 'window.open("http://gobrad.wix.com/samplesmag-edition1#!sbowboarding/cvh5","Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no")';
    samples.append("<input type='button' value='Snowboarding' onclick='"+linktext+"' title='Are you a thrillseeker? Read all about Snowboarding here!'/><br/>");
    linktext = 'window.open("http://gobrad.wix.com/samplesmag-edition1#!social-media/c1va9","Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no")';
    samples.append("<input type='button' value='Social Media' onclick='"+linktext+"' title='Are you a Facebook junkie? Essays for and against social media here.'/><br/>");
    linktext = 'window.open("http://gobrad.wix.com/samplesmag-edition1#!naughty-nines/cvrh","Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no")';
    samples.append("<input type='button' value='Year 9 naughtiness' onclick='"+linktext+"' title='Are year nines the naughtiest year in your school?'/><br/>");
    linktext = 'window.open("http://gobrad.wix.com/samplesmag-edition1#!teenage-girls/c1ka7","Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no")';
    samples.append("<input type='button' value='Body Image' onclick='"+linktext+"' title='Have you been teased about the way you look?'/><br/>");
    linktext = 'window.open("http://gobrad.wix.com/samplesmag-edition1#!teachers-thoughts/c1h9d","Adekamie samples magazine","width=960,height=640,location=no,menubar=no,toolbar=no,status=no")';
    samples.append("<input type='button' value='What teachers think' onclick='"+linktext+"' title='Advice on how to improve your essay-writing skills.'/><img class='sampleSkillIcon' src='./data/skilled_advanced.png'/><br/>");
}
function displayComment(that,textToDisplay)
{
	//$("#cText").remove();
	var num = $(".commentText").length;
	num++;
	name = "cText" + num;
	$("#noteZone").append("<div id='"+name+"' class='commentText'>" + textToDisplay + "</div>");
	$("#"+name).css("top",$(that).position().top);
}
function inlineComment(event)
{
	target= $(event.target);
	note = target.attr("note");
	id=target.attr("ref");
	if($("#"+id).length > 0)
		$("#" + id).remove();
	else
	{
		target.append("<div class='note' id="+id+">" + note + "</div>");
		$("#" + id).css("top",target.position().top + target.height());
	}
}
function startSamples()
{
	// add the click handlers to the annotated spans
	$(".annotated").on("click",inlineComment);
}