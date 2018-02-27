/**
 * Bresenham's line algorithm.
 * Expects two 2D points (x1, y1) & (x2, y2) and finds
 * all pixel-cells or 2D integer points between these points.
 * @param {int} x1 is the x-coordinate fom the first point
 * @param {int} y1 is the y-coordinate fom the first point
 * @param {int} x2 is the x-coordinate fom the second point
 * @param {int} y2 is the y-coordinate fom the second point
 */
function pixelsBetweenPoints(x1, y1, x2, y2) {
    var dx = x2 - x1
    var dy = y2 - y1

    var pixels = []
    var y = y1

    // special case if line is vertical (dx == 0)
    if (areEqual(dx, 0)) {
        for (var i = 0; i <= abs(dy); i++) {
            pixels.push({ x: x1, y: y })
            y += Math.sign(dy)
        }
    } else {
        var dError = Math.abs(dy / dx)
        var error = 0.0

        var x = x1
        for (var i = 0; i <= abs(dx); i++) {
            pixels.push({ x: x, y: y })
            x += Math.sign(dx)
            if (Math.sign(dy) == 1 && y > y2 || Math.sign(dy) == -1 && y < y2) break

            error += dError
            while (error >= 0.5) {
                pixels.push({ x: x, y: y })
                y += Math.sign(dy)
                error -= 1.0

                if (Math.sign(dy) == 1 && y > y2 || Math.sign(dy) == -1 && y < y2) break
            }
        }
    }
    return pixels
}

/**
 * Compares if two float numbers are equal.
 * If both numbers are equal up to the sixth 
 * digget after the comma, they are "equal".
 * Returns true if numbers are equal.
 * @param {float} x any float number
 * @param {float} y any float number
 */
function areEqual(x, y) {
    var eps = 1E6
    var newX = Math.round(parseFloat(x) * eps) / eps
    var newY = Math.round(parseFloat(y) * eps) / eps
    return Math.abs(newX - newY) < (1 / eps)
}

/**
 * Converts a 2D coordinate into a single index.
 * @param {int} x coordinate (= column)
 * @param {int} y coordinate (= row)
 * @param {int} w width
 */
function convertXYtoIndex(x, y, w) {
    return floor(x) + floor(y) * w
}