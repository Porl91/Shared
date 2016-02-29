var gameLoopId = -1;
var canvas;
var context;

var imagesToLoad = 0;
var spritesheet = loadImage("images/sprites.png");

var mapWidth = 24;
var mapHeight = 24;

var rotSpeed = 0.04;
var moveSpeed = 0.1;

var keyStates = [];

var worldMap = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,3,0,0,0,3,0,0,0,1],
	[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,2,2,0,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var posX = 22;
var posY = 12;
var dirX = -1;
var dirY = 0;
var planeX = 0;
var planeY = 0.66;

window.onload = function() {
	init();
	resizeCanvas();
	startGameLoop();
}

window.onresize = function() {
	resizeCanvas();
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.keyCode || e.which;
	keyStates[keyCode] = true;
}

window.onkeyup = function(e) {
	e = e || window.event;
	var keyCode = e.keyCode || e.which;
	keyStates[keyCode] = false;
}

function update() {
	if(keyStates[46]) { // DEL
		stopGameLoop();
		return;
	}

	if(keyStates[87]) { // W
		if(worldMap[(posX + dirX * moveSpeed) | 0][posY | 0] == false) posX += dirX * moveSpeed;
		if(worldMap[posX | 0][(posY + dirY * moveSpeed) | 0] == false) posY += dirY * moveSpeed;
	}

	if(keyStates[65]) { // A
		var oldDirX = dirX;
		dirX = dirX * Math.cos(rotSpeed) - dirY * Math.sin(rotSpeed);
		dirY = oldDirX * Math.sin(rotSpeed) + dirY * Math.cos(rotSpeed);
		var oldPlaneX = planeX;
		planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
		planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
	}

	if(keyStates[83]) { // S
		if(worldMap[(posX - dirX * moveSpeed) | 0][posY | 0] == false) posX -= dirX * moveSpeed;
		if(worldMap[posX | 0][(posY - dirY * moveSpeed) | 0] == false) posY -= dirY * moveSpeed;
	}

	if(keyStates[68]) { // D
		var oldDirX = dirX;
		dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed);
		dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed);
		var oldPlaneX = planeX;
		planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
		planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
	}
}

function loadImage(filename) {
	imagesToLoad++;
	var image = new Image();
	image.onload = function() {
		imagesToLoad--;
	}
	image.src = "images/sprites.png";
	return image;
}

function render() {
	context.fillStyle = "#030303";
	context.fillRect(0, 0, canvas.width, canvas.height >> 1);
	context.fillStyle = "#030303";
	context.fillRect(0, canvas.height >> 1, canvas.width, canvas.height);
	
	for(var x = 0; x < canvas.width; x++) {
		var cameraX = 2 * x / canvas.width - 1;
		var rayPosX = posX;
		var rayPosY = posY;
		var rayDirX = dirX + planeX * cameraX;
		var rayDirY = dirY + planeY * cameraX;

		var mapX = rayPosX | 0;
		var mapY = rayPosY | 0;

		var deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
		var deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));
		var perpWallDist;

		var stepX;
		var stepY;

		var hit = 0;
		var side;

		if(rayDirX < 0) {
			stepX = -1;
			sideDistX = (rayPosX - mapX) * deltaDistX;
		} else {
			stepX = 1;
			sideDistX = (mapX + 1.0 - rayPosX) * deltaDistX;
		}

		if(rayDirY < 0) {
			stepY = -1;
			sideDistY = (rayPosY - mapY) * deltaDistY;
		} else {
			stepY = 1;
			sideDistY = (mapY + 1.0 - rayPosY) * deltaDistY;
		}

		while(hit == 0) {
			if(sideDistX < sideDistY) {
				sideDistX += deltaDistX;
				mapX += stepX;
				side = 0;
			} else {
				sideDistY += deltaDistY;
				mapY += stepY;
				side = 1;
			}

			if(worldMap[mapX][mapY] > 0) {
				hit = 1;
			}
		}

		if(side == 0) {
			perpWallDist = Math.abs((mapX - rayPosX + (1 - stepX) / 2) / rayDirX);
		} else {
			perpWallDist = Math.abs((mapY - rayPosY + (1 - stepY) / 2) / rayDirY);
		}

		var lineHeight = Math.abs((canvas.height / perpWallDist) | 0);

		var drawStart = -lineHeight / 2 + canvas.height / 2;
		if(drawStart < 0) {
			drawStart = 0;
		}

		var drawEnd = lineHeight / 2 + canvas.height / 2;
		if(drawStart >= canvas.height) {
			drawStart = canvas.height - 1;
		}

		var colour = 255;
		switch(worldMap[mapX][mapY]) {
			case 1:
				colour = 0x333333;
				break;
			case 2:
				colour = 0x555555;
				break;
			case 3:
				colour = 0x777777;
				break;
			case 4:
				colour = 0x999999;
				break;
			case 5:
				colour = 0xaaaaaa;
				break;
		}

		if(side == 1) {
			colour = colour >> 1;
		}

		var shade = 1.0 / perpWallDist;
		if(shade > 1.0) {
			shade = 1.0;
		}

		colour = 0x000000 | 
		(((((colour >> 16) & 0xff) * shade) | 0) << 16) | 
		(((((colour >> 8) & 0xff) * shade) | 0) << 8) | 
		(((((colour >> 0) & 0xff) * shade) | 0) << 0);

		context.fillStyle = "#" + colour_pad(colour.toString(16));
		context.fillRect(x, drawStart, 1, drawEnd - drawStart);
	}
}

function colour_pad(colour) {
	if(colour.length >= 6) {
		return colour;
	}
	return colour_pad("0" + colour);
}

function init() {
	if(imagesToLoad > 0) {
		init();
	}

	canvas = document.getElementById("map");
	context = canvas.getContext("2d");
}

function startGameLoop() {
	gameLoopId = setInterval(function() { update(); render(); }, 20);
}

function stopGameLoop() {
	clearInterval(gameLoopId);
}