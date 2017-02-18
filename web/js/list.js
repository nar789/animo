function imgclick(url,content,no,date,feel){
	//content=encodeURIComponent(content);
	content=content.replace(/\+/gi,"%20");
	parent.postMessage("showloading","*");
	location.replace('write.php?url='+url+'&content='+content+'&feel='+feel+'&no='+no+'&date='+date);
}
function wr(){	
	 $.post("denied.php",
    {
		id:id
    },
    function(data, status){
        if(data=="denied")
			alert("오늘은 더 이상 일기를 작성할 수 없습니다.");
		else
			location.replace('write.php');
    });
}