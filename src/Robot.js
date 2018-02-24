function Robot(xPos, yPos, heading) {
    this.x = xPos
    this.y = yPos
    this.heading = heading
    this.w = 20
    this.h = 40
    var nSensors = 9
    this.dist = Array(nSensors).fill(0.0)

    this.moveForward = function() {
        this.x += sin(this.heading)
        this.y -= cos(this.heading)
    }

    this.moveBackward = function() {
        this.x -= sin(this.heading)
        this.y += cos(this.heading)
    }

    // this.measure() {

    // }

    this.update = function() {
        if(keyIsDown(UP_ARROW)) {
            robot.moveForward()
        } 
        if(keyIsDown(DOWN_ARROW)) {
            robot.moveBackward()
        } 
        if(keyIsDown(LEFT_ARROW)) {
            robot.heading -= 0.05
        } 
        if(keyIsDown(RIGHT_ARROW)) {
            robot.heading += 0.05
        }
    }

    this.show = function() {
        var icon = createGraphics(100, 100)
        push()
        icon.background(220)
        translate(this.x, this.y)
        rotate(this.heading)
        icon.fill(100, 100, 255)
        icon.rect(0, 0, this.w, this.h)
        icon.strokeWeight(2)
        icon.ellipse(this.w/2, this.h/4, 10, 10)
        image(icon, -this.w/2, -this.h/2)
        pop()
    }
}