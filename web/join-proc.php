<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$pw=$_POST['pw'];
	$email=$_POST['email'];

	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	$query="select count(*) from animo_user where id='$id'";
	$ret=mysql_query($query);
	while($row=mysql_fetch_array($ret)){
		$cnt=$row[0];
	}
	if($cnt>0)
		echo "fail:이미 존재하는 아이디입니다.";
	else{
		$query="insert animo_user values(null,'$id','$pw','$email')";
		$ret=mysql_query($query);
		if($ret)
			echo "success:회원가입에 성공하셨습니다.";
	}
?>