function addSamples()
{
	samples = $("#samplesContainer");
	$("#samples").width(0).hide().data("status","closed");
	samples.append("<h2>Samples</h2>");
	linktext = 'window.open("./sample1.html","Adekamie sample essay","width=640,height=480,location=no,menubar=no,toolbar=no,status=no")';
	samples.append("<input type='button' value='sample: an essay, old annotations style' onclick='"+linktext+"'/><br/>");
	linktext = 'window.open("./sample2.html","Adekamie sample essay Two","width=640,height=480,location=no,menubar=no,toolbar=no,status=no")';
	samples.append("<input type='button' value='sample: an essay, new annotations style' onclick='"+linktext+"'/><br/>");
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