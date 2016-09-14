function Player(name, posx, posy) {
    
    this.x = posx;
    this.y = posy;
    this.angle = 0;
    this.speed = 100;
    this.radius = 32;
    this.name = name;
    this.isalive = false;

    this.animator = new Animator("player", 128);
    this.animator.addState({ name: "idle", framecount: 1, speed: 1, img: "Content/Images/idleanim2.png" });
    this.animator.addState({ name: "attack", framecount: 10, speed: 30, img: "Content/Images/attackanim2.png", transition: "idle", });
    this.animator.play("idle");

    this.update = function(input, dt) {
        if (this.isalive) {
            if (input.isDown(input.W)) {
                this.y -= (this.speed * dt);
            }
            if (input.isDown(input.S)) {
                this.y += (this.speed * dt);
            }
            if (input.isDown(input.A)) {
                this.x -= (this.speed * dt);
            }
            if (input.isDown(input.D)) {
                this.x += (this.speed * dt);
            }
            if (input.isPressed(input.Mouse1) && this.animator.getState().name !== "attack") {
                this.animator.play("attack");
            }

            this.animator.animate(dt);

            // rotate the player towards the mouse
            var currentAngle = Math.atan2(input.mouseX - (window.innerWidth * 0.5), input.mouseY - (window.innerHeight * 0.5));
            var dir = (currentAngle - this.angle) / (2.0 * Math.PI);
            dir = dir - Math.round(dir);
            dir = dir * (2.0 * Math.PI);
            this.angle += dir * 0.05;
        }
    }

    this.draw = function (renderer) {
        if (this.isalive) {
            renderer.drawClippedImage(this.animator.getState().img,
                (renderer.canvas.width * 0.5),
                (renderer.canvas.height * 0.5),
                this.animator.getFrame() * this.animator.dimension,
                0,
                this.animator.dimension,
                this.animator.dimension,
                180 + -toDegrees(this.angle));
        }
    }
}