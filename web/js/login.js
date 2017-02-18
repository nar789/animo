var id=document.getElementById('id');
var pw=document.getElementById('pw');


function login()
{
	if(id.value=="" || pw.value=="")
	{
		alert("아디이와 비밀번호를 입력해주세요.")
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
			location.replace("write.php");
		}
		else
			alert(data);
	});
}