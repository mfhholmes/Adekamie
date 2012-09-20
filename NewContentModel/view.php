<div id="viewport" class="foreground viewport">
	<div id="workspace" class="middleground workspace" 
		<?php //set the workspace dimensions here 
			print " width='2000px'";
			print " height='2000px'";
		?>>
		<div id="backdrop" class="background backdrop">
			<img id="backdrop_image" class="backdrop_image" <?php print 'src="theme/backdrop.jpg"'; ?>/>
		</div>
		<svg id="display" xmlns="http://www.w3.org/2000/svg" version="1.1" class="middleground svg_display">
		</svg>
		<div id="foredrop" class="foreground foredrop">
		</div>
	</div>
</div>
<div id="navigation" class="foreground navigator">
</div>