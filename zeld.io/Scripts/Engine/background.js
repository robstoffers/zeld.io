function Background (canvas, tileSize, lineColor, lineWidth) {

    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;

    this.update = function (dt, offsetX, offsetY) {
        if (this.right * tileSize - offsetX < canvas.width) {
            this.right += 1;
        }
        if ((this.right - 1) * tileSize - offsetX > canvas.width) {
            this.right -= 1;
        }
        if ((this.left + 1) * tileSize - offsetX < 0) {
            this.left += 1;
        }
        if (this.left * tileSize - offsetX > 0) {
            this.left -= 1;
        }

        if (this.bottom * tileSize - offsetY < canvas.height) {
            this.bottom += 1;
        }
        if ((this.bottom - 1) * tileSize - offsetY > canvas.height) {
            this.bottom -= 1;
        }
        if ((this.top + 1) * tileSize - offsetY < 0) {
            this.top += 1;
        }
        if (this.top * tileSize - offsetY > 0) {
            this.top -= 1;
        }
    }

    this.resize = function () {
        var columnCount = Math.ceil(canvas.width / tileSize);
        var rowCount = Math.ceil(canvas.height / tileSize);

        this.right = this.left + columnCount;
        this.bottom = this.top + rowCount;
    }

    this.draw = function (renderer, offsetX, offsetY) {
        renderer.drawGrid(this.left,
            this.right,
            this.top,
            this.bottom,
            -offsetX,
            -offsetY,
            tileSize,
            lineColor,
            lineWidth);
    }
}