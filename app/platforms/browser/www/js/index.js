var hume="http://hume.co.kr/animo/";
var imguri2;
var myid="";
var db;
var starturl;
var statBackUrl=0;
var statStatus;
var admobid={};

//카메라 관련모듈. 
var win = function (r) {
    var url=r.response;
    var options = new FileUploadOptions();
    options.fileKey = "upload";
    options.fileName=imguri2.substr(imguri2.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var ft = new FileTransfer();       
    ft.upload(imguri2, encodeURI(hume+"upload.php"), win2, fail, options);
}
var win2 = function (r) {
    var url=r.response;
    document.getElementById('iframe').contentWindow.postMessage(url,"*");
}
var fail = function (error) {
    alert("An error has occurred: Code = " + error.code);
    alert("upload error source " + error.source);
    alert("upload error target " + error.target);
}
function cameraSuccess(imguri){
	imguri2=imguri;
    imguri=imguri.replace('.jpg','_thumb.jpg');
    var options = new FileUploadOptions();
    options.fileKey = "upload";
    options.fileName = imguri.substr(imguri.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var ft = new FileTransfer();
    ft.upload(imguri, encodeURI(hume+"upload.php"), win, fail, options);
}
function cameraError(error){
	alert(error);
}
//카메라 관련모듈. 



//db관련모듈 /////
function dbinit(){ //database init.
    db = sqlitePlugin.openDatabase('login.db', '1.0', '', 1);
    db.transaction(function (txn) {
        txn.executeSql('create table if not exists login(id text)', [], function (tx, res) {
        });
        txn.executeSql('insert into login values(?)', [''], function (tx, res) {
	     });
    });
}
function checkLoginStatus(success){
    db.transaction(function (txn) {
        txn.executeSql('select * from login', [], function (tx, res) {
            var id=res.rows.item(0).id;
            myid=id;
            success(id);
        });
    });
}
function setLoginStatus(id){
    db.transaction(function (txn) {
        txn.executeSql('update login set id=?', [id], function (tx, res) {
            myid=id;
            welcomeinit();
        });
    });
}
//////////////////////////////ㅇdb관련모듈. 



function welcomeinit(){
	document.getElementById('welcome').innerHTML="<i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i>&nbsp;"+myid+"님 환영합니다.";
}

function hidesidemenu(){
	document.getElementById('sidemenu').style.display="none";
	document.getElementById('sideback').style.display="none";
}
function showsidemenu(){
	document.getElementById('sidemenu').style.display="block";
	document.getElementById('sideback').style.display="block";
}
function listClick(){
	var todaymonth=new Date().getMonth()+1;
	var curyear=new Date().getFullYear();
	var url=hume+"list.php?id="+myid+"&month="+todaymonth+"&year="+curyear;
	document.getElementById('iframe').src=url;
}
function writeClick(){
	var url=hume+"write.php";
	document.getElementById('iframe').src=url;
}
function loginClick(){
	if(confirm("로그아웃 하시겠습니까?")==true){
		var url=hume+"login.php";
		document.getElementById('iframe').src=url;	
	}
}
function statClick(){
	var url=hume+"stat.php?id="+myid;
	document.getElementById('iframe').src=url;		
}
function admobinit(){
	if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos 
	  admobid = {
	    banner: 'ca-app-pub-7665755949380740/6338308070',
	    interstitial: 'ca-app-pub-7665755949380740/2389446470',
	  };
	} else {  // for ios 
	  admobid = {
	    banner: 'ca-app-pub-7665755949380740/6338308070',
	    interstitial: 'ca-app-pub-7665755949380740/2389446470',
	  };
	}
	/*
	AdMob.setOptions({
		publisherId:admobid.banner,
		bannerAtTop: false,  // set to true, to put banner at top 
		overlap: true,  // set to true, to allow banner overlap webview 
		offsetTopBar: false,  // set to true to avoid ios7 status bar overlap 
		isTesting:false,
		autoShow: false  // auto show interstitial ad when loaded 
	});*/
	
	AdMob.prepareInterstitial({
	  interstitialAdId: admobid.interstitial,
	  autoShow: false
	});	

	//AdMob.createBannerView();
}
document.addEventListener('onReceiveAd', function() {AdMob.showAd(false);});
//document.addEventListener('onReceiveInterstitialAd', function() {alert("R");});
document.addEventListener('onDismissInterstitialAd', function() {
	AdMob.prepareInterstitial({
	  interstitialAdId: admobid.interstitial,
	  autoShow: false
	});
});

function ShowBannerAd(){
	AdMob.showAd(true);
}

function ShowInterstitialAd(){
	AdMob.showInterstitial();
}

function sidemenuinit(){
	document.getElementById('pfimg').addEventListener("click",function(){
			hidesidemenu();
			updateInfo();
		},false);
	document.getElementById('list').addEventListener("click",function(){
			hidesidemenu();
			listClick();
		},false);
	document.getElementById('write').addEventListener("click",function(){
		hidesidemenu();
		writeClick();
	},false);
	document.getElementById('stat').addEventListener("click",function(){
		hidesidemenu();
		statClick();
	},false);
	document.getElementById('hide').addEventListener("click",function(){
		hidesidemenu();
	},false);
	document.getElementById('logout').addEventListener("click",function(){
		hidesidemenu();
		loginClick();
	},false);
	document.getElementById('sideback').addEventListener("click",function(){
		hidesidemenu();
	},false);
	document.getElementById('exit').addEventListener("click",function(){
		hidesidemenu();
		navigator.app.exitApp();
	},false);
}

function updateInfo(){
	document.getElementById('iframe').contentWindow.location.href=hume+"update.php?id="+myid;
}

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
		document.addEventListener("showkeyboard", this.onKeyboardShow, false);
    	document.addEventListener("hidekeyboard", this.onKeyboardHide, false);
    },
    onDeviceReady: function() {
    	

    	dbinit();
		var iframe=document.getElementById('iframe');
		sidemenuinit();
		
		checkLoginStatus(function(e){
			welcomeinit();
			admobinit();
			if(e){
				var todaymonth=new Date().getMonth()+1;
				var todayyear=new Date().getFullYear();
				var url=hume+"list.php?id="+e+"&month="+todaymonth+"&year="+todayyear;
				starturl=url;
				iframe.src=url;
			}else{
				url=hume+"login.php";
				iframe.src=url;
			}
		});
		window.onmessage=function(e){
			if(e.data.substring(0,1)=="{"){
				var j=JSON.parse(e.data);
			 	if(j.type){
			 		statBackUrl=1;
			 		statStatus=j;
			 	}
			}
			if(e.data=="setStatus-folder")
				app.setStatus("#cc324c");
			else if(e.data=="setStatus-write")
				app.setStatus("#3469af");
			else if(e.data=="get"){
				iframe.contentWindow.postMessage(myid,"*");
			}else if(e.data=="showloading"){
				document.getElementById('loading').style.display="block";
			}else if(e.data=="hideloading"){
				document.getElementById('loading').style.display="none";
			}else if(e.data=="pf-img-click-camera"){
				var options={
    				quality: 50,
			        destinationType: Camera.DestinationType.FILE_URI,
			        // In this app, dynamically set the picture source, Camera or photo gallery
			        sourceType: Camera.PictureSourceType.CAMERA,
			        encodingType: Camera.EncodingType.JPEG,
			        mediaType: Camera.MediaType.PICTURE,
			        allowEdit: true,
			        correctOrientation: true  //Corrects Android orientation quirks
    			};
    			navigator.camera.getPicture(cameraSuccess,cameraError,options);
			}else if(e.data=="pf-img-click"){
				var options={
    				quality: 50,
			        destinationType: Camera.DestinationType.FILE_URI,
			        // In this app, dynamically set the picture source, Camera or photo gallery
			        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			        encodingType: Camera.EncodingType.JPEG,
			        mediaType: Camera.MediaType.PICTURE,
			        allowEdit: true,
			        correctOrientation: true  //Corrects Android orientation quirks
    			};
    			navigator.camera.getPicture(cameraSuccess,cameraError,options);
			}else if(e.data=="side-menu-show"){
				showsidemenu();
			}else if(e.data=="side-menu-hide"){
				hidesidemenu();
			}else if(e.data=="full-screen-ad"){
				ShowInterstitialAd();
			}else if(e.data=="banner-ad"){
				ShowBannerAd();
			}else if(e.data=="hide-ad"){
				AdMob.showAd(false);
			}
			
			var div=e.data.split(":");
			if(div[0]=="put"){
				if(!starturl){
					var todaymonth=new Date().getMonth()+1;
					var todayyear=new Date().getFullYear();
					var url=hume+"list.php?id="+div[1]+"&month="+todaymonth+"&year="+todayyear;
					starturl=url;
				}
				setLoginStatus(div[1]);
			}
			
		}
    },
    onKeyboardShow:function(){
		
		console.log("asdf");
    },
    onKeyboardHide:function(){
    	
    	console.log("asdf");
    },
	setStatus:function(color){
		 StatusBar.backgroundColorByHexString(color);
	},
	onBack:function(){
		alert('c');
		//Ads Test///////////////////////
		//ShowInterstitialAd();
		//ShowBannerAd();
		//return;
		//////////////////////////////


		//alert(document.getElementById('iframe').contentWindow.location);
		if(document.getElementById('sidemenu').style.display=="block")
		{
			hidesidemenu();
			return;
		}
		if(document.getElementById('loading').style.display=="block"){
			document.getElementById('loading').style.display="none";
			return;
		}
		if(document.getElementById('iframe').contentWindow.location!=starturl){
			var url=document.getElementById('iframe').contentWindow.location.href.toString();
			/*
			if(url.indexOf("write")>0)
			{
				AdMob.showAd(false); 
			}*/
			if(statBackUrl && url.indexOf("write")>0){
				var j=statStatus;
				var url=hume+"stat.php?id="+myid+"&type="+j.type+"&stxt="+j.stxt+"&etxt="+j.etxt+"&month="+j.month+"&year="+j.year+"&feel="+j.feel;
				document.getElementById('iframe').contentWindow.location.replace(url);
				statBackUrl=0;
			}else{
				document.getElementById('iframe').contentWindow.history.back();
			}
		}
		else
			navigator.app.exitApp();
		/*
		var url=iframe.contentWindow.location.href;

		var hume="http://hume.co.kr/animo/";
		var url2=url.split("?");
		url=url2[0];

		if(document.getElementById('sidemenu').style.display=="block"){
			hidesidemenu();
			return;
		}
		
		if(url==hume+"join.php")
			iframe.contentWindow.location.replace(hume+"login.php");
		else if(url==hume+"write.php"){
			var todaymonth=new Date().getMonth()+1;
			var u=hume+"list.php?id="+myid+"&month="+todaymonth;
			iframe.src=u;
			//iframe.contentWindow.location.replace(hume+"list.php?id="+id+"&month="+(new Date().getMonth()+1));
		}
		else{
			navigator.app.exitApp();
		}*/
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


