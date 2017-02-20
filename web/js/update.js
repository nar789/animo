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

function signout(){
	if(confirm("사용자의 모든 일기가 복원되지 않습니다.\n회원탈퇴 하시겠습니까?")!=0){
		//yes
		$.post("delete-user.php",{
			id:id.value
		},function(data,status){
			alert(data);
			window.parent.postMessage("delete-user","*");
		});
	}else{
		//no
	}
}


function update(){
	
	if((pw.value=="" || pw.value=="수정할 비밀번호를 입력해주세요")&&(email.value=="" || email.value=="수정할 이메일을 입력해주세요"))
	{
		alert("수정할 비밀번호 또는 이메일을 입력해주세요.")
		return;
	}
	if(pw.value && pw.value.length<4)
	{
		alert("비밀번호를 네 글자 이상으로 입력해주세요.");
		return;
	}
	if(email.value&&email.value.indexOf("@")<0){
		alert("정상적인 이메일 주소를 입력해주세요.");
		return;
	}
  $.post("update-proc.php",
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