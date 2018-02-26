function Robot(xPos, yPos, heading) {
    this.x = xPos
    this.y = yPos
    this.heading = heading
    this.w = 10
    this.h = 15
    this.sensorRange = 200.0
    this.nSensors = 50
    this.distances = Array(this.nSensors).fill(0.0)

    this.measure = function (maze) {
        var fov = HALF_PI
        var startAngle = -QUARTER_PI
        var angleIncrement = fov / this.nSensors

        for (var sensorIdx = 0; sensorIdx < this.nSensors; sensorIdx++) {
            let angle = this.heading + startAngle + sensorIdx * angleIncrement
            var endX = this.x + sin(angle) * this.sensorRange
            var endY = this.y + cos(angle) * this.sensorRange

            var cellsBetween = pixelsBetweenPoints(this.x, this.y, endX, endY)

            fill(255, 0, 0)
            vertex(this.x, this.y)
            for (var j = 0; j < cellsBetween.length; j++) {
                // collision
                if (maze.blocked[convertXYtoIndex(cellsBetween[j].x, cellsBetween[j].y, maze.width)]) {
                    this.distances[sensorIdx] = dist(this.x, this.y, cellsBetween[j].x, cellsBetween[j].y)
                    ellipse(cellsBetween[j].x, cellsBetween[j].y, 5, 5)
                    break
                }
            }
        }
    }

    this.moveForward = function () {
        this.x = Math.round(this.x + sin(this.heading) * 2)
        this.y =  Math.round(this.y + cos(this.heading) * 2)
        this.checkBorders()
    }

    this.moveBackward = function () {
        this.x =  Math.round(this.x - sin(this.heading))
        this.y =  Math.round(this.y - cos(this.heading))
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
        fill(255, 255, 255, 30)
        var startAngle = QUARTER_PI
        arc(0, this.w / 2, 2 * this.sensorRange, 2 * this.sensorRange, startAngle, startAngle + HALF_PI)

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