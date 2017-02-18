var id="";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('backbutton', this.onBack, false);
    },
    onDeviceReady: function() {
		var iframe=document.getElementById('iframe');
		window.onmessage=function(e){
			if(e.data=="setStatus-folder")
				app.setStatus("#cc324c");
			else if(e.data=="setStatus-write")
				app.setStatus("#3469af");
			else if(e.data=="get"){
				iframe.contentWindow.postMessage(id,"*");
			}else if(e.data=="showloading"){
				document.getElementById('loading').style.display="block";
			}else if(e.data=="hideloading"){
				document.getElementById('loading').style.display="none";
			}
			
			var div=e.data.split(":");
			if(div[0]=="put")
				id=div[1];
			
		}
    },
	setStatus:function(color){
		 StatusBar.backgroundColorByHexString(color);
	},
	onBack:function(){
		var url=iframe.contentWindow.location.href;
		var hume="http://hume.co.kr/animo/";
		var url2=url.split("?");
		url=url2[0];
		if(url==hume+"join.php")
			iframe.contentWindow.location.replace(hume+"login.php");
		else if(url==hume+"write.php"){
			iframe.contentWindow.location.replace(hume+"list.php?id="+id);
		}
		else{
			navigator.app.exitApp();
		}
	}
};

function onSuccess(imageURI) {
	var img=document.getElementById('img');
	img.style.display="inline";
	img.src=imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

app.initialize();


