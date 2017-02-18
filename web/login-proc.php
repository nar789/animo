<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$pw=$_POST['pw'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	$query="select count(*) from animo_user where id='$id' and pw='$pw'";
	$ret=mysql_query($query);
	while($row=mysql_fetch_array($ret)){
		$cnt=$row[0];
	}
	if($cnt==1)
		echo "success";
	else
		echo "fail:아이디 또는 비밀번호가 잘못됐습니다.";
?>