<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/login.css">
	</head>
	<body>
		<center>
			<img src=img/icon.png id=logo>
			<input type=text id='id' onClick="inputclick(this);" placeholder="아이디를 입력해주세요" onkeydown="move('pw')">
			<input type=text id='pw' onClick="inputclick(this);" placeholder="비밀번호를 입력해주세요" onkeydown="enter()">
			<div class='btn' id='signin' onClick="login()">로그인</div>
			<div class='btn' id='signup' onClick="location.replace('join.php');">회원가입</div>
			<div id=findidpw onclick="findpw()">비밀번호 찾기</div>
			<p>Copyright (c)Hume 2016 all right reserved</p>
		</center>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script type="text/javascript" src="js/login.js"></script>
	</body>
</html>