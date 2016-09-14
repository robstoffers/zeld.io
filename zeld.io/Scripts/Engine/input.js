function Input () {
    var _pressed = {};
    var _previousPressed = {};
    
    var self = this;
    window.addEventListener("keydown", function (e) {
        for (prop in self) {
            if (self.hasOwnProperty(prop)) {
                if (self[prop] === e.keyCode) {
                    e.preventDefault();
                }
            }
        }
        _pressed[e.keyCode] = 1;
    });
    window.addEventListener("keyup", function (e) {
        delete _pressed[e.keyCode];
        if (_previousPressed[e.keyCode]) {
            delete _previousPressed[e.keyCode];
        }
    });
    window.addEventListener("mousedown", function (e) {
        _pressed[self.Mouse1] = 1;
    });
    window.addEventListener("mouseup", function (e) {
        delete _pressed[self.Mouse1];
        if (_previousPressed[self.Mouse1]) {
            delete _previousPressed[self.Mouse1];
        }
    });
    window.addEventListener("mousemove", function (e) {
        self.mouseX = e.pageX;
        self.mouseY = e.pageY;
    });
    
    this.W = 87;
    this.A = 65;
    this.S = 83;
    this.D = 68;
    this.Mouse1 = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.isDown = function (key) {
        if (_pressed[key]) {
            return true;
        }
        return false;
    };
    
    this.isPressed = function (key) {
        if (_pressed[key] && !_previousPressed[key]) {
            _previousPressed[key] = 1;
            return true;
        }
        return false;
    }
}