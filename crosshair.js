function Crosshair(w) {

  this.w = w;

  this.show = function() {
    stroke(225, 0, 0);
    strokeWeight(3);
    noFill();
    ellipse(mouseX, mouseY, this.w, this.w);
    strokeWeight(2);
    ellipse(mouseX, mouseY, this.w - 15, this.w - 15);
    line(mouseX, mouseY - (this.w / 2), mouseX, mouseY - 8);
    line(mouseX, mouseY + (this.w / 2), mouseX, mouseY + 8);
    line(mouseX - (this.w / 2), mouseY, mouseX - 8, mouseY);
    line(mouseX + (this.w / 2), mouseY, mouseX + 8, mouseY);
  }

}
