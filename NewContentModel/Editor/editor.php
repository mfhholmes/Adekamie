<html>
	<head>
		<title>Adekamie Page Editor</title>
		<script type="text/javascript" src="library/jquery-1.7.1.js"></script>
		<?php //<script type="text/javascript" src="Adekamie_main.js"></script> ?>
		<script type="text/javascript" src="library/page.js"></script>
		<script type="text/javascript" src="library/node.js"></script>
		<script type="text/javascript" src="editor.js"></script>
		<link rel="stylesheet" type="text/css" href="editor.css"/>
	</head>
	<body>
		<div id="editviewport" class="editviewport">
			<div id="editpane" class="editpane">
			</div>
		</div>
		<div id="commandpane" class="commandpane">
			<img class="logo" src="theme/adekamie-Icon.png"/>
			<p class="commandGroupName">Adekamie Content Editor</p>
			<button id="newPage" class="enabled"> Add a New Page </button>
			<br/>
			<br/>
			<button id="editPage" class="disabled">Edit this Page</button>
			<select id="pageList" class="pageList">
			<?php //add the available pages here
				print "<option value='test'>test page</option>";
				print "<option value=''>blank page</option>";
			?>
			</select>
			<br/>
			<button id="savePage" class="disabled">Save this Page</button>
		</div>
	</body>
</html>