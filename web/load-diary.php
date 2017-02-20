<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$date=$_POST['date'];	
	$d=$_POST['d'];	


	
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	
	$query="select * from animo_diary where id='$id' and wdate='$d' order by wdate desc";

	$ret=mysql_query($query);
	
	$row=mysql_fetch_array($ret);
	$content=urlencode($row['content']);
	$content=str_replace("+","%20",$content);
	echo "write.php?url=".$row['img']."&content=".$content."&feel=".$row['feel']."&no=".$row['no']."&date=".$date;
?>