function Robot(xPos, yPos, heading) {
    this.x = xPos
    this.y = yPos
    this.heading = heading
    this.w = 10
    this.h = 15
    this.sensorRange = 100.0
    this.nSensors = 9
    this.dist = Array(this.nSensors).fill(0.0)

    this.moveForward = function () {
        this.x += sin(this.heading) * 2
        this.y += cos(this.heading) * 2
        this.checkBorders()
    }

    this.moveBackward = function () {
        this.x -= sin(this.heading)
        this.y -= cos(this.heading)
        this.checkBorders()
    }

    /** 
     * Constrain robot position to map borders.
    */
    this.checkBorders = function () {
        if (this.x > maze.width) {
            this.x = maze.width
        } else if (this.x < 0) {
            this.x = 0
        }
        if (this.y > maze.height) {
            this.y = maze.height
        } else if (this.y < 0) {
            this.y = 0
        }
    }

    this.measure = function () {
        var fov = HALF_PI
        var startAngle = QUARTER_PI
        var angleIncrement = fov / this.nSensors

        for (let i = 0; i < this.nSensors; i++) {
            let angle = startAngle + i * angleIncrement

            var dx = sin(angle) * this.sensorRange
            var dy = cos(angle) * this.sensorRange

            var pix = pixelsBetweenPoints(this.x, this.y, this.x + dx, this.y + dy)
            pix.forEach(p => point(p.x, p.y))
        }
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
        fill(100, 100, 255, 30)
        var startAngle = QUARTER_PI
        arc(0, this.w / 2, 2 * this.sensorRange, 2 * this.sensorRange, startAngle, startAngle + HALF_PI)

        // draw robot
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