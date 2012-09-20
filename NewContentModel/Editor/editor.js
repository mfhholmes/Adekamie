window.currentPage = new page(displayPage);

// call initialise when the document's loaded
$(document).ready(function(){init();});

function init()
{
	addEditControlEvents();
	newPage();
}

//addEditControlEvents: adds the edit controls to all the controls present on the page
function addEditControlEvents()
{
	$('#newPage').bind('click', newPage);
	$('#editPage').bind('click',editPage);
}

//newPage: sets up a new page for the user to create
function newPage()
{
	window.currentPage = new page(displayPage);
	getPage(window.currentPage,"blank");
}
//editPage: grabs an existing page and sets it up for editing
function editPage()
{
	// page to be edited is in the #pageList control
	pagename = $("#pageList").val();
	window.currentPage = new page(displayPage);
	getPage(window.currentPage, pagename);
}

function ajaxFail(event, jqXHR, ajaxSettings, thrownError)
{
	//check we've got an error
	if(thrownError)
	{
		$("#editpane").append("<p class='systemtext'>ajax call to the server failed</p><p class='systemtext'>url:"+ajaxSettings.url+"</p><p class='systemtext'>error: " + thrownError + "</p><p class='systemtext'>settings: " + ajaxSettings + "</p>");
	}
}
// getPage: sends a request for a named page to the server
function getPage(page, pagename)
{
	//filename = "http://www.marcusholmes.biz/adekamie/newcontentmodel/fetchpage.php?page=" + pagename + "&session=whatever"
	filename = "fetchpage.php?page=" + pagename + "&session=whatever"
	receptionFunction = receivePage;
	// ajax fetch the raw XML
	$(document).ajaxError( ajaxFail);
	DEBUG_AJAX = false;
	jqXHR = $.ajax({type:"GET",url:filename,success:receptionFunction,dataType:"xml"});
	if(DEBUG_AJAX)
	{
		jqXHR.done(function() {alert("request for " + filename + " complete");});
		jqXHR.fail(function() {alert("request for " + filename + " failed");});
	}
}

function receivePage(data, textStatus, jqXHR)
{
	xmlDoc = data;
	window.currentPage.loadFromPageXML(xmlDoc);
	displayPage(window.currentPage);
}

function savePage(pagename)
{
	
}

// displayPage: displays a page in the edit pane
function displayPage(page)
{
	var elements = "";
	//filename if present (read only)
	if(page.filename != '')
		elements +="<p><span class='sectionheader'>filename: "+page.filename+"</span></p>";
		
	//page name
	if(page.name == 'blank')
	{
		// new blank page, make the page name writable
		elements += "<p><span class='systemtext'>Page Name: </span><input type='text' id='inputPageName' class='usertext' value='enter a page name here'/><p>";
	}
	else
	{
		// existing page, can't edit the name
		elements += "<p><span class='systemtext'>Page Name: " + page.name + "</span></p>";
	}
	// size
	elements +="<p><span class='sectionheader'>Page Size</span></p>";
	elements +="<ul><li class='inset systemtext'>height: <input type='text' id='inputPageHeight' class='usertext' value='" + page.height + "px'/></li><br/>";
	elements +="<li class='inset systemtext'>width: <input type='text' id='inputPageWidth' class='usertext' value='" + page.width + "px'/></li><br/></ul>";
	// backdrop
	elements +="<p><span class='sectionheader'>Backdrop<span></p>";
	elements +="<ul><li class='inset systemtext'>filename: <input type='text' id='inputBackdropFilename' class='usertext' value='" + page.backdropUrl + "'/></li><br/>";
	elements +="<ul><li class='inset systemtext'>height: <input type='text' id='inputBackdropHeight' class='usertext' value='" + page.backdropHeight + "px'/></li><br/>";
	elements +="<li class='inset systemtext'>width: <input type='text' id='inputBackdropWidth' class='usertext' value='" + page.backdropWidth + "px'/></li><br/></ul>";
	//node tree
	elements +="<p><span class='sectionheader'>Node Tree</span></p><br/>";
	//elements += renderNodeTree(page.startNode, 0);
	
	$("#editpane").empty();
	$("#editpane").append(elements);
}
function renderNodeTree(node, indent, counter)
{
	var result = "";
	counter++;
	var indentPercent = (indent * 10) + "%";
	// name
	result += "<p><span class='systemtext' style='left:" + indentPercent + "'>Name:</span><input class='usertext' id='node" + counter + "name' value='"+node.name+"'/><p><br/>";
	// location
	result +="<p><span class='sectionheader' style='left:" + indentPercent + "'>Page Size</span></p><br/>";
	result +="<ul style='left:" + indentPercent + "'>"
	result +="<li class='systemtext' >left: <input type='text' id='inputNode" + counter + "Top' class='usertext' value='" + node.top + "px'/></li>";
	result +="<li class='systemtext'>top: <input type='text' id='inputNode" + counter + "Left' class='usertext' value='" + node.left + "px'/></li>";
	result +="<li class='systemtext' >left: <input type='text' id='inputNode" + counter + "Height' class='usertext' value='" + node.height + "px'/></li>";
	result +="<li class='systemtext'>top: <input type='text' id='inputNode"+counter+"Width' class='usertext' value='" + node.width + "px'/></li>";
	result +="</ul>";
	result +="<textarea class='contentBox' style='left:" + indentPercent + "'>" +node.content+"</textarea>";
	result +="<br/>";
	return result;
}