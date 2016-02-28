var Vector2 = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.Add = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x + v2.x, this.y + v2.y) : 
			new Vector2(this.x + other, this.y + other);
	};
	
	this.Sub = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x - v2.x, this.y - v2.y) : 
			new Vector2(this.x - other, this.y - other);
	};
	
	this.Mult = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x * v2.x, this.y * v2.y) : 
			new Vector2(this.x * other, this.y * other);
	};
	
	this.Div = function(other) {
		return typeof(other) == 'object' ?
			new Vector2(this.x / v2.x, this.y / v2.y) : 
			new Vector2(this.x / other, this.y / other);
	};
	
	this.Cross = function(v2) {
		return this.x * v2.y - this.y * v2.x;
	};
};