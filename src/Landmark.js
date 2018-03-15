function Landmark(xPos, yPos) {
    this.position = { x: floor(xPos), y: floor(yPos) }
    this.radius = 5
    this.uncertainty = 3 * this.radius

    this.showOnMap = function(graphic) {
        
        // draw uncertainty
        graphic.fill(0, 255, 0, 50)
        graphic.noStroke()
        graphic.ellipse(this.position.x, this.position.y, this.uncertainty, this.uncertainty)

        // draw landmark
        graphic.fill(0)
        graphic.stroke(0)
        graphic.strokeWeight(1)
        graphic.ellipse(this.position.x, this.position.y, this.radius, this.radius)

        return graphic
    }
} 