window.onload = window.onresize = fitToContainer;
var type=1;
function fitToContainer(canvas){
    var div = $(mapcontext);    
    canvas.style.width=div.css("width");
    canvas.style.height=div.css("height");
    canvas.width  = canvas.offsetWidth;     // this will clear canvas
    canvas.height = canvas.offsetHeight;

    if (image && image.complete)
        ctx.drawImage(image, 0, 0);         // redraw image if loaded
}

function DrawGraph(d){

	var chart = new CanvasJS.Chart("graph",
	{
		colorSet:"animo",
		backgroundColor:"#efefef",
		data: [
		{
			type: "pie",
			/*click:dataClick,*/
			dataPoints: [
				{ x:1,y: d[1], indexLabel:"행복", mouseover:dataClick},
				{ x:2,y: d[2], indexLabel:"기쁨",mouseover:dataClick},
				{ x:3,y: d[3], indexLabel:"평온",mouseover:dataClick},
				{ x:4,y: d[4], indexLabel:"피곤",mouseover:dataClick},
				{ x:5,y: d[5], indexLabel:"슬픔",mouseover:dataClick},
				{ x:6,y: d[6], indexLabel:"화남",mouseover:dataClick}
			]
		}
		]
	});

	chart.render();
}

function dataClick(e){
		var id=document.getElementById('myid').value;
		if(e!=0)
		{
			feel=e.dataPoint.x;
		}
		else if(document.getElementById('feel').value){
			feel=document.getElementById('feel').value;
		}
		
		if(type==1)
		{
			$.post("diary-list-proc.php",{
				id:id,
				type:type,
				year:year,
				feel:feel
			},function(data,status){
				document.getElementById('diary').innerHTML=data;
				
			});
		}else if(type==2){
			$.post("diary-list-proc.php",{
				id:id,
				type:type,
				month:month,
				feel:feel
			},function(data,status){
				document.getElementById('diary').innerHTML=data;
				
			});
		}else if(type==3){
			$.post("diary-list-proc.php",{
				id:id,
				type:type,
				feel:feel,
				s:stxt,
				e:etxt
			},function(data,status){
				document.getElementById('diary').innerHTML=data;

			});
		}
		//alert(  e.dataSeries.type + ", dataPoint { x : " + e.dataPoint.x + ", y : "+ e.dataPoint.y + "}" );
	}

function menuClick(){
	window.parent.postMessage("side-menu-show","*");	
}
function LoadData(type,value){
	parent.postMessage("showloading","*");
	var id=document.getElementById('myid').value;
	var d=[0,0,0,0,0,0,0];
	$.post("stat-proc.php",{
		id:id,
		type:type,
		value:value,
		s:stxt,
		e:etxt
	},function(data,status){
		var j=JSON.parse(data);
		
		if(j.k1)
			d[1]=j.k1;
		else d[1]=0;

		if(j.k2)
			d[2]=j.k2;
		else d[2]=0;

		if(j.k3)
			d[3]=j.k3;
		else d[3]=0;

		if(j.k4)
			d[4]=j.k4;
		else d[4]=0;

		if(j.k5)
			d[5]=j.k5;
		else d[5]=0;

		if(j.k6)
			d[6]=j.k6;
		else d[6]=0;
		var flag=0;
		for(var i=0;i<=6;i++)
		{
			if(d[i]!=0){
				flag=1;
				break;
			}
		}
		if(flag==0)
		{
			document.getElementById('graph').style.display="none";
			document.getElementById('wrong').style.display="block";
		}else{
			document.getElementById('graph').style.display="block";
			document.getElementById('wrong').style.display="none";
			DrawGraph(d);
		}
		parent.postMessage("hideloading","*");
	});
}
function ChartColorSet(){

	CanvasJS.addColorSet("animo",
                [//colorSet Array
                "#ff9ccb",
                "#e9de23",
                "#32b700",
                "#07004c",
                "#5500a0",
                "#9b0000"
                ]);
}
var s,e;
var stxt;
var etxt;
var feel;
function init(){
	var d=[0,1,1,1,1,1,30];
	//alert(location.href);
	WeekInit();
	if(document.getElementById('syear').value){
		year=document.getElementById('syear').value;
	}
	if(document.getElementById('smonth').value)
		month=document.getElementById('smonth').value;

	document.getElementById('year-middle').innerText=year+"년";
	document.getElementById('month-middle').innerText=month+"월";

	ChartColorSet();
	if(document.getElementById('stype').value)
	{
		type=document.getElementById('stype').value;
		subclick(document.getElementById('stype').value);
		dataClick(0);
		
	}else{
		LoadData(1,new Date().getFullYear());
	}
	
	
	//DrawGraph(d);
}

