function init(){


	var url=document.getElementById('url').value;
	document.getElementById('img').src=url;

	(function() {
          var $section = $('section').first();
          $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset")
          });
        })();

}

function closeimg(){
	history.back();
}
window.onload=init()