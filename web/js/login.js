var id=document.getElementById('id');
var pw=document.getElementById('pw');

function inputclick(obj){
	obj.value="";
	
	if(obj.id=="pw")
		obj.setAttribute("type","password");
		
}

function move(next){
	if(event.keyCode==13){
		document.getElementById(next).focus();
	}
}
function enter(){
	if(event.keyCode==13){
		login();
	}
}

function login()
{
	if(id.value=="" || id.value=="아이디를 입력해주세요" || pw.value=="" || pw.value=="비밀번호를 입력해주세요")
	{
		alert("아이디 또는 비밀번호를 입력해주세요.")
		return;
	}
  $.post("login-proc.php",
	{
	  id: id.value,
	  pw: pw.value
	},
	function(data,status){
		if(data=="success"){
			window.parent.postMessage("put:"+id.value,"*");
			var m=new Date().getMonth()+1;
			var y=new Date().getFullYear();
			location.replace("list.php?id="+id.value+"&month="+m+"&year="+y);
		}
		else
			alert(data);
	});
}

function findpw(){
	location.href="findidpw.php";
}