/*
 * 创建一个包含所有卡片的数组
 */
 var li = document.getElementsByClassName("card");
 var  initial_array = new Array();
 for (var i = 0; i < 16; i++) {
 	initial_array.push(li[i]);
 }

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function create_html(){
	var initial_array_html = new Array();
	for (var i = 0; i < 16; i++) {
		initial_array_html.push(initial_array[i].innerHTML);
	}
	for (var i = 0; i < 16; i++) {
		li[i].innerHTML = initial_array_html[i];
	}
}

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒
var int;
//重置函数
function Reset()
{
  	window.clearInterval(int);
  	millisecond=hour=minute=second=0;
  	document.getElementById('timetext').value='00:00:00:000';
}
//开始函数
function start()
{
  	int=setInterval(timer,50);//每隔50毫秒执行一次timer函数
}
//计时函数
function timer()
{
  	millisecond=millisecond+50;
  	if(millisecond>=1000)
  	{
    	millisecond=0;
    	second=second+1;
  	}
  	if(second>=60)
  	{
    	second=0;
    	minute=minute+1;
  	}
  	if(minute>=60)
  	{
   		minute=0;
    	hour=hour+1;
  	}
  	document.getElementById('timetext').innerHTML = hour + ':' + minute + ':' + second + ':' + millisecond;
}
//暂停函数
function stop()
{
  	window.clearInterval(int);
}

var temp = new Array();
function close_card(){
	var open_show_card = document.getElementsByClassName("show");
	if (open_show_card.length == 1) {
		setTimeout(function(){
			open_show_card[0].className = "card";
		},600);
	}else{
		setTimeout(function(){
			open_show_card[0].className = "card";
			open_show_card[0].className = "card";
		},600);
	}
}

function match_card(){
	var open_show_card = document.getElementsByClassName("show");
	if (open_show_card.length == 1) {
		open_show_card[0].className = "card match";
	}else{
		open_show_card[0].className = "card match";
		open_show_card[0].className = "card match";
	}
}

function change_stars(){
	var current_match = document.getElementsByClassName("match").length;
	if(current_match > 9){
		document.getElementsByClassName("fa fa-star")[2].className += " star_change_color";
		document.getElementsByClassName("fa fa-star")[1].className += " star_change_color";
	}else if (current_match > 4) {
		document.getElementsByClassName("fa fa-star")[2].className += " star_change_color"
	}
}

function win_game(){
	var match_num = document.getElementsByClassName("match");

	if (match_num.length == 16) {
		stop();

		//获取步数
		var steps = document.getElementsByClassName("moves");

		//获取游戏时间
		var current_time = document.getElementById('timetext').innerHTML;

		//获取星级
		var stars = document.getElementsByClassName("star_change_color").length;
		var stars_num = 0;
		if (stars == 0) {
			stars_num = 3;
		}else if (stars == 1) {
			stars_num = 2;
		}else{
			stars_num = 1;
		}

		if(document.all) {
	        document.getElementById("open").click();
	        document.getElementsByClassName("game_result")[0].innerHTML = 
	        		"With " + steps[0].innerHTML + " Moves, " + stars_num + " stars and " + current_time + " time.";
	    }
	    // 其它浏览器
	    else {
	        var e = document.createEvent("MouseEvents");
	        e.initEvent("click", true, true);
	        document.getElementById("open").dispatchEvent(e);
	        document.getElementsByClassName("game_result")[0].innerHTML = 
	        		"With " + steps[0].innerHTML + " Moves, " + stars_num + " stars and " + current_time + " time.";
	    }
	}
}

function f_restart(){
		shuffle(initial_array);
		create_html();

		Reset();
		start();

		var moves = document.getElementsByClassName("moves");
		moves[0].innerHTML = 0;

		var stars = document.getElementsByClassName("fa fa-star");
		for (var i = 2; i >= 0; i--) {
			stars[i].className = "fa fa-star";
		}

		for (var i = 0; i < 16; i++) {
			li[i].className = "card";
		}
}

shuffle(initial_array);
create_html();
start();

for (var i = 0; i < 16; i++) {
	li[i].addEventListener("click", function(e) {
		var event = e || window.event;
		var target = event.target || event.srcElement;

		var moves = document.getElementsByClassName("moves");
		var next_step = String(moves[0].innerHTML * 1 + 1);
		moves[0].innerHTML = next_step;

		if (target.tagName == "LI") {
			if (target.className.indexOf("match") <= -1) {
				target.className += " open show";
				temp.push(target.innerHTML);
			}else{
				target.className += " animated flipInY";
			}
		}else if(target.tagName == "I"){
			if (target.parentNode.className.indexOf("match") <= -1) {
				target.parentNode.className += " open show";
				temp.push(target.parentNode.innerHTML);
			}else{
				target.parentNode.className += " animated flipInY";
			}
		}

		change_stars();
		
		if(temp.length == 2){
			if(temp[0] === temp[1]){
				match_card();
			}
			else{
				close_card();
			}
			temp.splice(0,2);
		}
		win_game();
	})
}

var restart = document.getElementsByClassName("restart")[0];
restart.addEventListener("click", f_restart); 










 
