function ShutDown () {
	this.eleShow = document.getElementsByClassName("show_image");
	this.shutDownWindow = document.getElementById("shutdown");
	this.exit= document.getElementById("exit");
}

ShutDown.prototype.open= function (){
	var exit= this.exit;
	var that = this;
	exit.addEventListener("click", function(e){
		var sw= that.shutDownWindow;
		
		sw.style.display="none";

		var articleOnshutdown = document.querySelector("div#shutdown article");
		articleOnshutdown.parentNode.removeChild(articleOnshutdown);
	});
}


ShutDown.prototype.shut = function() {

	for(var i=0; i< this.eleShow.length; i++){
		var that = this;
		var position = document.querySelector("div#shutdown");
		(function(i) {
			var eleShow = that.eleShow[i];
			eleShow.addEventListener("click", function(e){
				var top = window.pageYOffset;
				console.log(top);
				that.shutDownWindow.style.display= "table";
				that.shutDownWindow.style.zIndex="400";
				that.shutDownWindow.style.top= top+"px";

				var clone= eleShow.parentNode.parentNode.cloneNode(true);
				
				var img = clone.getElementsByClassName("waitImg");
				  for (var k = img.length - 1; k >= 0; k--) {
				    var item = img[k];
				    item.parentNode.removeChild(item);
				  }
				position.insertAdjacentElement("beforeEnd", clone);
			}, true);
		})(i);		
	}
	

	var btt = new Bottom();
	var selectedArticle = document.querySelector("div#shutdown article")
	//클릭된 이미지의 부모 아티클이 인자로 들어가야 한다. 
	btt.switchImg(selectedArticle);

}




/*

var UserScrollDisabler = function() {

    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    // left: 37, up: 38, right: 39, down: 40
    this.scrollEventKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

};


*/
/*
    ShutDown.prototype.disable_scrolling = function() {
        var t = this;
        window.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler", this._handleWheel);
        document.on("mousewheel.UserScrollDisabler touchmove.UserScrollDisabler", this._handleWheel);
        document.on("keydown.UserScrollDisabler", function(event) {
        	t._handleKeydown.call(t, event);
        });
    }
*/

/*
    enable_scrolling : function() {
        var t = this;
        t.$window.off(".UserScrollDisabler");
        t.$document.off(".UserScrollDisabler");
    },

    _handleKeydown : function(event) {
        for (var i = 0; i < this.scrollEventKeys.length; i++) {
            if (event.keyCode === this.scrollEventKeys[i]) {
                event.preventDefault();
                return;
            }
        }
    },

*/

/*
    ShutDown.prototype._handleWheel = function(event) {
        event.preventDefault();
    };
*/


window.addEventListener("load",  function(){
	var sd = new ShutDown ();
	sd.open();
	sd.shut();



});
