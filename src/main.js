var maze
var mapSLAM
var robot

function setup() {
    createCanvas(800, 600)
    robot = new Robot(200, 200, 0)
    background(55)
    maze = new Maze(width / 2, height)
    image(maze.map, 0, 0)
    
    mapSLAM = new Map(width / 2, height)
    for(var i=0; i<10; i++){
        mapSLAM.addLandmark(new Landmark(random(width / 2), random(height)))
    }
}

function draw() {
    // frameRate(10)
    // test()
    // noLoop()
    // frameRate(10)
    background(55)
    image(maze.map, 0, 0)
    
    robot.update()
    robot.measure(maze)
    robot.show()


    var positions2D = []
    robot.measurement.forEach(m => {
        if (m) {
            let point = convertPolarToCartesian(m.angle, m.dist)
            positions2D.push({ x: robot.x + point.x, y: robot.y + point.y })
        }
    })
    mapSLAM.addMeasurementPoints(positions2D)
    mapSLAM.addTrajectoryPoint({x: robot.x, y: robot.y})
    mapSLAM.show()
}
