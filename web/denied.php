<?
	include("dblib.php");
	
	$id=$_POST['id'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	$query="select count(*) from animo_diary where id='$id' and wdate=curdate()";
	$ret=mysql_query($query);
	while($row=mysql_fetch_array($ret)){
		$cnt=$row[0];
	}
	if($cnt>=1)
		echo "denied";
	else
		echo "write possible";
?>