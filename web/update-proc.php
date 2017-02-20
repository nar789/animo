<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$pw=$_POST['pw'];
	$email=$_POST['email'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	$query="update animo_user set ";
	if($pw)
		$query=$query."pw='$pw' ";
	if($email){
		if($pw)
			$query=$query.",";
		$query=$query."email='$email' ";
	}

	$query=$query."where id='$id'";
	//echo $query;
	$ret=mysql_query($query);
	
	if($ret){
			echo "success:회원정보 수정 완료.";
	}else{
		echo "fail:회원정보 수정 실패.";
	}
?>