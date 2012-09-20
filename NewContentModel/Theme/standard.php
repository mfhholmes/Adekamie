<?php
	$themecss="theme/standard.css";
	$themejs="theme/standard.js";
	
	function theme_addMenuTab($text)
	{
		// adds a tab to the page, consistent with the style names for the theme
		print "	<div class='mainmenu_tab mainmenu_tabtext'>$text
					<img class='mainmenu_tableft' src='./theme/page-tab-left.png'/>
					<img class='mainmenu_tabmiddle' src='./theme/page-tab-middle.png'/>
					<img class='mainmenu_tabright' src='./theme/page-tab-right.png'/>
					<text class='mainmenu_tabtext mainmenu_tabtextposition'><p>$text</p></text>
				</div>";

	}
?>