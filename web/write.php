<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/slide.css">
	<link rel="stylesheet" type="text/css" href="css/write.css">
	<script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
</head>
<body>
	<h1 id=title><p id=t-text>일기작성</p><p id=delete onclick=del()>삭제</p><len id='len'>0/55</len></h1>
	<form name="upload" action="upload.php" method="post" enctype="multipart/form-data">
		<input type=hidden name=no id=no></input>
		<input id=range name=range type=range class=slider onchange='feelchange(this)' value=50 min=0 max=100>
			<img src='img/happy.png' id=img-happy>
			<img src='img/sad.png' id=img-sad>
			<p id=f-text>HAPPY0%</p>
		</input>
		<input id=upload name=upload type=file accept="image/*" capture="camera">	
		<div id=photo onClick='photo();'>
			<div id=floater></div>
			<img src='img/plus.png' id=img-plus>
			<p>오늘하루 당신의 가장 의미있는 장면은?</p>
		</div>
		<center><img id=realimg onclick=photo()></center>
		<textarea name=tarea id=tarea maxlength=55 onKeyDown=keypress(this) onClick='keypress(this);document.getElementById("notice").style.display="inline-block";'></textarea>
	</form>
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
	<div id=bottom-parent>
		<p id=bottom-img class=bottom onclick=imgclick()>사진</p>
		<p id=bottom-text class=bottom onclick=textclick()>내용</p>
		<p class=bottom onclick=send()>완료</p>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="jquery.animate-colors-min.js"></script>
	<script type="text/javascript" src="js/write.js"></script>
</body>
</html>
