pages = new Array();

// set up the array of XML tab files
var tablist = 	[
					"content/essay_writing.xml",
					"content/create.xml"
				];
var responseCount = 0;
var currentPage;

var VIEWPORT_NAME = "viewport";
var WORKSPACE_NAME = "workspace"
var WORKSPACE_FOREGROUND_NAME="foreground";
var WORKSPACE_BACKGROUND_NAME="background";
var NODE_BUTTON_NAME = "nodebutton";
var COMPLETE_NAME="pagetab";
var BACK_BUTTON_NAME="backLesson";
var NEXT_LESSON_NAME="nextLesson";
var TABS_DIV_NAME = "mainTabs";
var INPUT_PAGE_NAME = "myInputTab";
var BUTTON_CLASS = "nodebutton";
var NAVSLIDER_NAME = "navSlider";
var NAVBAR_NAME = "navBar";
var BACKGROUND_CLASS_NAME = "background";
var FOREGROUND_CLASS_NAME = "foreground";
var CONTROL_ZINDEX = "100";
var ANIMATE_SPEED = "slow";

var DEBUG_AJAX = false; //set to true to get notified of ajax completion events
var DEBUG_LOCAL = false; //set to true to skip loading the content from the server

// BUTTON STUFF
function setButtonUp(buttonref)
{
	bleftimg="#nodebuttonleft" + buttonref;
	bmiddleimg="#nodebuttonmiddle" + buttonref;
	brightimg="#nodebuttonright" + buttonref;
	btext = "#nodebuttontext" + buttonref;
	$(bleftimg).attr("src","./theme/button-up-left.png");
	$(brightimg).attr("src","./theme/button-up-right.png");
	$(bmiddleimg).attr("src","./theme/button-up-middle.png");
	$(btext).css("color","white");
}
function setButtonDown(buttonref)
{
	bleftimg="#nodebuttonleft" + buttonref;
	bmiddleimg="#nodebuttonmiddle" + buttonref;
	brightimg="#nodebuttonright" + buttonref;
	btext = "#nodebuttontext" + buttonref;
	$(bleftimg).attr("src","./theme/button-down-left.png");
	$(brightimg).attr("src","./theme/button-down-right.png");
	$(bmiddleimg).attr("src","./theme/button-down-middle.png");
	$(btext).css("color","white");
}
function setButtonHover(buttonref)
{
	bleftimg="#nodebuttonleft" + buttonref;
	bmiddleimg="#nodebuttonmiddle" + buttonref;
	brightimg="#nodebuttonright" + buttonref;
	btext = "#nodebuttontext" + buttonref;
	$(bleftimg).attr("src","./theme/button-hover-left.png");
	$(brightimg).attr("src","./theme/button-hover-right.png");
	$(bmiddleimg).attr("src","./theme/button-hover-middle.png");
	$(btext).css("color","black");
}
// moveLesson: moves to the specified sub-node of the current node
function moveNode(nodeNumber)
{
	// go to the node that corresponds with the button they clicked on
	currentPage.navigateNode(nodeNumber);
}

// lastLesson: move to last node we visited
function lastNode()
{
	// go back to the parent node of this node
	currentPage.navigateNode(currentPage.currentNode-1);
}

// nextLesson: go to the next node in the tree traversal order
function nextNode()
{
	// get the appropriate next node
	currentPage.navigateNode(currentPage.currentNode+1);
}
function slideNodeButtons(index)
{
	// get the button for this node
	button = document.getElementById(NODE_BUTTON_NAME + index.toString());
	if(button == null) return;
	// get its centre co-ord
	centre = button.offsetLeft + (button.offsetWidth / 2.0);
	// set the view port left so that the button is in the middle
	
	navBar = document.getElementById(NAVBAR_NAME);
	newleft = (navBar.offsetWidth/2.0) - centre + "px";
	//$("#" + NAVSLIDER_NAME).animate({left:'"' + newleft + '"'},"normal");
	var anim={};
	anim["left"] = newleft;
	//anim["top"] = newtop ;
	$("#" + NAVSLIDER_NAME).animate(anim, ANIMATE_SPEED);

}

// changeClass: utility function to switch an element's class
function changeClass(element, newclass)
{
	$("#" + element).removeClass();
	$("#" + element).addClass(newclass);
}

