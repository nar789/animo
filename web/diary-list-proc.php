<?
	include("dblib.php");
	
	$id=$_POST['id'];
	$type=$_POST['type'];
	$year=$_POST['year'];
	$month=$_POST['month'];
	$feel=$_POST['feel'];
	$s=$_POST['s'];
	$e=$_POST['e'];
	
	
	
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	
	if($type==1)
		$query="select wdate from animo_diary where id='$id' and year(wdate)=$year and feel=$feel order by wdate desc";
	else if($type==2){
		$query="select wdate from animo_diary where id='$id' and month(wdate)=$month and feel=$feel order by wdate desc";
	}else if($type==3){
		$query="select wdate from animo_diary where id='$id' and wdate>='$s' and wdate<='$e' and feel=$feel order by wdate desc";
	}

	$ret=mysql_query($query);
	
	while($row=mysql_fetch_array($ret)){
		echo "<div class=ditem onclick=ditemClick('$row[0]')>$row[0]</div>";
	}
?>