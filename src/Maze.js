function Maze(width, height){
    this.width = width
    this.height = height
    this.maze

    this.createMaze = function() {
        this.maze = createGraphics(this.width, this.height)
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
    return this.maze
    }
}