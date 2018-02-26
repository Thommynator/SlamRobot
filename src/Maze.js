function Maze(width, height) {
    this.width = width
    this.height = height
    this.blocked = Array(this.width * this.height).fill(false)
    
    this.createMap = function () {
        this.map = createGraphics(this.width, this.height)
        
        // draw walls
        this.map.fill(220)
        this.map.stroke(20)
        for (let i = 0; i < 30; i++) {
            this.map.rect(
                random(this.width),
                random(this.height),
                20 + random(100),
                20 + random(100)
            )
        }
        
        // draw border
        this.map.noFill()
        this.map.stroke(10)
        this.map.strokeWeight(10)
        this.map.rect(0, 0, this.width, this.height)
        
        // fill 'blocked' array accordingly
        this.map.loadPixels()
        let skip = 1
        for (var p = 0; p < this.blocked.length; p++) {
            // blocked
            if (this.map.pixels[p * 4 + 3] > 0) {
                this.blocked[p] = true
            }
        }
        return this.map
    }
    this.map = this.createMap()
}