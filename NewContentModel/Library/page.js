
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

// page: a page contains a graphic and a set of nodes that relate to the graphic
// 	displayFunction is a function reference that takes a single parameter of this page, that displays the page in whatever context it needs.
function page(displayFunction)
{
	this.name="default";
	this.title = "default page";
	this.filename = "";
	this.startNode = null;
	this.pageWidth = 0;
	this.pageHeight = 0;
	this.navNodes = new Array();
	this.currentNode = 0;
	this.displayFunction = displayFunction;
	this.backdropUrl = "";
	this.backdropWidth = 0;
	this.beckdropHeight = 0;
	this.pageDisplayContext = null;
	
	// receivePage: processes the return from a successful ajax call and hands it to the page loader
	this.receivePage = receivePage;
	function receivePage(data, textStatus, jqXHR)
	{
		xmlDoc = data;
		responseCount++;
		this.loadFromPageXML(xmlDoc);
		this.displayFunction(this);
	}

	// navigate: navigate to this tab, set up the nodes list, etc
	//this.display = display;
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
			// there may be a file node if we've been debugging, which we may need to display so save it
			currentNode = xmlPage.documentElement;
			if(currentNode.tagName=="file")
			{
				this.filename=currentNode.attributes.getNamedItem("name").value;
				currentNode = currentNode.firstChild;
			}
			else
			{
				this.filename="";
			}
			//page attributes
			this.name = currentNode.getElementsByTagName("name")[0].textContent;
			this.title = currentNode.getElementsByTagName("title")[0].textContent;
			
			//get the rest of the page stuff
			for(node in currentNode.childNodes)
			{
				switch(node.nodeName)
				{
					case "size":
					{
						this.loadSize(node);
						break;
					}
					case "name":
					{
						this.name = node.textContent;
						break;
					}
					case "title":
					{
						this.title = node.textContent;
						break;
					}
					case "node":
					{
						loadNodeTree(node);
						break;
					}
					case "backdrop":
					{
						loadBackdrop(node);
						break;
					}
				}
			}
			
			
		}
		/*catch(error)
		{
			alert("malformed page XML. \n\n" + xmlPage.textContent);
			
		}
		*/
	}

	// loadSize: loads the size elements from the XML to the page object
	this.loadSize = loadSize;
	function loadSize(parentNode)
	{
		if(!parentNode.hasChildNodes())
		{
			return;
		}
		for(node in parentNode.childNodes)
		{
			switch(node.nodeName)
			{
				case "width":
				{
					this.pageWidth = node.textContent;
					break;
				}
				case "height":
				{
					this.pageHeight = node.textContent;
					break;
				}
			}
		}
	}
	
	//loadBackdrop: loads the backdrop elements from the XML to the page
	this.loadBackdrop = loadBackdrop;
	function loadBackdrop(parentNode)
	{
		if(!parentNode.hasChildNodes())
		{
			return;
		}
		for(node in parentNode.childNodes)
		{
			switch(node.nodeName)
			{
				case "width":
				{
					this.backdropWidth = node.textContent;
					break;
				}
				case "height":
				{
					this.backdropHeight = node.textContent;
					break;
				}
				case "filename":
				{
					this.backdropUrl = node.textContent;
					break;
				}
			}
		}
	}
	
	// loadNode: loads the start node from the XML into the page
	this.loadNode = loadNode;
	function loadNode(parentNode)
	{
		// actually, this is all in the node.js file
		//this.startNode = new node(parentNode);
	}
	//navigateNode: moves the display to the node and sets the current node
	this.navigateNode = navigateNode;
	function navigateNode(nodeIndex)
	{
		if(nodeIndex > -1 && nodeIndex < (this.navNodes.length))
		{
			this.currentNode = nodeIndex;
			if(this.pageDisplayContext)
			{
				this.pageDisplayContext.navigateToNode(this.currentNode);
			}
		}
	}
}
