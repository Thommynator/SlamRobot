var maze
var robot

function setup() {
    createCanvas(800, 600)
    robot = new Robot(200, 200, 0)
    background(55)
    maze = new Maze(width / 2, height)
    image(maze.map, 0, 0)
}

function draw() {
    // frameRate(10)
    // test()
    // noLoop()
    background(55)
    image(maze.map, 0, 0)
    robot.update()
    robot.measure(maze)
    robot.show()
}
