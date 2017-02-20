<?
	include("dblib.php");
	
	$id=$_POST['id'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	$query="delete from animo_user where id='$id'";
	$ret=mysql_query($query);
	$query="delete from animo_diary where id='$id'";
	$ret=mysql_query($query);
	if($ret){
			echo "회원탈퇴가 완료되었습니다.";
	}else{
		echo "fail.";
	}
?>