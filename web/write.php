<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/slide.css">
	<link rel="stylesheet" type="text/css" href="css/write.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
</head>
<body>
	<?

		echo "<script>var year;</script>";
		if(isset($_GET['year']))
			echo "<script>year=".$_GET['year'].";</script>";
	?>
	<div id=title>
		<div id=menudiv onclick='menuClick()'>
				<img src=img/menu.png id=menu>
		</div>
		<div id=t-text onclick='titleclick()'>일기작성</div>
		<div id=top-complete onclick=send()><img src=img/check.png></div>
		<div id=delete onclick=del()><img src=img/trash.png></div>
		<div id=chart-g onclick='chartclick()'><img src=img/chart.png></div>
		<len id='len'>0/55</len>
	</div>
	<div id=page onclick='hideside()'>
		<form name="upload" action="upload.php" method="post" enctype="multipart/form-data">
			<input type=hidden name=no id=no></input>
			<input type=hidden name=range id=range value=1></input>
			<!--
			<div id=range-group>
				<input id=range name=range type=range class=slider onchange='feelchange(this)' value=50 min=0 max=100>
					<img src='img/happy.png' id=img-happy>
					<img src='img/sad.png' id=img-sad>
					<p id=f-text>HAPPY0%</p>
				</input>
			</div>
			//-->
			<center>
				<div id=mood-group>
						<div onclick='moodclick(1)' class=mood id=m-1><i class="fa fa-sun-o" aria-hidden="true"></i><br>행복</div>
						<div onclick='moodclick(2)' class=mood id=m-2><i class="fa fa-star-o" aria-hidden="true"></i><br>기쁨</div>
						<div onclick='moodclick(3)' class=mood id=m-3><i class="fa fa-moon-o" aria-hidden="true"></i><br>평온</div>
						<div onclick='moodclick(4)' class=mood id=m-4><i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i><br>피곤</div>
						<div onclick='moodclick(5)' class=mood id=m-5><i class="fa fa-cloud" aria-hidden="true"></i><br>슬픔</div>
						<div onclick='moodclick(6)' class=mood id=m-6><i class="fa fa-bolt" aria-hidden="true"></i><br>화남</div>
				</div>
			</center>

			<input id=upload name=upload type=file accept="image/*" capture="camera">	
			<div id=photodiv>
				<div id=photo onclick='photo()'>
					<div id=floater>
						<img src='img/picture.png' id=picture onclick='pictureClick()'>
						<img src='img/camera.png' id=camera onclick='cameraClick()'>
					</div>
					<img src='img/plus.png' id=img-plus>
					<p id=imgment>오늘하루 당신의 가장 의미있는 사진은?</p>
				</div>
				<center>
					<img id=realimg onclick='realimgClick(this)'>
					<img src='img/cancel.png' id=cancel onclick='cancelClick()'>
				</center>
			</div>
			<textarea placeholder="하루를 55자로 기록하세요." name=tarea id=tarea maxlength=55 onKeyDown=keypress(this) onClick='keypress(this);document.getElementById("notice").style.display="inline-block";'></textarea>
		</form>
		<center>
		<table border=1 onClick=tableclick()>
			
			<div id=notice-parent>
				<p id=notice>작성이 완료되면 여기를 눌러주세요</p>
			</div>
			
			<?
				for($i=0;$i<5;$i++)
				{	echo "<tr>";
					for($j=0;$j<11;$j++)
					{
						$idx=$i*11+$j;
						echo "<td id=$idx class=block></td>";
					}
					echo "</tr>";
				}
			?>
		</table>
		</center>
		<center>
		<div id=bottom-parent>
			
				<p id=bottom-img class=bottom onclick=imgclick()><!--<img class=bottom-s src=img/bottom-pic.png>//-->전체보기</p>
				<p id=bottom-text class=bottom onclick=textclick()><!--<img class=bottom-s src=img/bottom-text.png>//-->글보기</p>
				<p id=complete class=bottom onclick=send()><!--<img class=bottom-s src=img/bottom-check.png>//-->완료</p>
			
		</div>
		</center>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="jquery.animate-colors-min.js"></script>
	<script type="text/javascript" src="js/write.js"></script>
</body>
</html>
