<?
	include ("dblib.php");
	$id=$_GET['id'];
	$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
	mysql_select_db($db_name,$conn);
	$query="select * from animo_user where id='$id'";
	$ret=mysql_query($query);
	if($ret){
		$row=mysql_fetch_array($ret);
		$content=$id."님의 비밀번호는 <".$row['pw'].">입니다.";
		$to=$row['email'];
		if($to){
			$subject="<성찰일기>비밀번호 발송메일";
			$subject=iconv("utf-8","euc-kr",$subject);
			mail($to,$subject,$content,"관리자 : tony92511@hanmail.net");
			echo "메일발송완료";
		}else{
			echo "메일 발송 실패:1";
		}
	}else
	{
		echo "메일 발송 실패:2";
	}
?>