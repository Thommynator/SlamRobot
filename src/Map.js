function Map(mapWidth, mapHeight) {
    this.width = mapWidth
    this.height = mapHeight
    this.map = createGraphics(this.width, this.height)
    this.landmarks = []
    this.landmarksGraphic = createGraphics(this.width, this.height)

    this.maxTrajectoryLength = 500
    this.trajectory = []

    /**
     * Expects a single 2D positions.
     * The positions is added to the robots trajectory.
     * @param {*} pos2D 
     */
    this.addTrajectoryPoint = function (pos2D) {
        this.trajectory.push(pos2D)
        if (this.trajectory.length > this.maxTrajectoryLength) {
            this.trajectory.shift()
        }
    }

    /**
     * Adds a new landmark to the map.
     * @param {Landmark} landmark 
     */
    this.addLandmark = function (landmark) {
        this.landmarks.push(landmark)
        this.landmarksGraphic = createGraphics(this.width, this.height)
        this.landmarks.forEach(mark => this.landmarksGraphic = mark.showOnMap(this.landmarksGraphic))
    }

    /**
     * Expects a array of 2D positions.
     * The positions describe the coordinate of the walls.
     * @param {array} positions2D 
     */
    this.addMeasurementPoints = function (positions2D) {

    }

    this.show = function () {

        // draw robot trajectory
        this.map.noFill()
        this.map.beginShape()
        this.map.stroke(10, 10)
        this.map.strokeWeight(2)
        this.trajectory.forEach(t => {
            this.map.vertex(t.x, t.y)
        })
        this.map.endShape()

        // show border
        this.map.noFill()
        this.map.stroke(10)
        this.map.strokeWeight(10)
        this.map.rect(0, 0, this.width, this.height)

        image(this.landmarksGraphic, width / 2, 0)
        image(this.map, width / 2, 0)
    }
}