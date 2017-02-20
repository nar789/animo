<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$content=$_POST['content'];
	$url=$_POST['url'];
	$feel=$_POST['feel'];
	$no=$_POST['no'];
	$date=$_POST['date'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	if($no)
	{
		$query="update animo_diary set content='$content', img='$url', feel=$feel where no=$no";
	}else{
		if($date!="")
			$query="insert animo_diary values(null,'$date','$content','$url','$id',$feel)";
		else
			$query="insert animo_diary values(null,now(),'$content','$url','$id',$feel)";
	}
	$ret=mysql_query($query);
	if($ret)
		echo "저장이 완료되었습니다.";
?>