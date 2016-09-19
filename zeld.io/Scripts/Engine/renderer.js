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
    this.drawRect = function (x, y, width, height, thickness, color) {
        context.save();
        
        this.drawLine(x, y, x + width, y, thickness, color);
        this.drawLine(x, y + height, x + width, y + height, thickness, color);
        this.drawLine(x, y, x, y + height, thickness, color);
        this.drawLine(x + width, y, x + width, y + height, thickness, color);

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