function WeekInit(){
	//var week=new Date().getDay();
	var week=6;
	if(document.getElementById('stxt').value)
	{
		s=new Date(document.getElementById('stxt').value);
	}else{
		s=new Date();
		s.setDate(s.getDate()-week);
	}

	if(document.getElementById('etxt').value)
	{
		e=new Date(document.getElementById('etxt').value);
	}else{
    	e=new Date();
    	e.setDate(s.getDate()+6);
    }

    WeekSet(s,e);
}
function WeekSet(sdate,edate){
	var sYear = sdate.getFullYear();
    var sMonth = (sdate.getMonth()+1);
    var sDay = sdate.getDate();

    sMonth = (sMonth < 10) ? "0"+sMonth : sMonth;
    sDay = (sDay < 10) ? "0"+sDay : sDay;

    stxt = sYear + "-" + sMonth + "-" + sDay;

    var eYear = edate.getFullYear();
    var eMonth = (edate.getMonth()+1);
    var eDay = edate.getDate();

    eMonth = (eMonth < 10) ? "0"+eMonth : eMonth;
    eDay = (eDay < 10) ? "0"+eDay : eDay;

    etxt = eYear + "-" + eMonth + "-" + eDay;
    document.getElementById('week-middle').innerText=stxt+" ~ "+etxt;
}
var year=new Date().getFullYear();
var month=new Date().getMonth()+1;
var week;
init();


function YearLeftClick(){
	year--;
	document.getElementById('year-middle').innerText=year+"년";
	LoadData(1,year);	
}
function YearRightClick(){
	year++;
	document.getElementById('year-middle').innerText=year+"년";
	LoadData(1,year);
}
function MonthLeftClick(){
	if(month-1>0){
		month--;
		document.getElementById('month-middle').innerText=month+"월";
		LoadData(2,month);	
	}
}
function MonthRightClick(){
	if(month+1<=12){
		month++;
		document.getElementById('month-middle').innerText=month+"월";
		LoadData(2,month);
	}
}
function WeekLeftClick(){
	s.setDate(s.getDate()-7);
	e.setDate(e.getDate()-7);
	WeekSet(s,e);
	LoadData(3,week);
}
function WeekRightClick(){
	s.setDate(s.getDate()+7);
	e.setDate(e.getDate()+7);
	WeekSet(s,e);
	LoadData(3,week);
}

function subclick(idx){

	type=idx;

	document.getElementById('year').style.color="grey";
	document.getElementById('month').style.color="grey";
	document.getElementById('week').style.color="grey";

	document.getElementById('year').style.fontWeight="normal";
	document.getElementById('month').style.fontWeight="normal";
	document.getElementById('week').style.fontWeight="normal";

	document.getElementById('peryear').style.display="none";
	document.getElementById('permonth').style.display="none";
	document.getElementById('perweek').style.display="none";

	if(idx==1)
	{
		document.getElementById('year').style.color="black";
		document.getElementById('year').style.fontWeight="bold";
		document.getElementById('peryear').style.display="block";
		LoadData(1,year);
	}else if(idx==2){
		document.getElementById('month').style.color="black";
		document.getElementById('month').style.fontWeight="bold";
		document.getElementById('permonth').style.display="block";
		LoadData(2,month);
	}else if(idx==3){
		document.getElementById('week').style.color="black";
		document.getElementById('week').style.fontWeight="bold";
		document.getElementById('perweek').style.display="block";
		LoadData(3,week);
	}

	document.getElementById('diary').innerHTML="";
}

function ditemClick(date){
	var origin=date;
	date=date.substring(5,date.length);
	date=date.replace("-","월");
	date=date+"일"
	var id=document.getElementById('myid').value;
	parent.postMessage("showloading","*");

	//상태정보 저장
	//type stxt,etxt,month,feel,year
	var j="{\"type\":\""+type+"\",\"stxt\":\""+stxt+"\",\"etxt\":\""+etxt+"\",\"month\":\""+month+"\",\"year\":\""+year+"\",\"feel\":\""+feel+"\"}";
	window.parent.postMessage(j,"*");
	//alert(j);
	//

	$.post("load-diary.php",{
		id:id,
		date:date,
		d:origin
	},function(data,status){
		location.replace(data);
	});
	
}