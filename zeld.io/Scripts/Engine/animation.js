function Animator(id, dimension) {
    var states = [];
    var currentState;
    var frame = 0;
    var frametime = 0;
    var owner = id;

    this.dimension = dimension;

    this.changeState = function (stateName) {
        if (owner === "player") {
            console.log("player state changed");
        }
        for (var i = 0; i < states.length; i++) {
            if (stateName === states[i].name) {
                currentState = states[i];
                frame = 0;
                frametime = 0;
                break;
            }
        }
    };

    // state: name of state,
    // framecount: number of animation frames,
    // speed: speed of the animation,
    // transition: name of state to transition to)
    this.addState = function (state) {
        if (state.img) {
            // if they provided an image then load that up.
            var imgsrc = state.img;
            state.img = new Image();
            state.img.src = imgsrc;
        }
        states.push(state);
    };
    this.getFrame = function () {
        return frame;
    };
    this.animate = function (dt) {
        if (currentState) {
            frametime = frametime + dt;
            if (frametime > (1.0 / currentState.speed)) {
                frametime = 0;
                frame = frame + 1;
                if (frame > currentState.framecount - 1) {
                    // if the animation has a transition then we change the current state to that transition
                    if (currentState.transition) {
                        this.changeState(currentState.transition);
                    } else {
                        frame = 0; // keep looping
                    }
                }
            }
        }
    };
    this.play = function (state) {
        this.changeState(state);
    };
    this.getState = function () {
        return currentState;
    }
    this.getId = function () { return owner; }
}