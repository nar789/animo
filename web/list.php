<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/list.css">
	</head>
	<body>
		<h1>일기목록<p id=write onclick=wr()>작성</p></h1>		
		<div id=page>
		<div id=header>
			<p id=left><</p>
			<p id=month>10월</p>
			<p id=right>></p>
		</div>
		<div id=day>
			<p class=day id=sun>일</p>
			<p class=day >월</p>
			<p class=day >화</p>
			<p class=day >수</p>
			<p class=day >목</p>
			<p class=day >금</p>
			<p class=day id=sat>토</p>
		</div>
		<table>
		<?
			$start=-6;
			$end=31;
			for($i=0;$i<6;$i++)
			{
				echo "<tr>";
				for($j=1;$j<=7;$j++){
						$val=$i*7+$j+$start;
						if($val>0 && $val<=$end){
							$opt="";
							if($j==7)
								$opt="style=\"color:#a35fc6;\"";
							else if($j==1)
								$opt="style=\"color:#dc3172;\"";
							
							$ctmp="<div class=g-parent ".$opt."><center>".$val."일<img class=noimg src='img/pic.png'/></center></div>";
						}
						else
							$ctmp="";
						echo "<td id=$val>".$ctmp."</td>";
				}
				echo "</tr>";
			}
			
		?>
		</table>
		<?
			include("dblib.php");
			$id=$_GET['id'];	
			echo "<script>";
			echo "var id='$id';";
			echo "</script>";
			$conn=mysql_connect($db_host,$db_user,$db_passwd) or die("fail");
			mysql_select_db($db_name,$conn);
			$query="select * from animo_diary where id='$id' order by no desc";
			$ret=mysql_query($query);
			while($row=mysql_fetch_array($ret)){
				list($y,$m,$d)=split('[/.-]',$row['wdate']);
				$opt="";
				if(($d-$start)%7==0)
					$opt="style=\'color:#a35fc6;\'";
				else if(($d-1-$start)%7==0)
					$opt="style=\'color:#dc3172;\'";
					
				$enbody=urlencode($row['content']);
				$content="<div class=g-parent ".$opt." onclick=imgclick('".$row['img']."','".$enbody."',".$row['no'].",'".$m."월".$d."일',".$row['feel'].")>".$d."일<center><img class=gallery src='".$row['img']."'/></center></div>";
				//$content="<div class=g-parent ".$opt." onclick=imgclick('".$row['img']."','1234',".$row['no'].",'".$m."월".$d."일',".$row['feel'].")>".$d."일<img class=gallery src='".$row['img']."'/></div>";
				
				echo "<script>";
				echo "document.getElementById('".$d."').innerHTML=\"".$content."\";";
				echo "</script>";
			}
		?>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script type="text/javascript" src="js/list.js"></script>
	</body>
</html>