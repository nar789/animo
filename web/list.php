<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/list.css">
	</head>
	<body>
		<div id=title>
			<div id=menudiv onclick='menuClick()'>
				<img src=img/menu.png id=menu>
			</div>
			<div id=title-text>성찰일기</div>
			<p id=write onclick=wr()><img src=img/pen.png></p>
		</div>		
		<div id=page onclick='hideside()'>
		<div id=header>
			<p id=left onclick='leftclick()'><</p>
			<p id=month></p>
			<p id=right onclick='rightclick()'>></p>
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
			$month=$_GET['month'];
			if(isset($_GET['year']))
				$year=$_GET['year'];
			else
				$year=date('Y');

			echo '<script>var year='.$year.';</script>';
			echo '<script>var month='.$month.';</script>';
			//$startlist=[0,-5,-1,-2,-5,-7,-3,-5,-1,-4,-6,-2,-4];
			//$endlist=[31,29,31,30,31,30,31,30,31,30,31,30,31];
			//$start=$startlist[$month];
			//$end=$endlist[$month];
			if($month<10)
				$tmonth="0".$month;
			else $tmonth=$month;
			$tyearmonth=$year."-".$tmonth;
			$last_day=date("t",strtotime($tyearmonth."-01"));
			$start_week = date("w", strtotime($tyearmonth."-01"));
			$total_week = ceil(($last_day + $start_week) / 7);
			$last_week = date('w', strtotime($tyearmonth."-".$last_day));
			for($i=0;$i<$total_week;$i++)
			{
				echo "<tr>";
				$breakflag=0;
				for($j=1;$j<=7;$j++){
						$val=$i*7+$j-$start_week;
						if($val>0 && $val<=$last_day){
							$opt="style=\"";
							if($j==7)
								$opt=$opt."color:lightcyan;";
							else if($j==1)
								$opt=$opt."color:lightpink;";
							else
								$opt=$opt."color:#fffde2;";

							$day=date('d');
							$realmonth=date('m');
							$curyear=date('Y');
							if($curyear==$year && $val==$day && $realmonth==$month){
								$opt=$opt."background-color:lightcoral;border-radius:10px;";
							}

							$opt=$opt."\"";
							
							$ctmp="<div class=g-parent ".$opt." onclick='imgclick(\"\",\"\",\"\",\"".$month."월".$val."일\",\"\")'><center>".$val."일</center></div>";
						}
						else
							$ctmp="";
						echo "<td id=$val>".$ctmp."</td>";

						//if($val==$end)$breakflag=1;
				}
				echo "</tr>";
				/*
				if($breakflag)
					break;
					*/
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
				if($m!=$month)
					continue;
				if($y!=$year)
					continue;

				$opt="style='";
				$j=date("w",strtotime($row['wdate']))+1;
				if($j==7)
					$opt=$opt."color:lightcyan;";
				else if($j==1)
					$opt=$opt."color:lightpink;";
				else
					$opt=$opt."color:#fffde2;";

				$day=date('d');
				$d=(int)$d;
				$y=(int)$y;
				$realmonth=date('m');
				if($year==$y && $d==$day && $realmonth==$month){
					$opt=$opt."background-color:lightcoral;border-radius:10px;";
				}

				$opt=$opt."'";
				$imgurl=str_replace(".jpg","_thumb.jpg",$row['img']);
				$enbody=urlencode($row['content']);
				$content="<div class=g-parent ".$opt." onclick=imgclick('".$row['img']."','".$enbody."',".$row['no'].",'".$m."월".$d."일',".$row['feel'].")>".$d."일<center><img class=gallery src='".$imgurl."'/></center></div>";
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