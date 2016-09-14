function Enemy(name, posx, posy) {
    this.x = posx;
    this.y = posy;
    this.renderX = 0;
    this.renderY = 0;
    this.angle = 0;
    this.speed = 100;
    this.radius = 32;
    this.name = name;

    this.worldstate = { x: posx, y: posy, angle: 0, state: "idle" };

    this.animator = new Animator("enemy", 128);
    this.animator.addState({ name: "idle", framecount: 1, speed: 1, img: "Content/Images/idleanim2.png" });
    this.animator.addState({ name: "attack", framecount: 10, speed: 30, img: "Content/Images/attackanim2.png", transition: "idle", });
    this.animator.play("idle");

    this.update = function (dt, offsetX, offsetY) {

        // interpolate the enemies to the position the server says they are
        this.x += (this.worldstate.x - this.x) * dt * 2.0;
        this.y += (this.worldstate.y - this.y) * dt * 2.0;

        this.renderX = (window.innerWidth * 0.5) + (this.x - offsetX);
        this.renderY = (window.innerHeight * 0.5) + (this.y - offsetY);

        // interpolate the angle to the angle the server says they are
        this.angle += (this.worldstate.angle - this.angle) * dt * 2.0;

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
            180 + -toDegrees(this.angle));
    }
}