<?
	include("dblib.php");
	
	$id=$_POST['id'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	$query="select * from animo_diary where id='$id' and wdate=curdate()";
	$ret=mysql_query($query);
	if(mysql_num_rows($ret)>0){
		$row=mysql_fetch_array($ret);
		echo "{\"no\":\"".$row['no']."\",\"wdate\":\"".$row['wdate']."\",\"content\":\"".$row['content']."\",\"img\":\"".$row['img']."\",\"feel\":\"".$row['feel']."\"}";
	}else
		echo "just write";
?>