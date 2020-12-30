var start = document.querySelector('.start'),
	stop = document.querySelector(".stop"),
	reset = document.querySelector(".reset"),
	lap = document.querySelector(".lap"),
	time = document.querySelector(".time"),
	laps = document.querySelector(".laps"),
	hour = min = secs = millisecs = 0,
	milli,mins,hours,second,inter,
	lapNum = 0,
	startAndStop = {
		background: [
			"linear-gradient(0deg,#f52525,#f56e6e)",
			"linear-gradient(#1b821b, #60d660)"
			],
		startText: ['Pause','Start'],
		func: ['stopTimer','startTimer'],
		startStop: function(num) {
			start.setAttribute("onclick",this.func[num] + "()");
			start.innerHTML = this.startText[num];
			start.style.background = this.background[num];
		}
	};

function startTimer(){
	inter = setInterval(startWatch,10);
	startAndStop.startStop(0);
}

function stopTimer(){
	inter = clearInterval(inter);
	startAndStop.startStop(1);
}

function resetTimer(){
	hour = min = secs = millisecs = 0;
	check();
	stopTimer();
	lapReset();
	time.innerHTML = "00:00:00.00";
}

function check(){
	mins = min < 10 ? "0" + min : min,
	hours = hour < 10 ? "0" + hour : hour,
	second = secs < 10 ? "0" + secs : secs,
	milli = millisecs < 10 ? "0" + millisecs : millisecs;
}

function startWatch(){
	millisecs += 1;
	if (milli === 100) {
		millisecs = 0;
		secs++;
	}else if (second === 60) {
	    secs = 0;
		min++;
	}else if (mins === 60) {
		min = 0;
		hour++
	}
	check();
	time.innerHTML = hours + ":" + mins + ":" + second + "." + milli;
}
function lapWatch(){
	if(typeof(inter) == "undefined") return;
	
	lapNum += 1;
	let lapNumAddZero = lapNum < 10 ? "0" + lapNum : lapNum;
	let li = document.createElement("LI"),
		liNode = "Lap" + lapNumAddZero + "   " + time.innerHTML,
		liText = document.createTextNode(liNode);
		
	li.appendChild(liText);
	laps.scrollTop = 0;
	laps.insertBefore(li,laps.children[0]);
}

function lapReset(){
	laps.innerHTML = "";
	lapNum = 0;
}
window.onload = function (){
	start.setAttribute("onclick","startTimer()");
	reset.setAttribute("onclick","resetTimer()");
	lap.setAttribute("onclick","lapWatch()");
	check();
}