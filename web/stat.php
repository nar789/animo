<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/stat.css">
	</head>
	<body>
		<div id=title>
			<div id=menudiv onclick='menuClick()'>
				<img src=img/menu.png id=menu>
			</div>
			<div id=title-text>기분통계</div>			
		</div>		
		<input type=hidden id=myid value="<?=$_GET['id']?>">
		<input type=hidden id=stype value="<?=$_GET['type']?>">
		
		<input type=hidden id=stxt value="<?=$_GET['stxt']?>">
		<input type=hidden id=etxt value="<?=$_GET['etxt']?>">
		<input type=hidden id=smonth value="<?=$_GET['month']?>">
		<input type=hidden id=syear value="<?=$_GET['year']?>">
		<input type=hidden id=feel value="<?=$_GET['feel']?>">
		
		<center>
			<div id=sub-back>
				<ul class=sub-group>
					<li class=sub-item id=year onclick='subclick(1)'>연간</li>
					<li class=sub-item id=month onclick='subclick(2)'>월간</li>
					<li class=sub-item id=week onclick='subclick(3)'>주간</li>
				</ul>
			</div>
		</center>
		
		<div class=header-g id=peryear>
			<p class=left onclick='YearLeftClick()'><</p>
			<center><p class=middle id=year-middle></p>
			<p class=right onclick='YearRightClick()'>></p>
			</center>
		</div>

		<div class=header-g id=permonth>
			<p class=left onclick='MonthLeftClick()'><</p>
			<center><p class=middle id=month-middle></p>
			<p class=right onclick='MonthRightClick()'>></p>
			</center>
		</div>

		<div class=header-g id=perweek>
			<p class=left onclick='WeekLeftClick()'><</p>
			<center><p class=middle id=week-middle></p>
			<p class=right onclick='WeekRightClick()'>></p>
			</center>
		</div>

		<div id=graph>
		</div>
		<center>
		<p id='wrong'>데이터가 존재하지 않습니다.</p>
		</center>
		<center>
			<div id=diary>
			</div>
		</center>
		
		


		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="js/canvasjs.min.js"></script>
		<script type="text/javascript" src="js/stat.js"></script>
	</body>
</html>