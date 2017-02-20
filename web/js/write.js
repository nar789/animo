//parent.postMessage("setStatus-write","*");
var url="";
var content="";
var feel=50;
var id="";
var no="";
var date="";
//var denied=0;
//var writedenied=1;
var todayreload=0;

function hideside(){
	window.parent.postMessage("side-menu-hide","*");	
}
function menuClick(){
	window.parent.postMessage("side-menu-show","*");	
}

function titleclick(){
	history.back();
}

function AllMoodImgHide(){
	for(var i=1;i<=6;i++){
		//var img=document.getElementById("m-"+i+"-img");	
		//img.style.display="none";
		//document.getElementById("m-"+i).style.lineHeight="40px";
		//document.getElementById("m-"+i).style.marginTop="5px";
		//document.getElementById("m-"+i).style.width="40px";
		//document.getElementById("m-"+i).style.height="40px";
		//document.getElementById("m-"+i).style.opacity="0.3";
		//document.getElementById("m-"+i).style.color="white";
		document.getElementById("m-"+i).style.backgroundColor="grey";
	}
}

function chartclick(){
	location.href="stat.php?id="+id;
}

function moodclick(idx){
	document.getElementById('range').value=idx;
	
	AllMoodImgHide();
	var obj=document.getElementById("m-"+idx);
	if(idx==1)
		obj.style.backgroundColor="#ff9ccb";
	else if(idx==2)
		obj.style.backgroundColor="#e9de23";
	else if(idx==3)
		obj.style.backgroundColor="#32b700";
	else if(idx==4)
		obj.style.backgroundColor="#07004c";
	else if(idx==5)
		obj.style.backgroundColor="#5500a0";
	else
		obj.style.backgroundColor="#9b0000";
	//document.getElementById("m-"+idx).style.opacity="1.0";
	//document.getElementById("m-"+idx).style.color="white";
	/*
	document.getElementById("m-"+idx).style.marginTop="0px";
	document.getElementById("m-"+idx).style.lineHeight="50px";
	document.getElementById("m-"+idx).style.width="50px";
	document.getElementById("m-"+idx).style.height="50px";
	*/
	//var img=document.getElementById("m-"+idx+"-img");
	//img.style.display="block";
}

window.onmessage=function(e){
	var msg=e.data;
	var type=msg.split(':')[0];
	if(type=="http")
	{
		document.getElementById('realimg').src=msg;
		document.getElementById('photo').style.display="none";
		document.getElementById('realimg').style.display="block";
		document.getElementById('cancel').style.display="inline-block";
	}else{
		id=e.data;
		if(todayreload)
			checkprivwrite();
	}


	/*
	if(writedenied==1){
		parent.postMessage("showloading","*");
		checkprivwrite();//내가 쓸수있는가?
	}*/
}
function getId(){
	window.parent.postMessage("get","*");	
}

function del()
{
	if(confirm("삭제 하시겠습니까?")==true){
		parent.postMessage("showloading","*");

		 $.post("delete.php",
	    {
			no:no
	    },
	    function(data, status){
	    	parent.postMessage("hideloading","*");
	        alert(data);
	        var curmonth=new Date().getMonth()+1;
	        var y=new Date().getFullYear();
			location.replace('list.php?id='+id+"&month="+curmonth+"&year="+y);
	    });
	}
}

