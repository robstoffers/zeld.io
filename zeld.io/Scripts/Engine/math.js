function toRadians(degrees) {
    return degrees * (Math.PI / 180.0);
}
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
function magnitude(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}