parent.postMessage("setStatus-folder","*");
var sel=document.getElementById('sel');
function liclick(li){
	var style=window.getComputedStyle(li);
	var url=style.getPropertyValue('list-style-image');
	var str=url.split('/');
	str=str[5].split('.');
	if(str[0]=="folder-sel" && sel.value==li.innerText){
		location.replace("write.php");
	}
	sel.value=li.innerText;
}
function valuezero()
{
	sel.value="";
}