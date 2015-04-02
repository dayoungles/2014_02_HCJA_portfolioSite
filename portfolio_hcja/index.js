
var count=0;

var moveRight = function() {

	var ulLists = document.getElementsByClassName("list");
	var move;
	var len = ulLists.length;
	
	for(var i = 0; i<len; i++){
		var item = ulLists[i];
		//1,2,3번에 따라서 좌, 우로 이동방향과 속도를 결정해야한다.
		var name = item.className;
		

		if(name.indexOf("left") != -1){
			if(name.indexOf("slow") != -1) {
				move = -5;
			} else {
				move = -3;
			}
		} else {
			move = 3;
		} 
		
		for(var j = 0; j < item.children.length; j++){
			var style = window.getComputedStyle(item.children[j]);
			var leftValue = style.left;
			leftValue = parseInt(leftValue) + move;
			item.children[j].style.left = leftValue+"px";
		}
	}
};

	

	
var split = function() {
	var width = screen.width;
	var ulLists = document.getElementsByClassName("list");

 	for(var i = 0; i < ulLists.length; i++){ 
		var elList = ulLists[i];
		
		for(var j = 0; j < elList.children.length; j++){
			var style = window.getComputedStyle(elList.children[j]);
			var left = style.left;
			left = parseInt(left);						
			if(i !=1) {
				if(left < -width){
					var liChildren = elList.firstElementChild;
					
					var clone = liChildren.cloneNode(true);
					clone.style.left = left + 4500 + "px"; 
					elList.appendChild(clone);
					elList.removeChild(liChildren);
				}
			} else {
				if(left > width){
					var liChildren = elList.lastElementChild;
					
					var clone = liChildren.cloneNode(true);
					clone.style.left = left - 4500 + "px"; 
					elList.insertAdjacentElement("afterBegin", clone);
					elList.removeChild(liChildren);
				}
			}
		}
 	} 	 
}

//최초 자동 시작. 
var timer = setInterval(function() {
		moveRight();
		split();
	},100 );
	
var event = function() {
	var ulLists = document.getElementsByClassName("list");
	for (var i = 0; i < ulLists.length; i++){
		ulLists[i].addEventListener("mouseover", function() {

			clearInterval(timer);
		});
	
			
		ulLists[i].addEventListener("mouseout", function() {

			timer = setInterval(function() {
					moveRight();
					split();
				}, 100);
			});
	}
}

event();	

//1. 코드 리팩토링 to prototype
//2. 셋인터벌 한줄씩 영향 받도록 ul맏각각 달기.
//3. 