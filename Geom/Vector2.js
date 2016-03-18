var Vector2 = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.Add = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x + other.x, this.y + other.y) : 
			new Vector2(this.x + other, this.y + other);
	};
	
	this.Sub = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x - other.x, this.y - other.y) : 
			new Vector2(this.x - other, this.y - other);
	};
	
	this.Mult = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x * other.x, this.y * other.y) : 
			new Vector2(this.x * other, this.y * other);
	};
	
	this.Div = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x / other.x, this.y / other.y) : 
			new Vector2(this.x / other, this.y / other);
	};
	
	this.Cross = function(other) {
		return this.x * other.y - this.y * other.x;
	};
};