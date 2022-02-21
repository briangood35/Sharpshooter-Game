function Target(x, y, w) {

  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();

  this.w = w;
  this.showing = false;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.tupdate = function() {

    if (((tdirX && this.pos.x > newPos.x) || (!tdirX && this.pos.x < newPos.x)) && ((tdirY && this.pos.y > newPos.y) || (!tdirY && this.pos.y < newPos.y))) {
      tchoosePoint();
    }


    this.tgoTo();
    this.treppelWall();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

  }

  this.pupdate = function() {

    if (((pdirX && this.pos.x > powPos.x) || (!pdirX && this.pos.x < powPos.x)) && ((pdirY && this.pos.y > powPos.y) || (!pdirY && this.pos.y < powPos.y))) {
      pchoosePoint();
    }

    this.pgoTo();
    this.preppelWall();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

  }

  this.tshow = function() {

    fill(clr[0], clr[1], clr[2]);
    noStroke();

    ellipse(this.pos.x, this.pos.y, this.w, this.w);
    //ellipse(newPos.x, newPos.y, 5, 5);

  }

  this.pshow = function() {

    fill(200, 160, 20);
    stroke(0);
    strokeWeight(2);
    rect(this.pos.x, this.pos.y, this.w, this.w);

    fill(0);
    noStroke();
    textSize(this.w);
    textAlign(CENTER);
    text("?", this.pos.x + (this.w / 2), this.pos.y + (this.w - 5));
  }

  this.tgoTo = function() {
    this.acc.x = newPos.x - this.pos.x;
    this.acc.y = newPos.y - this.pos.y;
    this.acc.setMag(0.02*tmaxSpeed);
  }

  this.pgoTo = function() {
    this.acc.x = powPos.x - this.pos.x;
    this.acc.y = powPos.y - this.pos.y;
    this.acc.setMag(0.02*pmaxSpeed);
  }

  this.treppelWall = function() {
    if (this.vel.x >= 0) {
      this.applyForce(createVector(-this.vel.x / treppelForce*dist(this.pos.x, this.pos.y, width, this.pos.y), 0));
    } else{
      this.applyForce(createVector(-this.vel.x / treppelForce*dist(this.pos.x, this.pos.y, 0, this.pos.y), 0));
    }

    if (this.vel.y >= 0) {
      this.applyForce(createVector(0, -this.vel.y / treppelForce*dist(this.pos.x, this.pos.y, this.pos.x, height)));
    } else {
      this.applyForce(createVector(0, -this.vel.y / treppelForce*dist(this.pos.x, this.pos.y, this.pos.x, 0)));
    }

  }

  this.preppelWall = function() {
    if (this.vel.x >= 0) {
      this.applyForce(createVector(-this.vel.x / preppelForce*dist(this.pos.x, this.pos.y, width, this.pos.y), 0));
    } else{
      this.applyForce(createVector(-this.vel.x / preppelForce*dist(this.pos.x, this.pos.y, 0, this.pos.y), 0));
    }

    if (this.vel.y >= 0) {
      this.applyForce(createVector(0, -this.vel.y / preppelForce*dist(this.pos.x, this.pos.y, this.pos.x, height)));
    } else {
      this.applyForce(createVector(0, -this.vel.y / preppelForce*dist(this.pos.x, this.pos.y, this.pos.x, 0)));
    }

  }

}
