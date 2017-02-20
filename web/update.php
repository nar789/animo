<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/update.css">
	</head>
	<body>
        <center>
        <?
          include ("dblib.php");
          $id=$_GET['id'];
          $conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
          mysql_select_db($db_name,$conn);
          $query="select * from animo_user where id='$id'";
          $ret=mysql_query($query);
          $row=mysql_fetch_array($ret);
          $email=$row['email'];
        ?>
        <input type=hidden id='id' value='<?=$_GET['id']?>'>
				<input type=text placeholder="<?=$_GET['id']?>" disabled>
				<input type=text id='pw' onClick="inputclick(this);" value="" placeholder="수정할 비밀번호를 입력해주세요"
        onkeydown="move('email')">
        <input type=text placeholder="<?=$email?>" disabled>
        <input type=text id='email' onClick="inputclick(this);" value="" placeholder="수정할 이메일을 입력해주세요"
        onkeydown="enter()">
				<div class='btn' id='signup' onClick="update()">수정하기</div>
        <div class='btn' id='signout' onClick="signout()">회원탈퇴</div>
				<div class='btn' id='back' onClick="history.back();">뒤로</div>
				</center>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script type="text/javascript" src="js/update.js"></script>
	</body>
</html>