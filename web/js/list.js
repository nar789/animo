function imgclick(url,content,no,date,feel){
	//content=encodeURIComponent(content);
	content=content.replace(/\+/gi,"%20");
	parent.postMessage("showloading","*");

	location.href='write.php?url='+url+'&content='+content+'&feel='+feel+'&no='+no+'&date='+date+"&year="+year;
}


function hideside(){
	window.parent.postMessage("side-menu-hide","*");	
}
function menuClick(){
	window.parent.postMessage("side-menu-show","*");	
}
function wr(){	
	parent.postMessage("showloading","*");
	 $.post("denied.php",
    {
		id:id
    },
    function(data, status){
        if(data.substring(0,1)=="{"){
        	var j=JSON.parse(data);
        	if(j.no){
        		var url=j.img;
        		var content=j.content;
        		var feel=j.feel;
        		var no=j.no;
        		var date=j.wdate;

        		date=date.substring(5,10);
        		date=date.replace("-","월");
        		date=date+"일";
        		
        		parent.postMessage("showloading","*");
        		content=encodeURIComponent(content);
        		content=content.replace(/\+/gi,"%20");
        		location.href='write.php?url='+url+'&content='+content+'&feel='+feel+'&no='+no+'&date='+date+"&year="+year;
        	}
        }
		else{
			location.href='write.php';
		}
		parent.postMessage("hideloading","*");
    });
}

function calendarInit(){
	document.getElementById('month').innerText=year+"년"+month+"월";
}

function leftclick(){
	if(month-1>0){
		location.href="list.php?id="+id+"&month="+(month-1)+"&year="+year;
    }else{
        month=12;
        year--;
        location.href="list.php?id="+id+"&month="+month+"&year="+year;
    }
}

function rightclick(){
	if(month+1<=12){
		location.href="list.php?id="+id+"&month="+(month+1)+"&year="+year;
    }else{
        month=1;
        year++;
        location.href="list.php?id="+id+"&month="+month+"&year="+year;
    }
}

calendarInit();