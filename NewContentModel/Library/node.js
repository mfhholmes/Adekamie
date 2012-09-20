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
