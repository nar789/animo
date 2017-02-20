var id=document.getElementById('id');
var pw=document.getElementById('pw');
var email=document.getElementById('email');

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
		join();
	}
}

function join(){
	if(id.value=="" || id.value=="아이디를 입력해주세요" || pw.value=="" || pw.value=="비밀번호를 입력해주세요" || email.value=="" || email.value=="이메일을 입력해주세요")
	{
		alert("아이디 또는 비밀번호,이메일을 입력해주세요.")
		return;
	}
	if(id.value.length<4 || pw.value.length<4)
	{
		alert("아이디 또는 비밀번호를 네 글자 이상으로 입력해주세요.");
		return;
	}
	if(email.value.indexOf("@")<0){
		alert("정상적인 이메일 주소를 입력해주세요.");
		return;
	}
  $.post("join-proc.php",
	{
	  id: id.value,
	  pw: pw.value,
	  email:email.value
	},
	function(data,status){
		alert(data);
		data=data.split(':');
		if(data[0]=="success"){
			//location.replace("login.php");
			window.parent.postMessage("put:"+id.value,"*");
			var m=new Date().getMonth()+1;
			var y=new Date().getFullYear();
			location.replace("list.php?id="+id.value+"&month="+m+"&year="+y);
		}
	});
}