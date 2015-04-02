function upperSide(ulLists) {
    this.ulLists = document.getElementsByClassName("list");	
	this.timer=[];//배열로 만들었당. 
}

/*
	ul을 이동시키는 함수..
*/
upperSide.prototype.moveUl= function(ulID) {
	var elList= this.ulLists[ulID];
	var className = elList.className;
	var SPEED;
	//클래스 네임 따라서 왼쪽으로 갈지 오른쪽으로 갈지. 
	if(className.indexOf("left") != -1){
		//0번이랑 2번이랑 이동 속도를 다르게 구분. 
		if(className.indexOf("slow") != -1) {
			SPEED = -5;
		} else {
			SPEED = -3;
		}
	} else {
		SPEED = 3;
	} 
	
	this.moveLi(elList, SPEED);
	this.split(elList);
	
};

/*
moveUl에서 li 가 움직이게 하는 부분만 함수로 추출. 근데 이걸 꼭 prototype으로 빼놔야 할까? 
moveUL이 prototype이라서 그럴지도 모르겠음. 실험. 프로토타입 안에 거는게 좋은지, 아닌지 잘 모르겠다. 
전역에 거는 것과 프로토타입으로 해놓는 것. 전역이 낫지 않을까.

 >>prototype으로 만들어놓는게 낫다고 말씀하심. 어차피 객체마다 다르게 써야하는게 아니니까. 왜 헷갈렸지?
*/

upperSide.prototype.moveLi = function(ul, SPEED){
	for(var j = 0; j < ul.children.length; j++){
		var style = window.getComputedStyle(ul.children[j]);
		var leftValue = style.left;
		leftValue = parseInt(leftValue) + SPEED;
		ul.children[j].style.left = leftValue+"px";
	} 
};

/*
	moveUL에서 쓰는 rolling 용 함수. 
*/
upperSide.prototype.split = function(elList) {

	var width = screen.width;
	var li = elList.children[0];
	var style = window.getComputedStyle(elList.children[0]);
	var left = style.left;
	left = parseInt(left);						
	var liChildren, clone;
	if(elList.className.indexOf("left") != -1 && left < -width){
		liChildren = elList.firstElementChild;
		
		clone = liChildren.cloneNode(true);
		clone.style.left = left + 4500 + "px"; 
		elList.appendChild(clone);
		elList.removeChild(liChildren);
	} 
	if(elList.className.indexOf("right") != -1 && left >= 0){//원래는 어떻게 돌았길래 괜찮았을까? 지금은 왜 안되는거지?
		liChildren = elList.lastElementChild;
		clone = liChildren.cloneNode(true);
		clone.style.left = -1497 + "px"; 
		elList.insertAdjacentElement("afterBegin", clone);
		elList.removeChild(liChildren);
	}

 
};

upperSide.prototype.dontMove = function(ulID, timer) {
	var elList = this.ulLists[ulID];
	var that = this;
	elList.addEventListener("mouseover", function(e) {
		console.log(that.timer[ulID]+ " mouseover");
		clearInterval(that.timer[ulID]);
	});
};

/*
  mouseout하면 다시 움직이도록 하고 싶은데. 왜 안될까????????????????????????
*/
upperSide.prototype.moveAgain = function(ulID, timer){
/* 	debugger;//this는 object 인가ㅏㅏ */
	var elList = this.ulLists[ulID];
    var that = this;
	//debugger;
	elList.addEventListener("mouseout", function() {
		console.log(that.timer[ulID] +" mouse out");
		that.timer[ulID] = setInterval(function() {
			that.moveUl(ulID); 
		}, 100);
	});

};

upperSide.prototype.scrollMove = function() {
	var direct = document.getElementsByClassName("direct");
	for(var i = 0; i < direct.length; i++){
		(function(i){
			direct[i].addEventListener("click", function(e){
				var className = e.target.className;
				className = className.split(" ");
				var id = className[0];
				console.log(id);			
				var article = document.getElementById(id);
				window.scrollTo(0, article.offsetTop);
			}, true);
		})(i);
	}
};
// service code
/*
window('load', function() {
	
	//element초기화
	var ulLists = document.getElementsByClassName("list");	
	
 	//upperSide생성자를 만든다.
 	var t = new upperSide(ulLists);	
 	
 	//animation을 시작한다.
 	t.runAnimation();
});
*/
//이게 서비스 코드? 
upperSide.prototype.runAnimation = function() {
	for(var i = 0; i < 3; i++){

		var that = this;
		//var timer;//이걸 this로 넣어놓은 것과 아닌것, 어디가 더 나을까? 
		
		(function(i){
		 that.timer[i] = setInterval(function() {//this window timer를 배열로 
			that.moveUl(i);
			},100 );
		})(i);
		
		this.dontMove(i, that.timer);
		this.moveAgain(i, that.timer);

		this.scrollMove();
	}
};
 
window.addEventListener("load", function() {
	var ulLists = document.getElementsByClassName("list");
	var ele = new upperSide(ulLists);
	ele.runAnimation();
});



