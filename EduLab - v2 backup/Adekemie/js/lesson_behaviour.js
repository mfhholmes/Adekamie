// jquery 
$(start);

function start()
{
	// clear out any design-time crap from the container and task list
	$("#container").empty();
	$("#taskList").empty();
	// load the lesson items into the container and task list
	loadTasks(lesson);
	// set masonry to work on the container
	$('#container').masonry(
		{
		// options
		taskSelector : '.task',
		columnWidth : 1
		}
	);
  
	// set sortable to work on the task items
	$('#container').sortable(
		{
			distance: 12,
			forcePlaceholderSize: true,
			items: '.task',
			placeholder: 'card-sortable-placeholder task',
			tolerance: 'pointer',
			
			start:  function(event, ui)
			{            
			   ui.item.addClass('dragging').removeClass('task');
			   ui.item.parent().masonry('reload')
			},
			change: function(event, ui)
			{
			   ui.item.parent().masonry('reload');
			},
			stop:   function(event, ui)
			{
			   ui.item.removeClass('dragging').addClass('task');
			   ui.item.parent().masonry('reload');
			}
		}
	);
	
	// add the click event handler to the task items
	$('.task').click(function (){
		clickTask($(this));
	});
	 
};


function clickTask(thisTask){
	
	$(".bigTask").addClass("stdWidth");
	$(".bigTask").removeClass("bigTask");
console.log("Removed all bigTask classes");
	thisTask.addClass("bigTask");
console.log("Added bigTask from this");
	thisTask.removeClass("stdWidth");
console.log("Removed stdWith from this");
		thisTask.parent().masonry('reload');
	thisTask.scrollMinimal();
}

jQuery.fn.scrollMinimal = function(smooth) {
  var cTop = this.offset()==null?0:this.offset().top;
  var cHeight = this.outerHeight(true);
  var windowTop = $(window).scrollTop();
  var visibleHeight = $(window).height();

  if (cTop < windowTop) {
    if (smooth) {
      $('body').animate({'scrollTop': cTop}, 'slow', 'swing');
    } else {
      $(window).scrollTop(cTop);
    }
  } else if (cTop + cHeight > windowTop + visibleHeight) {
    if (smooth) {
      $('body').animate({'scrollTop': cTop - visibleHeight + cHeight}, 'slow', 'swing');
    } else {
      $(window).scrollTop(cTop - visibleHeight + cHeight);
    }
  }
};


