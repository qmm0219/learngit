startclock();
		var timerID = null;
		var timerRunning = false;
		function showtime(){
			var Today = new Date();
			var NowHour = Today.getHours();
			var NowMinute = Today.getMinutes();
			var NowSecond = Today.getSeconds();
		
			
			Today = null;
			Hourleft = 23 - NowHour;
			Minuteleft = 59 - NowMinute;
			Secondleft = 59 - NowSecond;

			if(Secondleft < 0){
				Secondleft = 60 + Secondleft;
				Minuteleft = Minuteleft - 1;
			}
			if(Minuteleft < 0){
				Minuteleft = 60 + Minuteleft;
				Hourleft = Hourleft - 1;
			}
			if(Hourleft < 0){
				Hourleft = 24 + Hourleft;

			}
			$(".leftD .hours").html(Hourleft);
			$('.leftD .minutes').html(Minuteleft);
			$('.leftD .seconds').html(Secondleft);
			timerID = setTimeout('showtime()',1000);
			timerRunning = true;
		}

		var timerID = null;   
		var timerRunning = false;   
		function stopclock () {   
			if(timerRunning)   
			clearTimeout(timerID);   
			timerRunning = false;   
		}   
		function startclock () {   
			stopclock();   
			showtime();   
		} 