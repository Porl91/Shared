var AABB = function(v, halfWidth, halfHeight) {
	this.position = v;
	this.halfWidth = halfWidth;
	this.halfHeight = halfHeight;
	
	this.UpdatePosition = function(position) {
		this.position = position;
	};
	
	this.IsIntersecting = function(other) {
		return !(this.position.x + this.halfWidth < other.position.x - other.halfWidth || 
			this.position.x - this.halfWidth > other.position.x + other.halfWidth || 
			this.position.y + this.halfHeight < other.position.y - other.halfHeight || 
			this.position.y - this.halfHeight > other.position.y + other.halfHeight);
	};
};