function init()
{
	if(!year)
		year=new Date().getFullYear();
	url=location.href;
	moodclick(1);
	var up=url.split('?');
	if(!up[1]){
		todayreload=1;
		return;
	}
	//writedenied=0;
	var p=up[1].split('&');
	var p1=p[0].split('=');
	var p2=p[1].split('=');
	var p3=p[2].split('=');
	url=p1[1];
	content=p2[1];
	content=decodeURIComponent(content);
	
	feel=p3[1];
	feel=decodeURI(feel);
	if(feel>0 && feel<=6)
		moodclick(feel);
	else
		moodclick(1);
	//var r=document.getElementById('range');
	//r.value=feel;
		
	var edit=document.getElementById('tarea');
	edit.value=content;
	var i=0;
	for(i=0;i<55;i++){
		var cur=document.getElementById(i+"");
		cur.innerText=edit.value.substring(i,i+1);
	}
	if(edit.value.length>=56){
		alert('소중한 추억을 오직 55자로 표현해주세요.');
		edit.value=edit.value.substring(0,54);
		return;
	}
	var len=document.getElementById('len');
	len.innerText=edit.value.length+"/55";
	var photo=document.getElementById('photo');
	var realimg=document.getElementById('realimg');
	var tarea=document.getElementById('tarea');
	var tarea=document.getElementById('cancel');
	
	tarea.style.display="none";
	
	if(url){
		photo.style.display="none";
		realimg.style.display="block";
		cancel.style.display="inline-block";
		realimg.src=url;
	}

/*	
	var bi=document.getElementById('bottom-img');
	var bt=document.getElementById('bottom-text');
	bi.style.backgroundColor="#535c7d";
	bt.style.backgroundColor="#394263";
	*/

	//updaste.
	if(p[3])
	{
		var p4=p[3].split('=');
		no=p4[1];
		no=decodeURI(no);
		var noinput=document.getElementById('no');
		noinput.value=no;
				
	}
	if(p[4]){
		
		var p5=p[4].split('=');
		date=p5[1];
		date=decodeURI(date);
		
		var curMonth=new Date().getMonth()+1;
		var curDate=new Date().getDate();
		var today=curMonth+"월"+curDate+"일";
		
		var title=document.getElementById('t-text');
		title.innerText=date;

		var adFlag=false;
		if(year!=new Date().getFullYear())
			adFlag=true;
		else{
			var s=date.split("월");
			var m=parseInt(s[0]);
			if(m!=curMonth)
				adFlag=true;
			else{
				var s2=s[1].split("일");
				var d=parseInt(s2[0]);
				if(d!=curDate)
					adFlag=true;
			}
		}
		if(adFlag && !content){
			//document.getElementById('bottom-parent').style.display="none";
			//denied=1;
			//r.disabled=true;
			AdMobInit(1);
		}
		/*else{
			//AdMobInit(0);
		}*/
		
		var del=document.getElementById('delete');
		del.style.display="block";
	}
	//feelchange(r);
	parent.postMessage("hideloading","*");
}

function AdMobInit(f){	
	var msg="";
	if(f==1){
		msg="full-screen-ad";
	}else{
		msg="banner-ad";
	}
	window.parent.postMessage(msg,"*");
}


function keypress(edit){
	if(edit.value=="소중한 일기를 작성해보세요.")
		edit.innerText="";
	var i=0;
	for(i=0;i<55;i++){
		var cur=document.getElementById(i+"");
		cur.innerText=edit.value.substring(i,i+1);
	}
	if(edit.value.length>=56){
		alert('소중한 추억을 오직 55자로 표현해주세요.');
		edit.value=edit.value.substring(0,54);
		return;
	}
	var len=document.getElementById('len');
	len.innerText=edit.value.length+"/55";
}
function pictureClick(){	
	//if(denied==1)
	//	return;

	window.parent.postMessage("pf-img-click","*");
}
function cameraClick(){	
	//if(denied==1)
//		return;

	window.parent.postMessage("pf-img-click-camera","*");
}
function cancelClick(){
	if(confirm("사진을 지우시겠습니까?")==true){
		document.getElementById('photo').style.display="block";
		document.getElementById('realimg').style.display="none";
		document.getElementById('cancel').style.display="none";
	}
}


