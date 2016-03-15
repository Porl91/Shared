var RenderViewModel = function(config) {
	var viewModel = this;
	
	this.canvasId = null;
	this.canvas = null;
	this.context = null;
	this.updateCallback = null;
	this.renderCallback = null;
	
	this.BeginRender = function() {
		if(typeof(config.CanvasId) == 'string') {
			this.canvasId = config.CanvasId;
		} else {
			return;
		}
	
		this.canvas = document.getElementById(this.canvasId);
		this.context = this.canvas.getContext("2d");
		
		if(typeof(config.UpdateCallback) == 'function') {
			this.updateCallback = config.UpdateCallback;
		}
		
		if(typeof(config.RenderCallback) == 'function') {
			this.renderCallback = config.RenderCallback;
		}
	
		this.PrepareCanvas(true, true);
		this.FillContext("#000");
		
		viewModel.UpdateMain();
		viewModel.RenderMain();
		setInterval(function() {
			viewModel.UpdateMain();
			viewModel.RenderMain();
		}, config.Fps === undefined ? 
			17 : 1000 / config.Fps		// Ms per render
		);
	};
	
	this.PrepareCanvas = function(fullScreen, correctOnResize) {
		var resizeToWindow = function() {
			viewModel.canvas.width = window.innerWidth;
			viewModel.canvas.height = window.innerHeight;
		};
		
		if(fullScreen) {
			resizeToWindow();
		
			if(correctOnResize) {
				window.onresize = function() {
					resizeToWindow();
					viewModel.RenderMain();
				};
			}
		}
	};
	
	this.FillContext = function(colour) {
		var oldColour = this.context.fillStyle;
		this.context.fillStyle = colour;
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.fillStyle = oldColour;
	};
	
	this.UpdateMain = function() {
		if(typeof(this.updateCallback) == 'function') {
			this.updateCallback();
		}
	};
	
	this.RenderMain = function() {
		this.context.fillStyle = "#000";
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.fillStyle = "#fff";
		
		if(typeof(this.renderCallback) == 'function') {
			this.renderCallback();
		}
	};
};