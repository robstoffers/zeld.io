function Orb(posx, posy) {
    this.x = posx;
    this.y = posy;
    this.renderX = 0;
    this.renderY = 0;
    this.radius = 24;
    this.consumed = false;

    this.animator = new Animator("orb", 32);
    this.animator.addState({ name: "idle", framecount: 1, speed: 1, img: "Content/Images/orb.png" });
    this.animator.play("idle");

    this.update = function (dt, player, enemies) {

        // if an orb collides with the player or enemies then assume it was picked up
        if (magnitude(this.x, this.y, player.x, player.y) < this.radius + player.radius) {
            this.consumed = true;
            return;
        }
        // check collisions with enemies
        for (var i = 0; i < enemies.length; i++) {
            if (magnitude(this.x, this.y, enemies[i].x, enemies[i].y) < this.radius + enemies[i].radius) {
                this.consumed = true;
                return;
            }
        }

        // just update the render position of the orb
        this.renderX = (window.innerWidth * 0.5) + (this.x - player.x);
        this.renderY = (window.innerHeight * 0.5) + (this.y - player.y);

        // update the animations
        this.animator.animate(dt);
    }

    this.draw = function (renderer) {
        renderer.drawClippedImage(this.animator.getState().img,
            this.renderX,
            this.renderY,
            this.animator.getFrame() * this.animator.dimension,
            0,
            this.animator.dimension,
            this.animator.dimension,
            0);
    }
}