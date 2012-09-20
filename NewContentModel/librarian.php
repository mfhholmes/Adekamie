<div id="library" class="middleground library">
	<?php
		// infopanes go here
		print "<div id='library_help' class='library_infopane middleground'>
			<text class='library_heading1'>The Help Text Goes Here</text>
			<br/>
			<br/>
			<text class='library_bodytext'>and gets styled by class</text>
		</div>";
		// menu strip
		print "<div id='library_menustrip' class='foreground library_menustrip'>";
			// icon containers and images go here
			print"<div id='icon_container_help' class='library_icon_container'>";
				print"<img id='icon_help_image' class='library_icon' src='theme/help_icon.png'/>";
			print"</div>";
		// end menustrip
		print "</div>";
	?>
</div>