<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$type=$_POST['type'];
	$value=$_POST['value'];
	$s=$_POST['s'];
	$e=$_POST['e'];
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	if($type==1)
		$query="select feel,count(*) from animo_diary where id='$id' and year(wdate)=$value group by feel";
	else if($type==2){
		$query="select feel,count(*) from animo_diary where id='$id' and month(wdate)=$value group by feel";
	}else if($type==3){
		$query="select feel,count(*) from animo_diary where id='$id' and wdate>='$s' and wdate<='$e' group by feel";
	}

	$ret=mysql_query($query);
	echo "{";

	$num=mysql_num_rows($ret);
	$cnt=0;
	while($row=mysql_fetch_array($ret)){
		$cnt++;
		echo "\"k".$row[0]."\":\"".$row[1]."\"";
		if($cnt!=$num)
			echo ",";
	}
	echo "}";
?>