// loadContent: clears down the old content and loads it up from the server files again
function loadContent()
{
	// check for debug status
	if(DEBUG_LOCAL) return;
	// clear down the pages array
	pages= new Array();
	responseCount = 0;
	// clear out the current tabs list
	tabsDiv = document.getElementById(TABS_DIV_NAME);
	tabsDiv.innerHTML = "";

	// load up the pages from the XML files
	for(i=0;i<tablist.length;i++)
	{
		requestXML(tablist[i]);
	}
	
}

//tabClick: the user has clicked on a tab so we need to navigate to the relevant page
function tabClick(pageref)
{
	if((pageref >= 0) && (pageref < pages.length))
		pages[pageref].display();
}

//infoTabClick: the user has clicked on an info tab so we need to show that info tab
function infoTabClick(pageref)
{
	//pagerefs are simple text
	//TODO: this is very clunky. Clean it up later when the functionality is conformed with the business
	var front = 100;
	var second = 75;
	var third = 50;
	var fourth = 25;
	
	switch (pageref)
	{
		case "essayPage":
		{
			$("#essayPage").css("z-index",front);
			$("#myEssayTab").css("z-index",front);
			$("#inputPage").css("z-index",second);
			$("#myInputTab").css("z-index",second);
			$("#refPage").css("z-index",third);
			$("#referenceTab").css("z-index",third);
			$("#helpPage").css("z-index",fourth);
			$("#helpTab").css("z-index",fourth);
			break;
		}
		case "inputPage":
		{
			$("#essayPage").css("z-index",second);
			$("#myEssayTab").css("z-index",second);
			$("#inputPage").css("z-index",front);
			$("#myInputTab").css("z-index",front);
			$("#refPage").css("z-index",second);
			$("#referenceTab").css("z-index",second);
			$("#helpPage").css("z-index",third);
			$("#helpTab").css("z-index",third);
			break;
		}
		case "refPage":
		{
			$("#essayPage").css("z-index",third);
			$("#myEssayTab").css("z-index",third);
			$("#inputPage").css("z-index",second);
			$("#myInputTab").css("z-index",second);
			$("#refPage").css("z-index",front);
			$("#referenceTab").css("z-index",front);
			$("#helpPage").css("z-index",second);
			$("#helpTab").css("z-index",second);
			break;
		}
		case "helpPage":
		{
			$("#essayPage").css("z-index",fourth);
			$("#myEssayTab").css("z-index",fourth);
			$("#inputPage").css("z-index",third);
			$("#myInputTab").css("z-index",third);
			$("#refPage").css("z-index",second);
			$("#referenceTab").css("z-index",second);
			$("#helpPage").css("z-index",front);
			$("#helpTab").css("z-index",front);
			break;
		}
		default:
		{
			// do nuffink innit
			break;
		}
	}
	
}
//loadXML: fetches an XML file and reads it in ready for processing
function requestXML(filename)
{
	// ajax fetch the raw XML
	jqXHR = $.ajax({type:"GET",url:filename,success:receiveXML,dataType:"xml"});
	if(DEBUG_AJAX)
	{
		jqXHR.done(function() {alert("request for " + filename + " complete");});
		jqXHR.fail(function() {alert("request for " + filename + " failed");});
	}
}

// receiveXML: processes the return from a successful ajax call
function receiveXML(data, textStatus, jqXHR)
{
	xmlDoc = data;
	responseCount++;
	loadPages(xmlDoc);
}

// loadPages: parse an XML file to load the page(s) it contains
function loadPages(xmlDoc)
{
	//an XML file can contain one or more pages
	pagelist = xmlDoc.getElementsByTagName("page");
	if(pages.length == 0)
		load = true;
	else
		load = false;
	for(pageref = 0; pageref < pagelist.length; pageref ++)
	{
		// load each page into a page object
		newpage = new page();
		newpage.loadFromPageXML(pagelist[pageref]);
		pages.push(newpage);
		// set up the page tab
		addPageTab(newpage.name,pages.length-1);
	}
	// navigate to the first (default) tab if this was the first page returned
	if(load) 
		pages[0].display();
}

