var LineSegment = function(v1, v2) {
	this.Point1 = v1;
	this.Point2 = v2;
	this.AABB = null;
	
	this.Initialise = function() {
		// Create bounding box around line
		var xHalfDiff = (this.Point2.x - this.Point1.x) >> 1;
		var yHalfDiff = (this.Point2.y - this.Point1.y) >> 1;
		
		this.AABB = new AABB(
			new Vector2(xHalfDiff + this.Point1.x, yHalfDiff + this.Point1.y), 
			xHalfDiff, yHalfDiff
		);
	};
	
	this.IsIntersecting = function(other, collisionPoint) {
		// Cheap AABB check (false for most cases)
		if(!this.AABB.IsIntersecting(other.AABB))
			return false;
		
		// Calculate difference (generate line segments from points)
		var seg1 = this.Point2.Sub(this.Point1);
		var seg2 = other.Point2.Sub(other.Point1);
		
		var denom = seg1.Cross(seg2);
		var diffBetweenStartPoints = this.Point1.Sub(other.Point1);
		var s = seg1.Cross(diffBetweenStartPoints) / denom;
		var t = seg2.Cross(diffBetweenStartPoints) / denom;
		
		if(s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			collisionPoint = new Vector2(
				this.Point1.x + t * seg1.x, 
				this.Point1.y + t * seg1.y
			);
			
			return true;
		}
		
		return false; 
	};
	
	this.Initialise();
};