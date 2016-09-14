function Renderer(canvas) {
    this.canvas = canvas;
    var context = this.canvas.getContext("2d");
    
    this.drawLine = function (x1, y1, x2, y2, thickness, color) {
        context.save();
        context.lineWidth = thickness;
        context.strokeStyle = color;
        
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
        
        context.restore();
    };
    this.drawImage = function (image, x, y, angle) {
        context.save();
        context.translate(x, y);
        context.rotate(toRadians(angle));
        context.drawImage(image, -(image.width * 0.5), -(image.height * 0.5));
        context.restore();
    };
    this.drawClippedImage = function (image, x, y, cx, cy, cwidth, cheight, angle) {
        context.save();
        context.translate(x, y);
        context.rotate(toRadians(angle));
        context.drawImage(image, cx, cy, cwidth, cheight, -(cwidth * 0.5), -(cheight * 0.5), cwidth, cheight);
        context.restore();
    };
    this.drawGrid = function (leftColumn, rightColumn, topColumn, botColumn, offsetX, offsetY, gridSize, gridColor, thickness) {
        // render horizontal lines
        for (var i = topColumn; i < botColumn; i++) {
            var x1 = leftColumn * gridSize + offsetX;
            var y1 = i * gridSize + offsetY;
            var x2 = rightColumn * gridSize + offsetX;
            var y2 = i * gridSize + offsetY;
            this.drawLine(x1, y1, x2, y2, thickness, gridColor);
        }
        // render vertical lines
        for (var i = leftColumn; i < rightColumn; i++) {
            var x1 = i * gridSize + offsetX;
            var y1 = topColumn * gridSize + offsetY;
            var x2 = i * gridSize + offsetX;
            var y2 = botColumn * gridSize + offsetY;
            this.drawLine(x1, y1, x2, y2, thickness, gridColor);
        }
    };
    this.clear = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.isInView = function (x, y, width, height) {
        if (x + width < 0 || x > canvas.width)
            return false;
        if (y + height < 0 || y > canvas.height)
            return false;

        return true;
    }
}