$(function () {

var config = {
		zk : 0,  
		yk1 : 4,  
		fk1 : 17,  
		dk1 : 100,  
		fk2 : 120,  
		fk3 : 120,  
		dk3 : 100,  
		fk4 : 10
	}

	var r = new RayPlot(config);
});

function RayPlot(config) {
	var chiefRay = calculatePlot(0,4,17,100,120,120,100,10)

	/**
	 * Plot is considered to be in 4th quadrant. with  (x,y) 0,0 at top left
	 */
	
	var width = 1000;
	var height = 500;
	
	var paper = Raphael("plot", width, height);

	var border = paper.rect(0,0,width,height);

	var xAxis = drawLine(0, height/2 , width, height/2, true);	

	// Draw R
	var rAxisPos = (width - 20)
	//drawLine(rAxisPos, 0, rAxisPos, height);
	drawYAxis(rAxisPos, 300, style.dotted)

	// Draw feye
	var feAxisPos = 900; // chiefRay[1][0]
	drawYAxis(feAxisPos, 100, style.solidArrow)

	// Draw f1
	var f1AxisPos = 800; // chiefRay[2][0]
	drawYAxis(f1AxisPos, 120, style.solidArrow)

	// // Draw R'
	// var r1AxisPos = rAxisPos - 320;
	// drawYAxis(r1AxisPos, 300, style.dotted)

	
	// Draw f2
	var f2AxisPos = r1AxisPos - 320; // chiefRay[3][0]
	drawYAxis(f2AxisPos, 300, style.solidArrow)

	// Draw R''
	var r2AxisPos = f2AxisPos - 320; // chiefRay[5][0]
	drawYAxis(r2AxisPos, 300, style.dotted)

		
	// drawPath([ 
	// 		[960, 250],
	// 		[feAxisPos, 220],
	// 		[f1AxisPos, 210],
	// 		[f2AxisPos, 330],
	// 		[r2AxisPos, 380]
	// ],style.solidRed);
	// 
	
	drawPath(calculatePlot(0,4,17,100,120,120,100,10), style.solidRed);

	function drawYAxis(xPos, height,style){
		drawLine (xPos, (xAxis.getBBox().y - (height/2) ) , xPos , (xAxis.getBBox().y + (height/2) ) , style);			
	}

	function drawLine (x1,y1,x2,y2,style) {
		var plot = "M" + x1 + " " + y1 + "L" + x2 + " " + y2; 
		var line = paper.path(plot);
		
		if(style){
			line.attr(style)
		}
		return line;
	}

	// takes an aray of form [ [x,y], [x,y], [x,y] .... ]
	function drawPath(coordinateArray, style){
		var path = "M";
		var plot = paper.path();

				
		if(coordinateArray.length > 1){
			coordinateArray.forEach(function (coord,index) {
				if(index == 0 ){
					path = path +  coord[0] + " " + (coord[1] + xAxis.getBBox().y);
					
				}
				else{
					path = path + "L" + coord[0] + " " + (coord[1] + xAxis.getBBox().y);	
				}
			});
			plot = paper.path(path);
			//plot.animate({path: path}, 3000, "linear");
			if(style) plot.attr(style);
		}
	}
}


var style = {
	dotted:{
		'stroke': 'black', 
		'stroke-dasharray': ["--"] 
	},
	solidRed:{
		'stroke': 'red'
	},
	solidArrow:{ 
		// 'arrow-end':   'classic-wide-long', 
  //       'arrow-start': 'classic-wide-long' 
    }
}


function calculatePlot (zk,yk1,fk1,dk1,fk2,fk3,dk3,fk4) {
	
	//Ideal ray from retinal plane
	var alpha_ideal1 = yk1/(fk1)-yk1/fk1
	var y_ideal2 = (yk1/(fk1)-yk1/fk1)*dk1 + yk1
	var alpha_ideal2 = (yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2
	var y_ideal3 = ((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1)
	var alpha_ideal3 = ((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)-(((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))/fk3
	var y_ideal4 = (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)-(((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))/fk3)*dk3 + (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))
	var y_ideal5 = (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)-(((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))/fk3)*(dk3+fk4) + (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))


	var alpha1 = yk1/(fk1-zk)-yk1/fk1
	var y2 = alpha1*dk1 + yk1
	var alpha2 = alpha1 - y2/fk2
	var y3 = alpha2*(fk2+fk3)+y2
	var alpha3 = alpha2-y3/fk3
	var y4 = alpha3*dk3 + y3
	var y5 = alpha3*(dk3+fk4) + y3

	var x0 = zk;
	var y0 = 0
	var x1 = fk1
	var y1 = yk1;
	var x2 = x1+dk1
	var x3 = x2+fk2+fk3;
	var x4 = x3+dk3;
	var x5 = x4+fk4	

	return [ [x0,y0], [x1,y1], [x2,y2], [x3,y3], [x4,y4], [x5,y5] ];
}








//960
//320