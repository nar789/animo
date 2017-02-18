parent.postMessage("setStatus-write","*");
var url="";
var content="";
var feel=50;
var id="";
var no="";
var date="";
var denied=0;
var writedenied=1;

window.onmessage=function(e){
	id=e.data;
	if(writedenied==1){
		parent.postMessage("showloading","*");
		checkprivwrite();
	}
}
function getId(){
	window.parent.postMessage("get","*");	
}

function del()
{
	 $.post("delete.php",
    {
		no:no
    },
    function(data, status){
        alert(data);
		location.replace('list.php?id='+id);
    });
}

function init()
{
	url=location.href;
	var up=url.split('?');
	if(!up[1])
		return;
	writedenied=0;
	var p=up[1].split('&');
	var p1=p[0].split('=');
	var p2=p[1].split('=');
	var p3=p[2].split('=');
	url=p1[1];
	content=p2[1];
	content=decodeURIComponent(content);
	
	feel=p3[1];
	feel=decodeURI(feel);
	var r=document.getElementById('range');
	r.value=feel;
		
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
	photo.style.display="none";
	tarea.style.display="none";
	realimg.style.display="block";
	realimg.src=url;
	
	var bi=document.getElementById('bottom-img');
	var bt=document.getElementById('bottom-text');
	bi.style.backgroundColor="#535c7d";
	bt.style.backgroundColor="#394263";
	
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
		
		if(today!=date){
			document.getElementById('bottom-parent').style.display="none";
			denied=1;
			r.disabled=true;
		}
		
		var del=document.getElementById('delete');
		del.style.display="block";
	}
	feelchange(r);
	parent.postMessage("hideloading","*");
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
function photo(){	
	if(denied==1)
		return;
	var upload=document.getElementById('upload');
	upload.click();
	$('#upload').change(function(e){
		parent.postMessage("showloading","*");
		document.upload.submit();
	});
}
function tableclick()
{
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
	var bi=document.getElementById('bottom-img');
	var bt=document.getElementById('bottom-text');
	var tarea=document.getElementById('tarea');
	var photo=document.getElementById('photo');
	var realimg=document.getElementById('realimg');
	var notice=document.getElementById('notice');
	notice.style.display="none";
	bi.style.backgroundColor="#535c7d";
	bt.style.backgroundColor="#394263";
	tarea.style.display="none";
	if(tarea.value=="소중한 일기를 작성해보세요.")
		tarea.value="";
	if(realimg.src){
		realimg.style.display="block";
		photo.style.display="none";
	}
	else{
		realimg.style.display="none";
		photo.style.display="block";
	}
		
}
function textclick(){
	var bi=document.getElementById('bottom-img');
	var bt=document.getElementById('bottom-text');
	var tarea=document.getElementById('tarea');
	var photo=document.getElementById('photo');
	var realimg=document.getElementById('realimg');
	bi.style.backgroundColor="#394263";
	bt.style.backgroundColor="#535c7d";
	realimg.style.display="none";
	tarea.style.display="block";
	photo.style.display="none";
}
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

	
}
function send(){
	var realimg=document.getElementById('realimg');
	var tarea=document.getElementById('tarea');
	var range=document.getElementById('range');
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
		no:no
    },
    function(data, status){
        
		location.replace('list.php?id='+id);
    });
}

function checkprivwrite()
{
	 $.post("denied.php",
    {
		id:id
    },
    function(data, status){
		parent.postMessage("hideloading","*");
        if(data=="denied")
			location.replace('list.php?id='+id);
    });
}
init();
getId();
