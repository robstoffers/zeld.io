function Background (canvas, tileSize, lineColor, lineWidth) {

    var left = 0;
    var top = 0;
    var right = 0;
    var bottom = 0;

    var boundsLeft = 0;
    var boundsTop = 10;
    var boundsRight = 40;
    var boundsBottom = 20;

    this.update = function (dt, offsetX, offsetY) {
        if (right * tileSize - offsetX < canvas.width) {
            right += 1;
        }
        if ((right - 1) * tileSize - offsetX > canvas.width) {
            right -= 1;
        }
        if ((left + 1) * tileSize - offsetX < 0) {
            left += 1;
        }
        if (left * tileSize - offsetX > 0) {
            left -= 1;
        }

        if (bottom * tileSize - offsetY < canvas.height) {
            bottom += 1;
        }
        if ((bottom - 1) * tileSize - offsetY > canvas.height) {
            bottom -= 1;
        }
        if ((top + 1) * tileSize - offsetY < 0) {
            top += 1;
        }
        if (top * tileSize - offsetY > 0) {
            top -= 1;
        }
    }

    this.resize = function () {
        var columnCount = Math.ceil(canvas.width / tileSize);
        var rowCount = Math.ceil(canvas.height / tileSize);

        right = left + columnCount;
        bottom = top + rowCount;
    }

    var drawGrid = function (renderer, offsetX, offsetY) {
        for (var horizontal = left; horizontal < right; horizontal++) {
            for (var vertical = top; vertical < bottom; vertical++) {
                var x = horizontal * tileSize + offsetX;
                var y = vertical * tileSize + offsetY;
                renderer.drawRect(x, y, tileSize, tileSize, lineWidth, lineColor);
            }
        }
    };

    this.draw = function (renderer, offsetX, offsetY) {
        drawGrid(renderer, -offsetX, -offsetY);
    }
}