function Robot(xPos, yPos, heading) {
    this.x = xPos
    this.y = yPos
    this.heading = heading
    this.w = 20
    this.h = 40
    this.sensorRange = 200.0

    var nSensors = 9
    this.dist = Array(nSensors).fill(0.0)

    this.moveForward = function () {
        this.x += sin(this.heading) * 2
        this.y -= cos(this.heading) * 2
    }

    this.moveBackward = function () {
        this.x -= sin(this.heading)
        this.y += cos(this.heading)
    }

    // this.measure() {

    // }

    this.update = function () {
        if (keyIsDown(UP_ARROW)) {
            robot.moveForward()
        }
        if (keyIsDown(DOWN_ARROW)) {
            robot.moveBackward()
        }
        if (keyIsDown(LEFT_ARROW)) {
            robot.heading -= 0.05
        }
        if (keyIsDown(RIGHT_ARROW)) {
            robot.heading += 0.05
        }
    }

    this.show = function () {
        push()
        translate(this.x, this.y)
        rotate(this.heading)

        fill(255, 30)
        var startAngle = PI + QUARTER_PI
        arc(0, -this.w / 2, this.sensorRange, this.sensorRange, startAngle, startAngle + HALF_PI)

        fill(100, 100, 255)
        rectMode(CENTER)
        rect(0, 0, this.w, this.h)
        strokeWeight(2)
        ellipseMode(CENTER)
        ellipse(0, -this.w / 2, 10, 10)
        pop()
    }
}