<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/login.css">
	</head>
	<body>
		<center>
			<input type=text id='id'>
			<input type=password id='pw'>
			<div class='btn' id='signin' onClick="login()">로그인</div>
			<div class='btn' id='signup' onClick="location.replace('join.php');">회원가입</div>
			<p>Forgot Password?</p>
		</center>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
	</body>
</html>