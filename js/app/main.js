$(function () {
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
	var feAxisPos = 900;
	drawYAxis(feAxisPos, 100, style.solidArrow)

	// Draw f1
	var f1AxisPos = 800;
	drawYAxis(f1AxisPos, 120, style.solidArrow)

	// Draw R'
	var r1AxisPos = rAxisPos - 320;
	drawYAxis(r1AxisPos, 300, style.dotted)

	
	// Draw f2
	var f2AxisPos = r1AxisPos - 320;
	drawYAxis(f2AxisPos, 300, style.solidArrow)

	// Draw R''
	var r2AxisPos = f2AxisPos - 320;
	drawYAxis(r2AxisPos, 300, style.dotted)

	

	
	drawPath([ 
			[960, 250],
			[feAxisPos, 220],
			[f1AxisPos, 210],
			[f2AxisPos, 330],
			[r2AxisPos, 380]
	],style.solidRed);


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
		if(coordinateArray.length > 1){
			coordinateArray.forEach(function (coord,index) {
				if(index == 0 ) path = path +  coord[0] + " " + coord[1];
				else path = path + "L" + coord[0] + " " + coord[1];	
			});
			
			var plot = paper.path(path);
			
			if(style)
				plot.attr(style);
			
			return plot;
		}
	}

});

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

//960
//320