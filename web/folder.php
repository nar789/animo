<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/folder.css">
	</head>
	<body>
		<div id=header onClick='valuezero()'>
			<center>
			<h1>폴더</h1>
			</center>
		</div>
		
		<ul>
			<li onClick=liclick(this)><t>Diary</t></li>
			<li onClick=liclick(this)><t>Girlfriend</t></li>
			<li onClick=liclick(this)><t>Vacation</t></li>
		</ul>
		<div onClick='valuezero()' id=bottom>
			<input type=hidden id=sel>
			<script type="text/javascript" src="js/folder.js"></script>
		</div>
	</body>
</html>