function tableclick()
{
	//document.getElementById('complete').style.display="nonoe";
	document.getElementById('bottom-img').style.display="block";
	if(document.getElementById('photodiv').style.display!="none")
	{
		textclick();
		return;
	}
	var edit=document.getElementById('tarea');
	var notice=document.getElementById('notice');
	notice.style.display="none";
	var i=0;
	for(i=0;i<55;i++){
		var cur=document.getElementById(i+"");
		cur.innerText=edit.value.substring(i,i+1);
	}
	if(edit.value.length>=56){
		alert('소중한 추억을 오직 55자로 표현해주세요.');
		edit.value=edit.value.substring(0,54);
		return;
	}
	var len=document.getElementById('len');
	len.innerText=edit.value.length+"/55";
}

function imgclick(){
	//document.getElementById('complete').style.display="block";
	document.getElementById('bottom-img').style.display="none";
	var bi=document.getElementById('bottom-img');
	var bt=document.getElementById('bottom-text');
	var tarea=document.getElementById('tarea');
	var photo=document.getElementById('photo');
	var realimg=document.getElementById('realimg');
	var notice=document.getElementById('notice');
	var photodiv=document.getElementById('photodiv');
	notice.style.display="none";
	/*
	bi.style.backgroundColor="lightpink";
	bt.style.backgroundColor="#efefef";
	*/
	tarea.style.display="none";
	photodiv.style.display="block";
	/*
	if(tarea.value=="소중한 일기를 작성해보세요.")
		tarea.value="";
	if(realimg.src){
		realimg.style.display="block";
		photo.style.display="none";
	}
	else{
		realimg.style.display="none";
		photo.style.display="block";
	}*/
		
}
function textclick(){
	var bi=document.getElementById('bottom-img');
	var bt=document.getElementById('bottom-text');
	var tarea=document.getElementById('tarea');
	var photo=document.getElementById('photo');
	var realimg=document.getElementById('realimg');
	var photodiv=document.getElementById('photodiv');
	/*
	bi.style.backgroundColor="#efefef";
	bt.style.backgroundColor="lightpink";
	*/
	//realimg.style.display="none";
	tarea.style.display="block";
	photodiv.style.display="none";
	document.getElementById("notice").style.display="inline-block";
	tarea.focus();
	//photo.style.display="none";
}
/*
function feelchange(r)
{
	feel=r.value;
	var ftext=document.getElementById('f-text');
	if(feel>50){
		r.style.backgroundColor="rgb(50,50,"+(155-feel)+")";	
		ftext.style.paddingLeft="20%";
		ftext.style.textAlign="left";
		ftext.innerText="SAD"+(((feel-50)/50)*100)+"%";
	}
	else{
		var red=229-feel;
		var g=118-feel;
		var b=167-feel;
		r.style.backgroundColor="rgb("+red+","+g+","+b+")";	
		ftext.style.paddingLeft="0%";
		ftext.style.textAlign="right";
		ftext.innerText="HAPPY"+(((50-feel)/50)*100)+"%";
	}

	
	}*/


function realimgClick(img){

	location.href="imgview.php?url="+img.src;
}

function send(){
	var realimg=document.getElementById('realimg');
	var tarea=document.getElementById('tarea');
	var range=document.getElementById('range');
	//var year=new Date().getFullYear();
	var date=document.getElementById('t-text').innerText;
	if(date.indexOf("월")>0){
		date=date.substring(0,date.length-1);
		date=date.replace("월","-");
		date=year+"-"+date;
	}else
		date="";
	if(tarea.value=="" || realimg.src=="")
	{
		alert("의미있는 사진과 내용을 채워주세요.");
		return;
	}
	url=realimg.src;
	content=tarea.value;
	feel=range.value;
	 $.post("write-proc.php",
    {
        id:id,
        content:content,
		url:url,
		feel:feel,
		no:no,
		date:date
    },
    function(data, status){
    	alert(data);
        var curmonth=new Date().getMonth()+1;
        var y=new Date().getFullYear();
		location.replace('list.php?id='+id+"&month="+curmonth+"&year="+y);
    });
}

function checkprivwrite()
{
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
        		location.replace('write.php?url='+url+'&content='+content+'&feel='+feel+'&no='+no+'&date='+date);
        	}
        }
		parent.postMessage("hideloading","*");
    });
}
init();
getId();
