<html>
	<?php
		include_once "theme/standard.php";
	?>
	<head>
		<title>Adekamie</title>
		<script type="text/javascript" src="adekamie_main.js"></script>
		<script type="text/javascript" src="library/jquery-1.7.1.js"></script>
		<?php
			// add any other javascript libraries here
			print "<script type='text/javascript' src='$themejs'></script>";
		?>
		<link type="text/css" rel="stylesheet" href="adekamie_main.css"/>
		<?php
			// theme stylesheet
			print "<link type='text/css' rel='stylesheet' href='$themecss'/>";
		?>
	</head>
	<body>
		<?php
			// add the components here
			include_once "login.php";
			include_once "librarian.php";
			include_once "view.php";
			include_once "main_tabs.php"
		?>
	</body>
</html>
		