//addPageTab: adds a new page tab to the tab set on the top left
function addPageTab(name, index)
{
	innerContent = '<img class="pagetableft" src="./theme/page-tab-left.png"/><img class="pagetabmiddle" src="./theme/page-tab-middle.png"/><img class="pagetabright" src="./theme/page-tab-right.png"/><text class="pagetabtext pagetabtextposition noselect"><p>##pagename##</p></text>';
	innerContent = innerContent.replace("##pagename##",newpage.name);
	newTab = "<div class='pagetab' onclick='tabClick(" + (pages.length-1).toString() + ");'>";
	newTab += newpage.name;
	newTab +=innerContent;
	newTab += "</div>";
	$("#mainTabs").append(newTab);
}

//removeNodeButton: removes a node button, or all of them if no index passed
function removeNodeButton(index)
{
	if(typeof(index) == "undefined")
	{
		$("." + BUTTON_CLASS).remove();
	}
	else
	{
		id = "#" + LESSON_BUTTON_NAME + index.toString();
		$(id).remove();
	}
}

//addNodeButton: adds a new node button to the node button strip at the bottom
function addNodeButton(name, index)
{
	navSlider = document.getElementById(NAVSLIDER_NAME);
	// basic button stuff
	navButton = document.createElement("div");
	navButton.id=NODE_BUTTON_NAME + index.toString();
	navButton.className = BUTTON_CLASS;
	navButton.innerHTML = name;
	navButton.setAttribute("onclick","moveNode(" + i.toString() + ");");
	navButton.setAttribute("onmousemove","setButtonHover(" + i.toString() + ");");
	navButton.setAttribute("onmouseout","setButtonUp(" + i.toString() + ");");
	navButton.setAttribute("onmousedown","setButtonDown(" + i.toString() + ");");
	navButton.setAttribute("onmouseup","setButtonUp(" + i.toString() + ");");
	navSlider.appendChild(navButton);
	// now add the appearance stuff
	$("#" + navButton.id).addClass("nodebuttontextstyle");
	innercontent = '<img id="nodebuttonleft##index##" class="nodebuttonleft" src="./theme/button-up-left.png" /><img id="nodebuttonright##index##" class="nodebuttonright" src="./theme/button-up-right.png" /><img id="nodebuttonmiddle##index##" class="nodebuttonmiddle" src="./theme/button-up-middle.png" /><text id="nodebuttontext##index##" class="nodebuttontextposition nodebuttontextstyle noselect"><p>##buttonname##</p></text>';
	innercontent = innercontent.replace(/##buttonname##/g,name);
	innercontent = innercontent.replace(/##index##/g,index.toString());
	$("#" + navButton.id).append(innercontent);
}

// getValue: utility function to prevent empty nodes from crashing the script
function getValue(xmlparent, tagname)
{
	var xmlnodes = xmlparent.getElementsByTagName(tagname);
	if(xmlnodes.length == 0) return "";
	var xmlnode = xmlnodes[0];
	if(xmlnode.childNodes.length > 0)
		return xmlnode.childNodes[0].nodeValue;
	else
		return "";
}

//OBJECT CONSTRUCTOR: do not call without "new"
// page: a page contains a graphic and a set of nodes that relate to the graphic
function page()
{
	this.name="default";
	this.topnode = null;
	this.imagePath = "";
	this.pageWidth = 0;
	this.pageHeight = 0;
	this.navNodes = new Array();
	this.currentNode = 0;
	
	// navigate: navigate to this tab, set up the nodes list, etc
	this.display = display;
	function display()
	{
		//clear down the workspace and set up the foreground and background image
		workspace.innerHTML = "";
		workspace = document.getElementById(WORKSPACE_NAME);
		$("#workspace").append("<img id='" + WORKSPACE_FOREGROUND_NAME + "' class='" + FOREGROUND_CLASS_NAME + "'/>");
		$("#" + WORKSPACE_FOREGROUND_NAME).attr("src",this.imagePath);
		workspace.style.width = this.pageWidth + "px";
		workspace.style.height = this.pageHeight + "px";
		// check for background
		if(this.backgroundPresent)
		{
			$("#workspace").append("<img id='" + WORKSPACE_BACKGROUND_NAME + "' class='" + BACKGROUND_CLASS_NAME + "'/>");
			$("#" + WORKSPACE_BACKGROUND_NAME).attr("src",this.backgroundSrc);
			$("#" + WORKSPACE_BACKGROUND_NAME).css("width",this.backgroundWidth);
			$("#" + WORKSPACE_BACKGROUND_NAME).css("height",this.backgroundHeight);
		}
		// add the new content nodes
		this.topnode.drawNode(workspace);
		// clear down node button bar
		removeNodeButton();
		// add the buttons for this page
		for(i=0;i<this.navNodes.length;i++)
		{
			addNodeButton(this.navNodes[i].name, i);
		}
		// and go to the top node
		currentPage = this;
		this.navigateNode(this.currentNode);
	}
	
	//loadFromPageXML: load the page up from an XML document element
	this.loadFromPageXML = loadFromPageXML;
	function loadFromPageXML(xmlPage)
	{
		//try
		{
			//page attributes
			this.name = getValue(xmlPage,"name");
			// image details
			imagetag = xmlPage.getElementsByTagName("image")[0];
			this.imagePath = getValue(imagetag,"path");
			this.pageWidth = getValue(imagetag,"width");
			this.pageHeight = getValue(imagetag,"height");
			// background
			backtag = imagetag.getElementsByTagName("background")[0];
			if(backtag != null)
			{
				this.backgroundPresent = true;
				this.backgroundSrc = getValue(backtag,"path");
				this.backgroundWidth = getValue(backtag,"width");
				this.backgroundHeight = getValue(backtag,"height");
				this.backgroundParallax = (getValue(backtag,"parallax") == "true");
			}
			else
			{
				this.backgroundPresent = false;
			}
			// topnode
			topnodeXML = xmlPage.getElementsByTagName("topnode")[0];
			this.topnode = new node();
			this.topnode.page = this;
			this.topnode.loadFromXML(topnodeXML);
			// now rip through the navigation tree and build the set of navnode references
			navNode = this.topnode;
			while(navNode != null)
			{
				this.navNodes.push(navNode);
				navNode = navNode.getNextNode();
			}
		}
		/*catch(error)
		{
			alert("malformed page XML. \n\n" + xmlPage.textContent);
			
		}
		*/
	}
	
	//navigateNode: moves the display to the node and sets the current node
	this.navigateNode = navigateNode;
	function navigateNode(nodeIndex)
	{
		if(nodeIndex > -1 && nodeIndex < (this.navNodes.length))
		{
			this.currentNode = nodeIndex;
			this.navNodes[nodeIndex].gotoNode();
			// scroll the buttons to the right place
			slideNodeButtons(nodeIndex);
		}
	}
}

//OBJECT CONSTRUCTOR: do not call without "new"
// node: a node on the display graph that can be navigated to by the user
function node()
{
	this.name = ""
	// page this node belongs to	
	this.page = null;
	// node rectangle
	this.top = 0; 
	this.left = 0;
	this.width = 0;
	this.height = 0;
	// control array
	this.controls = new Array();
	// and the relationships to the other nodes
	this.parent = null;
	this.children = new Array();
	
	//METHODS
	
	//loadfromXML: loads the node from an XML element
	this.loadFromXML = loadFromXML;
	function loadFromXML(xmlNode)
	{
		//try
		{
			//load the attributes
			this.name = getValue(xmlNode,"name");
			this.left = getValue(xmlNode,"left");
			this.top = getValue(xmlNode,"top");
			this.width = getValue(xmlNode,"width");
			this.height = getValue(xmlNode,"height");
			// load any controls
			workspace = document.getElementById(WORKSPACE_NAME);
			var controlList = xmlNode.getElementsByTagName("controls")[0];
			if(controlList != null)
			{
				var cntXML = controlList.firstChild;
				while(cntXML != null)
				{
					if(cntXML.tagName == "control")
					{
						newControl = new control();
						if(newControl.parseXML(cntXML, this))
						{
							newControl.workspace = workspace;
							this.controls.push(newControl);
						}
					}
					cntXML = cntXML.nextSibling;
				}
			}
			// load any subnodes
			var subNodes = xmlNode.getElementsByTagName("subNodes")[0];
			if(subNodes != null){
				var childNode = subNodes.firstChild;
				while(childNode != null)
				{
					// check that we've got a good node
					if(childNode.tagName == "node")
					{
						var newChild = new node();
						newChild.page = this.page;
						newChild.loadFromXML(childNode);
						this.children.push(newChild);
						newChild.parent = this;
					}
					childNode = childNode.nextSibling;
				}
			}
		}
		/*catch(error)
		{
			alert("malformed node XML! \n\n" + xmlNode.textContent);
		}
		*/
		
	}
	
	//addChild: adds a child node to the children array of this node
	this.addChild=addChild;
	function addChild(newChild)
	{
		this.children.push(newChild);
		newChild.parent = this;
	}
	
	// gotoNode: moves the display to the node
	this.gotoNode = gotoNode;
	function gotoNode()
	{
		// get the div elements
		viewport = document.getElementById(VIEWPORT_NAME);
		workspace = document.getElementById(WORKSPACE_NAME);
		
		// work out margins
		xMargin = (viewport.clientWidth - this.width)/2;
		yMargin = (viewport.clientHeight - this.height)/2;
		
		// check boundaries
		checkleft = this.left - xMargin;
		if(checkleft <0)
			checkleft = 0;
		if((checkleft + viewport.clientWidth) > workspace.clientWidth)
			checkleft = workspace.clientWidth - viewport.clientWidth;
		checktop = this.top - yMargin;
		if(checktop <0)
			checktop = 0;
		if((checktop + viewport.clientHeight) > workspace.clientHeight)
			checktop = workspace.clientHeight - viewport.clientHeight;
		
		// move the base so the node is under the viewport
		newleft = "-" + checkleft +"px";
		newtop = "-" + checktop + "px";
		
		// if we've got a background, work out how far that has to move too
		if(this.page.backgroundPresent && this.page.backgroundParallax)
		{
			// check that there's any point
			if((this.page.backgroundWidth > viewport.clientWidth) || (this.page.backgroundHeight > viewport.clientHeight))
			{
				// get the percentage we need to move
				backleftpc = checkleft / workspace.clientWidth;
				backtoppc = checktop / workspace.clientHeight;
				// 0 is left/top = 0, 100 is left/top = workspace dimension - viewport dimension
				backleft = (this.page.backgroundWidth - viewport.clientWidth) * backleftpc;
				backtop = (this.page.backgroundHeight - viewport.clientHeight) * backtoppc;
				//boundary check
				if(backleft < 0) backleft = 0;
				if(backtop < 0) backtop = 0;
				//the background image is actually on top of the workspace image
				//	so we have to move it to keep it in the viewport
				backleft = checkleft - backleft;
				backtop = checktop - backtop;
				// jquery animation to conincide with the foreground animation
				var backanim = {};
				backanim["left"] = backleft;
				backanim["top"] = backtop;
				$("#" + WORKSPACE_BACKGROUND_NAME).animate(backanim, ANIMATE_SPEED);
			}
		}
		// jquery animated move
		var anim={};
		anim["left"] = newleft;
		anim["top"] = newtop ;
		$("#" + WORKSPACE_NAME).animate(anim, ANIMATE_SPEED);
	}
	
	this.drawNode = drawNode;
	function drawNode(workspace)
	{
		// draw the controls on the workspace
		for(i=0;i<this.controls.length;i++)
		{
			this.controls[i].workspace = workspace;
			this.controls[i].drawControl();
		}
		// and then draw the kids
		for(var i=0;i<this.children.length;i++)
		{
			this.children[i].drawNode(workspace);
		}
	}
	// getNextNode: returns the next node in the tree traversal order (children, siblings, parent siblings)
	this.getNextNode = getNextNode;
	function getNextNode()
	{
		//check for children
		if(this.children.length > 0)
		{
			// yep, so first child
			return this.children[0];
		}
		else
		{
			// no kids, so any siblings?
			// first check for parent
			if(this.parent == null)
			{
				// no parent, no kids, no next node
				return null;
			}
			else
			{
				//we have a parent, so which kid are we?
				index = this.parent.children.indexOf(this);
				index++;
				// is there a later kid?
				if(index < this.parent.children.length)
				{
					// yes, so return it
					return this.parent.children[index];
				}
				else
				{
					// nope, no more kids, so go up to parent and recurse up to grandparents, etc
					return this.getNextParent();
				}
				
			}
		}
	}
	
	// getNextParent: returns the next parent or parental sibling up the tree from this node
	this.getNextParent = getNextParent;
	function getNextParent()
	{
		// find the next sibling of this node's parent
		// have we got a parent? if not, we're the last
		if(this.parent == null)
			return null;
		// have we got a grandparent?, if not, the parent must be the last and we already did them
		if(this.parent.parent == null)
			return null;
		// so has the grandparent got more kids?
		var index = this.parent.parent.children.indexOf(this.parent);
		index++;
		if(index < this.parent.parent.children.length)
		{
			// yes, so return that one
			return this.parent.parent.children[index];
		}
		else
		{
			// no more kids, so go up a layer
			return this.parent.getNextParent();
		}
	}
	
	// getLastNode: returns the previous sibling, or the parent if there are no previous siblings
	this.getLastNode = getLastNode;
	function getLastNode()
	{
		// check if there's a parent
		if(this.parent == null)
			return null;
		// then check where we are in the sibling list
		index = this.parent.children.indexOf(this);
		// if we're the first child, return the parent, else return the previous sibling
		if(index==0)
			return this.parent;
		else
			return this.parent.children[index-1];
	}
}

function control()
{
	this.parentNode = null;
	this.workspace = null;
	this.element = null;
	this.name = "";
	this.type="";
	this.attributes = new Array();
	this.top = "0px";
	this.left = "0px";
	this.width = "0px";
	this.height = "0px";
	this.innerHTML = "";
	this.background = "";
	this.border = "";
	
	// drawControl: draws the control on the workspace
	this.drawControl = drawControl;
	function drawControl()
	{
		// create the new element
		this.element = document.createElement(this.type);
		// set the properties
		this.element.name=this.name;
		this.element.style.position = "absolute";
		this.element.style.top = this.top + "px";
		this.element.style.left = this.left + "px";
		this.element.style.width = this.width + "px";
		this.element.style.height = this.height + "px";
		this.element.style.zIndex = CONTROL_ZINDEX;
		this.element.style.background = this.background;
		this.element.style.border = this.border;
		this.element.innerHTML = this.innerHTML;
		// styles
		for(i=0;i<this.styles.length;i++)
		{
			stl = this.styles[i];
			this.element.style.cssText += stl.name + ":" + stl.value + ";";
		}
		for(i=0;i<this.attributes.length;i++)
		{
			attr = this.attributes[i];
			this.element.setAttribute(attr.name,attr.value);
		}
		// add it to the workspace
		this.workspace.appendChild(this.element);

	}
	
	//parseXML: loads the properties of this control from the XML data
	this.parseXML = parseXML;
	function parseXML(XML, node)
	{
		// mandatory values
		this.name=getValue(XML, "name");
		this.type=getValue(XML, "type");
		this.left = getValue(XML, "left");
		this.top = getValue(XML, "top");
		this.width = getValue(XML, "width");
		this.height = getValue(XML, "height");
		this.background=getValue(XML, "background");
		this.border = getValue(XML, "border");
		// optional values
		innerHTML = getValue(XML, "innerHTML");
		if(innerHTML != null) this.innerHTML = innerHTML;
		// styles
		this.styles = new Array();
		var styleList = XML.getElementsByTagName("style");
		if(styleList != null)
		{
			// iterate them
			for(i=0;i<styleList.length;i++)
			{
				// get the name and value properties, store them in a style object, add to the array
				stl = styleList.item(i);
				name = stl.attributes.getNamedItem("name").value;
				value = stl.textContent;
				newStyle = new style(name,value);
				this.styles.push(newStyle);
			}
		}
		//attributes
		// get the list of attributes in the node, if any
		this.attributes = new Array();
		var attrList = XML.getElementsByTagName("attribute");
		if(attrList != null)
		{
			// iterate them
			for(i=0;i<attrList.length;i++)
			{
				// get the name and value properties, store them in an attribute object, add to the array
				attr = attrList.item(i);
				name = attr.attributes.getNamedItem("name").value;
				value = attr.textContent;
				newAttr = new attribute(name,value);
				this.attributes.push(newAttr);
			}
		}
		return true;
	}
}

//attribute object just holds the name/value pairs for control attributes
function attribute(name, value)
{
	this.name = name;
	this.value = value;
}
function style(name,value)
{
	this.name = name;
	this.value = value;
}
