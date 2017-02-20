<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/imgview.css">
</head>
<body>
	
	<input type=hidden id=url value=<?=$_GET['url']?>>



	<section>
      <div class="parent">
        <div class="panzoom">
          <table id=t>
            <td id=img-group>
              <img id=img width=100%>          
            </td>
          </table>
        </div>
      </div>
     <!--
      <div class="buttons">
        <button class="zoom-in">Zoom In</button>
        <button class="zoom-out">Zoom Out</button>
        <input type="range" class="zoom-range">
        <button class="reset">Reset</button>
      </div>
    //-->
    </section>

    <div id=close onclick='closeimg()'><img src=img/bigcancel.png></div>  
	
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
	<!--<script type="text/javascript" src="js/jquery.panzoom.min.js"></script>//-->
  <script type="text/javascript" src="js/panzoom.js"></script>
	<script type="text/javascript" src="js/imgview.js"></script>
</body>
</html>
