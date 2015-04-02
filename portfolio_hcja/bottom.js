function Bottom(){

} 



Bottom.prototype.switchImg= function(article){

	var elArrows= article.getElementsByClassName("arrow");

	var whole_page= article.getElementsByClassName("whole_page");
	var ulImgList = article.getElementsByClassName("img_list");
	var current_page = article.getElementsByClassName("current_page");
	var liLen = ulImgList[0].children.length;	
	
	whole_page[0].innerHTML = liLen;
	
	for(var i =0; i<2;i++){
		(function(that, i){
			elArrows[i].addEventListener("click", function(e) {
				//클린된 타겟의 클래스 네임을 확인해서 right면 ul의레프트 값을 옮겨준다. 
				var PAGE_DIR, LI_DIR;
				var className= e.target.parentNode.className;//className: "arrow right/left"
				console.log(className);
				var style = window.getComputedStyle(ulImgList[0]);
				style = style.left;
			
				if(className.indexOf("right") != -1){
					LI_DIR = -700;
					PAGE_DIR = 1;
			
				} else {
					LI_DIR = 700;
					PAGE_DIR = -1;
				}
				style = parseInt(style)+ LI_DIR + "px";
				var page = current_page[0].innerHTML;

				page = parseInt(page) + PAGE_DIR;
				if(page > liLen || page<=0){
					return;
				}
				current_page[0].innerHTML = page;
				ulImgList[0].style.left = style;
			});
		})(this, i);
	}
}

window.addEventListener("load", function(){

	var bt = new Bottom();
	var articles = document.getElementsByTagName("article");
	for(var i =0; i< articles.length; i++){
		bt.switchImg(articles[i]);
		console.log(articles[i]);
	}
});



