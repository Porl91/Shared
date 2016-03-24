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
	
	this.Length = function() {
		return Math.sqrt(this.Dot(this));
	};
	
	this.Dot = function(other) {
		return this.x * other.x + this.y * other.y;
	};
	
	this.Cross = function(other) {
		return this.x * other.y - this.y * other.x;
	};
	
	this.Normalise = function() {
		var recip = 1.0 / this.Length();
		return new Vector2(this.x * recip, this.y * recip);
	};
	
	this.Perp = function() {
		return new Vector2(-this.y, this.x);
	};
	
	this.Mid = function() {
		return new Vector2(this.x * 0.5, this.y * 0.5);
	};
	
	this.Lerp = function(other, i) {
		return this.Add(other.Sub(this).Mult(i));
	};
};