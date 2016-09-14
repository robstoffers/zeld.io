$(document).ready(function () {
    // game variables
    var dt = 0, lastTime = 0;
    var enemies = [];
    var orbs = [];

    // initialize game engine components
    var canvas = $("#mainCanvas").get(0);
    var renderer = new Renderer(canvas);
    var network = new Network();
    var input = new Input();
    var factory = new Factory();
    var background = new Background(canvas, 50, "red", 0.2);

    network.connected = connectSuccess;
    network.callback = recievePlayerState;
    network.startConnection();

    // generating a random name for simplicity sake
    var player = factory.create("player", 0, 0, Math.random());
    
    function connectSuccess() {
        // this allows us to control our character
        player.isalive = true;
    }
    function recievePlayerState(state) {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].name == state.name) {
                enemies[i].worldstate.x = state.pos.x;
                enemies[i].worldstate.y = state.pos.y;
                enemies[i].worldstate.angle = state.angle;
                return;
            }
        }

        enemies.push(factory.create("enemy", state.pos.x, state.pos.y, state.name));
    }

    // main game loop
    function update(curTime) {

        // time based updates huzzah!
        dt = (curTime - lastTime) / 1000.0;
        lastTime = curTime;

        // updates have to happen first before rendering so that rendering has the most up to date information
        player.update(input, dt);
        background.update(dt, player.x, player.y);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].update(dt, player.x, player.y);
        }
        for (var i = 0; i < orbs.length; i++) {
            orbs[i].update(dt, player, enemies);

            if (orbs[i].consumed) {
                orbs.splice(i, 1);
            }
        }

        // tell the other players about us
        if (network.isConnected) {
            network.sendState(player);
        }
        
        // clear out the previous frame
        renderer.clear();

        // draw the background first
        background.draw(renderer, player.x, player.y);
        // orbs render on top of the background
        for (var i = 0; i < orbs.length; i++) {
            if (renderer.isInView(orbs[i].renderX, orbs[i].renderY, orbs[i].animator.dimension, orbs[i].animator.dimension)) {
                orbs[i].draw(renderer);
            }
        }
        // enemies render on top of orbs
        for (var i = 0; i < enemies.length; i++) {
            if (renderer.isInView(enemies[i].renderX, enemies[i].renderY, enemies[i].animator.dimension, enemies[i].animator.dimension)) {
                enemies[i].draw(renderer);
            }
        }
        // the player is rendered on top of everything
        player.draw(renderer);

        // request the start of another game frame
        requestAnimationFrame(update);
    }

    function updateCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        background.resize();
    }

    // make sure the canvas is always full screen
    window.addEventListener("resize", updateCanvas, false);

    // initial placement of the boundaries.
    updateCanvas();

    // start the game loop
    requestAnimationFrame(update);
});