class Node{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	directionTo(node){
		var deltaX = node.x - this.x;
		var deltaY = node.y - this.y;
		var angle;
		if(deltaX==0){
			angle = ( ( 90 * ( deltaY / Math.abs( deltaY ) ) ) + 360 ) % 360;
		}else if(deltaY==0){
			angle = ( 90 - ( 90 * ( deltaX / Math.abs( deltaX ) ) ) );
		}else{
			var slope = deltaY/deltaX;
			angle = ((( Math.atan(slope) / Math.PI ) * 180));
			if(angle<0)
				angle += 180
			if(deltaY<0)
				angle += 180
		}
		return 360-angle;
	}
}