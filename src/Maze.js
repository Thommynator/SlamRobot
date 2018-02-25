function Maze(width, height){
    this.width = width
    this.height = height
    this.maze

    this.createMaze = function() {
        this.maze = createGraphics(this.width, this.height)
        
        // draw walls
        this.maze.fill(220)
        this.maze.stroke(20)
        for (let i = 0; i < 30; i++) {
            this.maze.rect(
                random(this.width),
                random(this.height),
                20 + random(100),
                20 + random(100) 
            )          
        }

        // draw border
        this.maze.noFill()
        this.maze.stroke(10)
        this.maze.strokeWeight(10)
        this.maze.rect(0, 0, this.width, this.height)
    return this.maze
    }
}