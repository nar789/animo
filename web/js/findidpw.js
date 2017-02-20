var id=document.getElementById('id');
var pw=document.getElementById('pw');

function inputclick(obj){
	obj.value="";

		
}

function enter(){
	if(event.keyCode==13){
		findpw();
	}
}

function findpw()
{
	if(id.value=="" || id.value=="아이디를 입력해주세요" )
	{
		alert("아이디를 입력해주세요.")
		return;
	}
  $.get("mailsend.php",
	{
	  id: id.value
	},
	function(data,status){
		alert(data);
	});
}