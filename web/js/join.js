var id=document.getElementById('id');
var pw=document.getElementById('pw');

function inputclick(obj){
	obj.style.color="#592b25";
	obj.style.fontsize="30px";
	obj.value="";
	
	if(obj.id=="pw")
		obj.setAttribute("type","password");
		
}

function join(){
	if(id.value=="" || id.value=="아이디를 입력해주세요" || pw.value=="" || pw.value=="비밀번호를 입력해주세요")
	{
		alert("아이디 또는 비밀번호를 입력해주세요.")
		return;
	}
	if(id.value.length<4 || pw.value.length<4)
	{
		alert("아이디 또는 비밀번호를 네 글자 이상으로 입력해주세요.");
		return;
	}
  $.post("join-proc.php",
	{
	  id: id.value,
	  pw: pw.value
	},
	function(data,status){
		alert(data);
		data=data.split(':');
		if(data[0]=="success")
			location.replace("login.php");
	});
}