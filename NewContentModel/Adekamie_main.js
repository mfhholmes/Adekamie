var DEBUG_AJAX = false; //set to true to get notified of ajax completion events
var DEBUG_LOCAL = false; //set to true to skip loading the content from the server

var responseCount = 0; // counter for AJAX responses

//loadXML: fetches an XML file and reads it in ready for processing
function requestXML(filename, receptionFunction)
{
	// ajax fetch the raw XML
	jqXHR = $.ajax({type:"GET",url:filename,success:receptionFunction,dataType:"xml"});
	if(DEBUG_AJAX)
	{
		jqXHR.done(function() {alert("request for " + filename + " complete");});
		jqXHR.fail(function() {alert("request for " + filename + " failed");});
	}
}
// getPage: sends a request for a named page to the server
function getPage(pagename)
{
	requestXML("www.marcusholmes.biz/adekamie/newcontentmodel/fetchpage.php?page=" + pagename + "&session=whatever",receivePage);
}
