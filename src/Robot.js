function Robot(xPos, yPos, heading) {
    this.x = xPos
    this.y = yPos
    this.heading = heading
    this.w = 10
    this.h = 15
    this.sensorRange = 200.0
    this.fov = 2 * QUARTER_PI
    this.nSensors = 100
    this.measurements = Array(this.nSensors).fill(undefined)

    /**
     * Measures the measurements (distances & angles) from the robot to its surroundings.
     * It's like a virtual LIDAR sensor.
     * The values are measured from right to left.
     * A measurement is 'undefined' if there is no obstacle in sensor range.
     * @param {Maze} maze 
     */
    this.measure = function (maze) {
        this.measurements = Array(this.nSensors).fill(undefined)
        var startAngle = -this.fov / 2
        var angleIncrement = this.fov / this.nSensors

        for (var sensorIdx = 0; sensorIdx < this.nSensors; sensorIdx++) {
            let angle = this.heading + startAngle + sensorIdx * angleIncrement
            var endX = this.x + sin(angle) * this.sensorRange
            var endY = this.y + cos(angle) * this.sensorRange

            var cellsBetween = pixelsBetweenPoints(this.x, this.y, endX, endY)

            stroke(0)
            fill(255, 0, 0)
            for (var j = 0; j < cellsBetween.length; j++) {
                // collision with wall
                if (maze.blocked[convertXYtoIndex(cellsBetween[j].x, cellsBetween[j].y, maze.width)]) {
                    let distance = dist(this.x, this.y, cellsBetween[j].x, cellsBetween[j].y)
                    this.measurements[sensorIdx] = { angle: angle, dist: distance }
                    ellipse(cellsBetween[j].x, cellsBetween[j].y, 5, 5)
                    break
                }
            }
        }

        var validMeasurements = []
        this.measurements.forEach(m => {
            if (m) { validMeasurements.push(m) }
        })

        // find peaks in measurement
        let threshold = 50
        for (var sensorIdx = 1; sensorIdx < validMeasurements.length - 1; sensorIdx++) {
            var distDiff1 = abs(validMeasurements[sensorIdx - 1].dist - validMeasurements[sensorIdx].dist)
            var distDiff2 = abs(validMeasurements[sensorIdx + 1].dist - validMeasurements[sensorIdx].dist)
            var distDiff = Math.max(distDiff1, distDiff2)

            if (distDiff > threshold) {
                var x = this.x + sin(validMeasurements[sensorIdx].angle) * validMeasurements[sensorIdx].dist
                var y = this.y + cos(validMeasurements[sensorIdx].angle) * validMeasurements[sensorIdx].dist
                fill(200)
                ellipse(x, y, 10, 10)
            }
        }

    }

    this.moveForward = function () {
        let newX = this.x + sin(this.heading) * 2
        let newY = this.y + cos(this.heading) * 2
        if (!this.isBlocked(newX, newY)) {
            this.x = newX
            this.y = newY
        }
    }

    this.moveBackward = function () {
        let newX = this.x - sin(this.heading)
        let newY = this.y - cos(this.heading)
        if (!this.isBlocked(newX, newY)) {
            this.x = newX
            this.y = newY
        }
    }

    /** 
     * Check if a cell (x,y) is blocked.
     * Blocked means, that it might be outside of the map 
     * or not accessible because of walls/ostacles.
     */
    this.isBlocked = function (x, y) {
        x = floor(x)
        y = floor(y)

        if (x > maze.width || x < 0) {
            return true
        }
        if (y > maze.height || y < 0) {
            return true
        }
        return maze.blocked[convertXYtoIndex(x, y, maze.width)]
    }


    this.update = function () {
        if (keyIsDown(UP_ARROW)) {
            this.moveForward()
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.moveBackward()
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.heading = (this.heading + 0.05) % TWO_PI
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.heading = (this.heading - 0.05) % TWO_PI
        }
    }

    this.show = function () {
        push()
        translate(this.x, this.y)
        rotate(-this.heading)

        // draw arc
        noStroke()
        fill(0, 20)
        // arc 0 angle starts right, increasing clock-wise
        var startAngle = HALF_PI - this.fov / 2
        arc(0, 0, 2 * this.sensorRange, 2 * this.sensorRange, startAngle, startAngle + this.fov)

        // draw robot
        stroke(0)
        fill(100, 100, 255)
        strokeWeight(2)
        ellipseMode(CENTER)
        ellipse(0, this.h / 2, this.w, this.w)
        stroke(0)
        rectMode(CENTER)
        rect(0, 0, this.w, this.h)
        pop()
        point(this.x, this.y)
    }
}