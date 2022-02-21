var target;
var crosshair;
var newPos;
var powPos;
var tdirX;
var tdirY;
var pdirX;
var pdirY;
var powerups = ['+5 Time', '-5 Time', '+5 Points', '-5 Points', 'Slow Ball', 'Fast Ball'];
var choice;
var timewait;
var messageTime;
var checkWait = false;
var streak = 0;
var clr = [255, 255, 255];
var gameStarted = false;
var counter = 1;
var play = false;
var timer = 30;
var ts = 45;
var score = 0;
var scorect = 1;
var tmaxSpeed = 12;
var pmaxSpeed = 8;
var treppelForce = 1500 * tmaxSpeed;
var preppelForce = 1500 * pmaxSpeed;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	target = new Target(width / 2, height / 2, 30);
	target.showing = true;
	powerup = new Target(0, 0, 40);
	powerup.showing = false;
	crosshair = new Crosshair(40);
	tchoosePoint();
	pchoosePoint();
}

function draw() {
	background(35);
	counter++;

	if (target.vel.x > tmaxSpeed) {target.vel.x = tmaxSpeed;}
	if (target.vel.x < -tmaxSpeed) {target.vel.x = -tmaxSpeed;}
	if (target.vel.y > tmaxSpeed) {target.vel.y = tmaxSpeed;}
	if (target.vel.y < -tmaxSpeed) {target.vel.y = -tmaxSpeed;}

	if (powerup.vel.x > pmaxSpeed) {powerup.vel.x = pmaxSpeed;}
	if (powerup.vel.x < -pmaxSpeed) {powerup.vel.x = -pmaxSpeed;}
	if (powerup.vel.y > pmaxSpeed) {powerup.vel.y = pmaxSpeed;}
	if (powerup.vel.y < -pmaxSpeed) {powerup.vel.y = -pmaxSpeed;}

	if (play) {

		target.tupdate();
		powerup.pupdate();

		if (counter % 60 == 0 && timer >= 1) {
			timer += -1;
		}

		if (counter % 600 == 0 && timer != 30) {
			powerup.showing = true;
			timewait = timer - 5;
		}

		if (checkWait == true) {
			checkTimeWait();
		}

		if (messageTime < timer) {
			textSize(55);
			textAlign(CENTER);
			text(choice, width / 2, height / 4);
		}

		if (timer < 0) {
			timer = 0;
		}

		if (timer == 0) {
			restartGame();
		}

	} else {
		welcomeGG();
	}

	if (powerup.showing) {powerup.pshow();}
	target.tshow();
	crosshair.show();
	drawScoreBoard();

}

function tchoosePoint() {
	newPos = createVector(random(width / 4, 3*width / 4), random(height / 4, 3*height / 4));

	if (target.pos.x < newPos.x) {
		tdirX = true;
	} else {
		tdirX = false;
	}

	if (target.pos.y < newPos.y) {
		tdirY = true;
	} else {
		tdirY = false;
	}

}

function pchoosePoint() {

	powPos = createVector(random(width / 4, 3*width / 4), random(height / 4, 3*height / 4));

	if (target.pos.x < powPos.x) {
		pdirX = true;
	} else {
		pdirX = false;
	}

	if (target.pos.y < powPos.y) {
		pdirY = true;
	} else {
		pdirY = false;
	}

}

function mousePressed() {

	if (!play) {
		if (dist(mouseX, mouseY, target.pos.x, target.pos.y) <= target.w) {
			play = true;
			gameStarted = true;
			counter = 1;
			timer = 30;
			score = 0;
		}
	} else {
		if (dist(mouseX, mouseY, target.pos.x, target.pos.y) <= target.w) {
			score += scorect;
			streak += 1;
		} else if (powerup.showing == true && mouseX >= powerup.pos.x && mouseX <= powerup.pos.x + powerup.w && mouseY >= powerup.pos.y && mouseY <= powerup.pos.y + powerup.w){

			collectPowerup();
			powerup.showing = false;

		} else {

			score += -1;
			streak = 0;
		}

		updateColor();

	}

}

function collectPowerup() {

	choice = powerups[Math.floor(Math.random() * powerups.length)];

	if (choice == '+5 Time') {
		timer += 5;
		console.log('plus5t');
	} else if (choice == '-5 Time') {
		timer += -5;
		console.log('minus5t');
	} else if (choice == '+5 Points') {
		score += 5;
		console.log('plus5p');
	} else if (choice == '-5 Points') {
		score += -5;
		console.log('minus5p');
	} else if (choice == 'Slow Ball') {
		timewait = timer - 5;
		checkWait = true;
		tmaxSpeed = 5;
		console.log('slowBall');
	} else if (choice == 'Fast Ball') {
		timewait = timer - 5;
		checkWait = true;
		tmaxSpeed = 16;
		console.log('fastBall');
	}

	displayPowerup();

}

function checkTimeWait() {
	if (timewait == timer) {
		tmaxSpeed = 12;
		checkWait = false;
	}
}

function drawScoreBoard() {
	fill(255);
	noStroke();
	textSize(ts);
	textAlign(CENTER);
	text("Score: " + str(score), width / 2, (height / ts) + 60);
	text("Time: " + str(timer), width / 2, height - (height / ts) - 15);
}

function restartGame() {
	target.pos.x = width / 2;
	target.pos.y = height / 2;
	target.tshow();
	powerup.showing = false;
	messageTime = 30;
	play = false;
	counter = 1;
	streak = 0;
	updateColor();
}

function welcomeGG() {

	fill(255);
	noStroke();
	textSize(40);
	textAlign(CENTER);
	if (gameStarted) {
		text("Think you can beat your score?\nClick the target to play again!", width / 2, height / 4);
	} else {
		text("Hit the target as many times as\npossible before the timer runs out!\nClick the target to begin!", width / 2, height / 4);
	}
}

function updateColor() {
	if (streak >= 10) {
		clr = [229, 210, 66];
		scorect = 3;
	} else if (streak >= 5) {
		clr = [15, 150, 15];
		scorect = 2;
	} else {
		clr = [255, 255, 255];
		scorect = 1;
	}
}

function displayPowerup() {

	if (timer < 3) {
		messageTime = 0;
	} else {
		messageTime = timer - 3;
	}

}
