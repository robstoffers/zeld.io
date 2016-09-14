function Network() {
    // public variables
    this.isConnected = false;

    // private variables
    var hub = null;

    this.connected = null;
    
    var self = this;

    // startConnection - starts a signalR connection
    this.startConnection = function() {
        hub = $.connection.zeldioServerHub;
        hub.client.recieveState = recieveState;
        $.connection.hub.start().done(function () {
            
            self.isConnected = true;

            if (self.connected !== null) {
                self.connected();
            }
        });
    }

    // closeConnection - closes a signalR connection
    this.closeConnection = function() {
        $.connection.hub.stop();
    }

    // sendState - sends the current player state to the other players
    this.sendState = function (player) {
        var state = {
            name: player.name,
            pos: { x: player.x, y: player.y },
            angle: player.angle
        };

        hub.server.sendState(state);
    }

    // the callback to the game code so it can react to the incoming player state
    this.callback = null;

    // recieveState - recieves another players state
    function recieveState(state) {
        if (self.callback !== null) {
            self.callback(state);
        }
    }
}