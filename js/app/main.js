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
});

function RayPlot(config) {
	this.w = $('#plot').width();
	this.h = 500;
	this.paper = Raphael("plot", this.w, this.h);
}

RayPlot.prototype.clear = function() {
		this.paper.clear();
};

RayPlot.prototype.draw = function(config) {
	console.log('drawing');
	var width = this.w;
	var height = this.h;
	var paper = this.paper;

	var chiefRay = calculatePlot(config, config.magnification);

	/**
	 * Plot is considered to be in 4th quadrant. with  (x,y) 0,0 at top left
	 */
	
	paper.setViewBox(-20, 0, width, height, true)

	var xAxis = drawLine(0, height/2 , width, height/2, true);	

	// Draw R
	var rAxisPos = chiefRay[0][0]
	drawYAxis(rAxisPos, 300, style.dotted,'R')

	// Draw feye
	//var feAxisPos = 900;
	var feAxisPos = chiefRay[1][0];
	drawYAxis(feAxisPos, 100, style.solidArrow,"F'eye")

	// Draw f1
	//var f1AxisPos = 800;
	var f1AxisPos = chiefRay[2][0]
	drawYAxis(f1AxisPos, 120, style.solidArrow,"F1")

	// // Draw R'
	// var r1AxisPos = rAxisPos - 320;
	// drawYAxis(r1AxisPos, 300, style.dotted,"R`")

	
	// Draw f2
	//var f2AxisPos = r1AxisPos - 320;
	var f2AxisPos = chiefRay[3][0]
	drawYAxis(f2AxisPos, 300, style.solidArrow,"F2")

	// Draw R''
	//var r2AxisPos = f2AxisPos - 320;
	var r2AxisPos = chiefRay[5][0]
	drawYAxis(r2AxisPos, 300, style.dotted,"R``")

	
	drawPath(chiefRay, style.solidRed);

	function drawYAxis(xPos, height,style,label){
		drawLine (xPos, (xAxis.getBBox().y - (height/2) ) , xPos , (xAxis.getBBox().y + (height/2) ) , style);	
		
		if(label) 
			paper.text(xPos,(xAxis.getBBox().y - (height/2) - 20 ), label);		
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
};

var style = {
	dotted:{
		'stroke': 'black', 
		'stroke-dasharray': ["--"] 
	},
	solidGrey:{
		'stroke': '#555'
	},
	solidRed:{
		'stroke': 'red'
	},
	solidArrow:{ 
		// 'arrow-end':   'classic-wide-long', 
  //       'arrow-start': 'classic-wide-long' 
    }
}


function calculatePlot (config, magnification) {
	var zk =  config.zk;
	var yk1 = config.yk1;
	var fk1 = config.fk1;
	var dk1 = config.dk1;
	var fk2 = config.fk2;
	var fk3 = config.fk3;
	var dk3 = config.dk3;
	var fk4 = config.fk4;

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

	var mag = 1;	
	if(magnification) mag = magnification;

	x0 *= mag;
	y0 *= mag;
	x1 *= mag;
	y1 *= mag;
	x2 *= mag;
	y2 *= mag;
	x3 *= mag;
	y3 *= mag;
	x4 *= mag;
	y4 *= mag;
	x5 *= mag;
	y5 *= mag;

	return [ [x0,y0], [x1,y1], [x2,y2], [x3,y3], [x4,y4], [x5,y5] ];
}








//960
//320