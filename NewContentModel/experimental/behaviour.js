
function makeIt(name)
{
	svg = 'http://www.w3.org/2000/svg';
	var newthing = document.createElementNS(svg,"rect");
	newthing.setAttributeNS(null,"id",name);
	newthing.setAttributeNS(null,"x",20);
	newthing.setAttributeNS(null,"y",20);
	newthing.setAttributeNS(null,"rx",10);
	newthing.setAttributeNS(null,"ry",10);
	newthing.setAttributeNS(null,"width",50);
	newthing.setAttributeNS(null,"height",50);
	newthing.setAttributeNS(null, "class","svgbox");
	
	var page = document.getElementById("display");
	page.appendChild(newthing);
}

currentState = 0;
lastX = 0;
lastY = 0;
function startDragging(e)
{
	lastX = e.clientX;
	lastY = e.clientY
	currentState = 1;
	document.getElementById("events").value=currentState + " - dragging";
}
function drag(e)
{
	var thisX = e.clientX;
	var thisY = e.clientY;
	if(currentState != 1) return;
	workspace = document.getElementById("workspace");
	viewport = document.getElementById("viewport");
	if(workspace)
	{
		var curVectorX = lastX - thisX;
		var curVectorY = lastY - thisY;
		var curLeft = workspace.offsetLeft;
		var curTop = workspace.offsetTop;
		var checkleft=(curLeft - curVectorX)*-1;
		var checktop= (curTop - curVectorY )*-1;
		// check for out of bounds
		if(checkleft <0)
			checkleft = 0;
		if((checkleft + viewport.clientWidth) > workspace.clientWidth)
			checkleft = workspace.clientWidth - viewport.clientWidth;
		if(checktop <0)
			checktop = 0;
		if((checktop + viewport.clientHeight) > workspace.clientHeight)
			checktop = workspace.clientHeight - viewport.clientHeight;

		workspace.style.left  = checkleft*-1 + "px";
		workspace.style.top = checktop*-1 + "px";
		lastX = thisX;
		lastY = thisY;
		document.getElementById("events").value=currentState + " - dragging " + curVectorX + ":" + curVectorY;
		document.getElementById("space").value=workspace.style.top + ":" + workspace.style.left;
	}
}
function stopDragging(e)
{
	currentState = 0;
	document.getElementById("events").value=currentState + " - idle";
}