<?
	include ("dblib.php");
	$no=$_POST['no'];
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	$result=mysql_query("select * from animo_diary where no=$no");
	$row=mysql_fetch_array($result);
	
	$name=split("/",$row['img']);
	$url="diaryimg/".$name[5];
	if(file_exists($url)){
		unlink($url);
	}else{
		echo "delete error.";
	}
	$result=mysql_query("delete from animo_diary where no=$no");
	if($result)
		echo "삭제 성공.";
?>