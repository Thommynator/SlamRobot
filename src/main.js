var maze
var robot

function setup() {
    createCanvas(800, 600)
    maze = new Maze(800, 600).createMaze()
    robot = new Robot(200, 200, 0)
    background(55)
    image(maze, 0, 0)
}

function draw() {
    background(55)
    image(maze, 0, 0)
    robot.update()
    robot.show()
}
